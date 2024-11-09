import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const buf = await buffer(request);
    const sig = request.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return response.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        // Handle the checkout session completion
        await handleCheckoutSession(session);
        break;
      }
      // Add other event types as needed
    }

    return response.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return response.status(500).json({ 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function handleCheckoutSession(session: Stripe.Checkout.Session) {
  // TODO: Implement your subscription logic here
  // This could include:
  // 1. Updating the user's subscription status in your database
  // 2. Sending a confirmation email
  // 3. Provisioning resources for the user
  console.log('Processing completed checkout session:', session.id);
}