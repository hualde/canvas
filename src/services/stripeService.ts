import Stripe from 'stripe';
import { SUBSCRIPTION_STATUS } from '../constants/subscriptionTiers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function getStripeSubscriptionStatus(stripeCustomerId: string): Promise<string> {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: 'all',
      limit: 1,
    });

    if (subscriptions.data.length > 0) {
      const subscription = subscriptions.data[0];
      
      switch (subscription.status) {
        case 'active':
        case 'trialing':
          return SUBSCRIPTION_STATUS.ACTIVE;
        case 'past_due':
          return SUBSCRIPTION_STATUS.PAST_DUE;
        case 'canceled':
        case 'unpaid':
        case 'incomplete':
        case 'incomplete_expired':
          return SUBSCRIPTION_STATUS.CANCELED;
        default:
          return SUBSCRIPTION_STATUS.FREE;
      }
    }

    return SUBSCRIPTION_STATUS.FREE;
  } catch (error) {
    console.error('Error fetching Stripe subscription status:', error);
    return SUBSCRIPTION_STATUS.FREE;
  }
}