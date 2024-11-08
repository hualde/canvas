import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { getUserSubscription } from '../lib/db';

export function useAuthWithSubscription() {
  const auth0 = useAuth0();
  const [subscriptionTier, setSubscriptionTier] = useState('free');

  useEffect(() => {
    async function fetchSubscription() {
      if (auth0.user?.sub) {
        const tier = await getUserSubscription(auth0.user.sub);
        setSubscriptionTier(tier);
      }
    }
    if (auth0.isAuthenticated) {
      fetchSubscription();
    }
  }, [auth0.isAuthenticated, auth0.user]);

  return {
    ...auth0,
    user: auth0.user ? { ...auth0.user, subscriptionTier } : null,
    subscriptionTier,
  };
}