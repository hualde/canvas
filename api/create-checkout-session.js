import Stripe from 'stripe';
import { sql } from '@vercel/postgres';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { priceId, userId } = req.body;

    if (!priceId || !userId) {
      return res.status(400).json({ message: 'Price ID and User ID are required' });
    }

    // Check if the user already has a Stripe customer ID
    const { rows } = await sql`
      SELECT stripe_customer_id FROM user_subscriptions WHERE user_id = ${userId}
    `;

    let stripeCustomerId;

    if (rows.length > 0 && rows[0].stripe_customer_id) {
      stripeCustomerId = rows[0].stripe_customer_id;
    } else {
      // Create a new Stripe customer
      const customer = await stripe.customers.create({
        metadata: { auth0_user_id: userId }
      });
      stripeCustomerId = customer.id;

      // Store the Stripe customer ID in the database
      await sql`
        INSERT INTO user_subscriptions (user_id, stripe_customer_id)
        VALUES (${userId}, ${stripeCustomerId})
        ON CONFLICT (user_id) DO UPDATE SET stripe_customer_id = ${stripeCustomerId}
      `;
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/upgrade`,
    });

    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe API Error:', error);
    return res.status(500).json({ 
      message: error.message || 'An unexpected error occurred',
      type: error.type || 'UnknownError',
    });
  }
}