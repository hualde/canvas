import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    console.log('Received request:', request.body);

    if (request.method !== 'POST') {
      return response.status(405).json({ message: 'Method not allowed' });
    }

    const { priceId } = request.body;

    if (!priceId) {
      return response.status(400).json({ message: 'Price ID is required' });
    }

    console.log('Creating Stripe checkout session with priceId:', priceId);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.origin}/upgrade`,
    });

    console.log('Stripe session created:', session.id);

    return response.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe API Error:', error);
    if (error instanceof Stripe.errors.StripeError) {
      return response.status(error.statusCode || 500).json({ 
        message: error.message,
        type: 'StripeError',
        code: error.code
      });
    }
    return response.status(500).json({ 
      message: 'An unexpected error occurred',
      type: 'UnknownError'
    });
  }
}