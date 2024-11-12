import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSession(session);
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }
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

async function handleCheckoutSession(session: Stripe.Checkout.Session) {
  console.log('Processing completed checkout session:', session.id);
  if (session.customer && session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    await handleSubscriptionChange(subscription);
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  let status = 'free';

  if (subscription.status === 'active') {
    status = 'premium';
  } else if (subscription.status === 'past_due') {
    status = 'past_due';
  }

  try {
    const { rows } = await sql`
      SELECT user_id FROM user_subscriptions WHERE stripe_customer_id = ${customerId}
    `;

    if (rows.length > 0) {
      const userId = rows[0].user_id;
      await sql`
        UPDATE user_subscriptions
        SET subscription_status = ${status}
        WHERE user_id = ${userId}
      `;
      console.log(`Updated subscription status for user ${userId} to ${status}`);
    } else {
      console.error('No user found for Stripe customer:', customerId);
    }
  } catch (error) {
    console.error('Error updating subscription in database:', error);
  }
}