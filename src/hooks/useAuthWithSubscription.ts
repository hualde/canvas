import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect, useCallback } from 'react';
import { getUserSubscription } from '../lib/db';

export function useAuthWithSubscription() {
  const auth0 = useAuth0();
  const [subscriptionTier, setSubscriptionTier] = useState('free');

  const fetchSubscription = useCallback(async () => {
    if (auth0.user?.sub) {
      const tier = await getUserSubscription(auth0.user.sub);
      setSubscriptionTier(tier);
    }
  }, [auth0.user]);

  useEffect(() => {
    if (auth0.isAuthenticated) {
      fetchSubscription();
    }
  }, [auth0.isAuthenticated, fetchSubscription]);

  const refreshSubscription = useCallback(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return {
    ...auth0,
    user: auth0.user ? { ...auth0.user, subscriptionTier } : null,
    subscriptionTier,
    refreshSubscription,
  };
}