import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect, useCallback } from 'react';
import { SUBSCRIPTION_STATUS, SubscriptionStatus } from '../constants/subscriptionTiers';
import { getUserSubscription } from '../lib/db';

export function useAuthWithSubscription() {
  const auth0 = useAuth0();
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>(SUBSCRIPTION_STATUS.FREE);

  const checkSubscriptionStatus = useCallback(async () => {
    if (auth0.user?.sub) {
      try {
        const status = await getUserSubscription(auth0.user.sub);
        console.log('Fetched subscription status:', status);
        if (Object.values(SUBSCRIPTION_STATUS).includes(status as SubscriptionStatus)) {
          setSubscriptionStatus(status as SubscriptionStatus);
        } else {
          console.error('Invalid subscription status received:', status);
          setSubscriptionStatus(SUBSCRIPTION_STATUS.FREE);
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
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