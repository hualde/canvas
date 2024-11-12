import Stripe from 'stripe';
import { sql } from '@vercel/postgres';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Obtener el stripe_customer_id y el subscription_status de la base de datos
    const { rows } = await sql`
      SELECT stripe_customer_id, subscription_status
      FROM user_subscriptions 
      WHERE user_id = ${userId}
    `;

    if (rows.length === 0 || !rows[0].stripe_customer_id) {
      return res.status(200).json({ status: 'free' });
    }

    const stripeCustomerId = rows[0].stripe_customer_id;
    let currentStatus = rows[0].subscription_status || 'free';

    // Obtener las suscripciones del cliente en Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'all',
    });

    let newStatus = 'free';
    if (subscriptions.data.length > 0) {
      const subscription = subscriptions.data[0];
      if (subscription.status === 'active') {
        newStatus = 'premium';
      } else if (subscription.status === 'past_due') {
        newStatus = 'past_due';
      } else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
        newStatus = 'free';
      }
    }

    // Actualizar el estado de la suscripción en la base de datos si ha cambiado
    if (newStatus !== currentStatus) {
      await sql`
        UPDATE user_subscriptions
        SET subscription_status = ${newStatus}
        WHERE user_id = ${userId}
      `;
      console.log(`Updated subscription status for user ${userId} from ${currentStatus} to ${newStatus}`);
    }

    return res.status(200).json({ status: newStatus });
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return res.status(500).json({ message: 'Error checking subscription status' });
  }
}