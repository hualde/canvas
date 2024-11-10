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
    // Obtener el stripe_customer_id de la base de datos
    const { rows } = await sql`
      SELECT stripe_customer_id 
      FROM user_subscriptions 
      WHERE user_id = ${userId}
    `;

    if (rows.length === 0 || !rows[0].stripe_customer_id) {
      return res.status(200).json({ status: 'free' });
    }

    const stripeCustomerId = rows[0].stripe_customer_id;

    // Obtener las suscripciones del cliente en Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'active',
    });

    if (subscriptions.data.length === 0) {
      return res.status(200).json({ status: 'free' });
    }

    // Asumimos que el usuario solo tiene una suscripción activa
    const subscription = subscriptions.data[0];

    // Determinar el estado de la suscripción
    let status;
    if (subscription.status === 'active') {
      status = 'premium';
    } else if (subscription.status === 'past_due') {
      status = 'past_due';
    } else {
      status = 'free';
    }

    // Actualizar el estado de la suscripción en la base de datos
    await sql`
      UPDATE user_subscriptions
      SET subscription_status = ${status}
      WHERE user_id = ${userId}
    `;

    return res.status(200).json({ status });
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return res.status(500).json({ message: 'Error checking subscription status' });
  }
}