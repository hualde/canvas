import { useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function useSubscriptionStatus() {
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, getAccessTokenSilently } = useAuth0();

  const checkSubscriptionStatus = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('/api/check-subscription-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.sub }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subscription status');
      }

      const data = await response.json();
      setSubscriptionStatus(data.status);
      console.log('Subscription status:', data.status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error checking subscription status:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user, getAccessTokenSilently]);

  useEffect(() => {
    checkSubscriptionStatus();
  }, [checkSubscriptionStatus]);

  const forceCheckSubscriptionStatus = useCallback(() => {
    checkSubscriptionStatus();
  }, [checkSubscriptionStatus]);

  return { 
    subscriptionStatus, 
    isLoading, 
    error, 
    forceCheckSubscriptionStatus 
  };
}

export default function Component() {
  return null;
}