import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function useSubscriptionStatus() {
  const [subscriptionStatus, setSubscriptionStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function checkSubscriptionStatus() {
      if (!user) {
        setIsLoading(false);
        return;
      }

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
        console.log('Subscription status:', data.status);  // Mostrar en consola
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error checking subscription status:', err);
      } finally {
        setIsLoading(false);
      }
    }

    checkSubscriptionStatus();
  }, [user, getAccessTokenSilently]);

  return { subscriptionStatus, isLoading, error };
}