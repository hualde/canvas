import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import stripePromise from '../lib/stripe';

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
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Upgrade to Premium
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Compare Plans
            </h3>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-2">Feature</th>
                  <th className="text-center py-2">Free</th>
                  <th className="text-center py-2">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">Number of Canvases</td>
                  <td className="text-center">Up to 3</td>
                  <td className="text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-2">Export to PDF</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr>
                  <td className="py-2">AI Assistant</td>
                  <td className="text-center">❌</td>
                  <td className="text-center">✅</td>
                </tr>
                <tr>
                  <td className="py-2">Items per Section</td>
                  <td className="text-center">Up to 5</td>
                  <td className="text-center">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-4 py-5 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY!)}
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Upgrade Monthly'}
              </button>
              <button
                onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL!)}
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Upgrade Annually'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}