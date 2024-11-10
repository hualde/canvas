import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect, useCallback } from 'react';
import { SUBSCRIPTION_TIERS, SUBSCRIPTION_STATUS } from '../constants/subscriptionTiers';

export function useAuthWithSubscription() {
  const auth0 = useAuth0();
  const [subscriptionStatus, setSubscriptionStatus] = useState(SUBSCRIPTION_STATUS.FREE);

  const checkSubscriptionStatus = useCallback(async () => {
    if (auth0.user?.sub) {
      try {
        const response = await fetch('/api/check-subscription-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: auth0.user.sub }),
        });

        if (!response.ok) {
          throw new Error('Failed to check subscription status');
        }

        const { status } = await response.json();
        if (Object.values(SUBSCRIPTION_STATUS).includes(status)) {
          setSubscriptionStatus(status);
        } else {
          console.error('Invalid subscription status received:', status);
          setSubscriptionStatus(SUBSCRIPTION_STATUS.FREE);
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
        // If there's an error, we assume the user is on the free tier
        setSubscriptionStatus(SUBSCRIPTION_STATUS.FREE);
      }
    }
  }, [auth0.user]);

  useEffect(() => {
    if (auth0.isAuthenticated) {
      checkSubscriptionStatus();
    }
  }, [auth0.isAuthenticated, checkSubscriptionStatus]);

  const refreshSubscription = useCallback(() => {
    checkSubscriptionStatus();
  }, [checkSubscriptionStatus]);

  return {
    ...auth0,
    user: auth0.user ? { ...auth0.user, subscriptionStatus } : null,
    subscriptionStatus,
    refreshSubscription,
  };
}

export default function Component() {
  return null;
}