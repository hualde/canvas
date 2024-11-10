import Stripe from 'stripe';
import { buffer } from 'micro';
import { sql } from '@vercel/postgres';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeletion(deletedSubscription);
        break;
      // Add other event types as needed
    }

    return res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : String(error)
    });
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const status = subscription.status;
  const planId = subscription.items.data[0].price.id;

  try {
    const { rows } = await sql`
      SELECT user_id FROM user_subscriptions WHERE stripe_customer_id = ${customerId}
    `;

    if (rows.length > 0) {
      const userId = rows[0].user_id;
      await sql`
        UPDATE user_subscriptions
        SET subscription_tier = 'premium', subscription_status = ${status}, plan_id = ${planId}
        WHERE user_id = ${userId}
      `;
    } else {
      console.error('No user found for Stripe customer:', customerId);
    }
  } catch (error) {
    console.error('Error updating subscription in database:', error);
  }
}

async function handleSubscriptionDeletion(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;

  try {
    const { rows } = await sql`
      SELECT user_id FROM user_subscriptions WHERE stripe_customer_id = ${customerId}
    `;

    if (rows.length > 0) {
      const userId = rows[0].user_id;
      await sql`
        UPDATE user_subscriptions
        SET subscription_tier = 'free', subscription_status = 'canceled', plan_id = NULL
        WHERE user_id = ${userId}
      `;
    } else {
      console.error('No user found for Stripe customer:', customerId);
    }
  } catch (error) {
    console.error('Error updating subscription in database:', error);
  }
}