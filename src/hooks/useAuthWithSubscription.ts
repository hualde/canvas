import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect, useCallback } from 'react';

export function useAuthWithSubscription() {
  const auth0 = useAuth0();
  const [subscriptionTier, setSubscriptionTier] = useState('free');

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
        setSubscriptionTier(status);
      } catch (error) {
        console.error('Error checking subscription status:', error);
        // Si hay un error, asumimos que el usuario está en el nivel gratuito
        setSubscriptionTier('free');
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
    user: auth0.user ? { ...auth0.user, subscriptionTier } : null,
    subscriptionTier,
    refreshSubscription,
  };
}