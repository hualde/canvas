import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, AlertCircle } from 'lucide-react';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import stripePromise from '../lib/stripe';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Upgrade() {
  const navigate = useNavigate();
  const { user, subscriptionTier } = useAuthWithSubscription();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async (priceId: string) => {
    setIsLoading(true);
    setError(null);
    const stripe = await stripePromise;
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create checkout session');
      }

      const session = await response.json();

      const result = await stripe!.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to redirect to checkout');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Upgrade to Premium
        </h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Compare Plans
            </h3>
            <div className="mt-5 border-t border-gray-200">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Feature</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">Free</dd>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">Premium</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Number of Canvases</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">Up to 3</dd>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">Unlimited</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Export to PDF</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <X className="h-5 w-5 text-red-500" />
                  </dd>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">AI Assistant</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <X className="h-5 w-5 text-red-500" />
                  </dd>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">
                    <Check className="h-5 w-5 text-green-500" />
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Items per Section</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">Up to 5</dd>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">Unlimited</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="px-4 py-5 bg-gray-50 sm:p-6">
            <div className="mt-5 grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY!)}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Processing...' : 'Upgrade Monthly'}
              </Button>
              <Button
                onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL!)}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Processing...' : 'Upgrade Annually'}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <Button
            onClick={() => navigate('/')}
            variant="link"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}