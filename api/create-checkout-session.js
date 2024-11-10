import Stripe from 'stripe';
import { sql } from '@vercel/postgres';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { priceId, userId } = req.body;

    if (!priceId) {
      return res.status(400).json({ message: 'Price ID is required' });
    }

    // Check if user already has a Stripe customer ID
    let stripeCustomerId = null;
    if (userId) {
      const { rows } = await sql`
        SELECT stripe_customer_id 
        FROM user_subscriptions 
        WHERE user_id = ${userId}
      `;
      
      if (rows.length > 0 && rows[0].stripe_customer_id) {
        stripeCustomerId = rows[0].stripe_customer_id;
      }
    }

    // Create checkout session options
    const sessionOptions = {
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/upgrade`,
    };

    // If we have a customer ID, add it to the session
    if (stripeCustomerId) {
      sessionOptions.customer = stripeCustomerId;
    } else if (userId) {
      // Create a new customer if we have a userId but no customer
      const customer = await stripe.customers.create({
        metadata: { auth0_user_id: userId }
      });
      
      // Store the new customer ID
      await sql`
        INSERT INTO user_subscriptions (user_id, stripe_customer_id)
        VALUES (${userId}, ${customer.id})
        ON CONFLICT (user_id) 
        DO UPDATE SET stripe_customer_id = ${customer.id}
      `;
      
      sessionOptions.customer = customer.id;
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create(sessionOptions);

    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe API Error:', error);
    return res.status(500).json({ 
      message: error.message || 'An unexpected error occurred',
      type: error.type || 'UnknownError',
    });
  }
}