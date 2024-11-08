import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserSubscription, setUserSubscription } from '../lib/db';

export function useInitializeUserSubscription() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const initializeSubscription = async () => {
      if (isAuthenticated && user?.sub && !isLoading) {
        try {
          const existingSubscription = await getUserSubscription(user.sub);
          if (!existingSubscription) {
            await setUserSubscription(user.sub, 'free');
            console.log('User subscription initialized');
          }
        } catch (error) {
          console.error('Error initializing user subscription:', error);
        }
      }
    };

    initializeSubscription();
  }, [isAuthenticated, user, isLoading]);
}