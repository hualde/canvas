import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { initializeUserSubscription } from '../lib/db';

export function useInitializeUserSubscription() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const initializeSubscription = async () => {
      if (isAuthenticated && user?.sub && !isLoading) {
        try {
          console.log('Initializing user subscription for:', user.sub);
          const subscriptionTier = await initializeUserSubscription(user.sub);
          console.log('User subscription initialized or fetched:', subscriptionTier);
        } catch (error) {
          console.error('Error initializing user subscription:', error);
        }
      }
    };

    initializeSubscription();
  }, [isAuthenticated, user, isLoading]);
}