import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import stripePromise from '../lib/stripe';

export default function Upgrade() {
  const navigate = useNavigate();
  const { user, subscriptionTier } = useAuthWithSubscription();

  const handleUpgrade = async (priceId: string) => {
    const stripe = await stripePromise;
    
    // Call your API to create a Checkout Session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId }),
    });
    
    const session = await response.json();

    // Redirect to Checkout
    const result = await stripe!.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (result.error) {
      // Handle any errors from Stripe
      console.error(result.error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Upgrade to Premium
        </h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Compare Plans
            </h3>
            <div className="mt-5 border-t border-gray-200">
              <dl className="divide-y divide-gray-200">
                {/* ... (previous comparison table content) ... */}
              </dl>
            </div>
          </div>
          <div className="px-4 py-5 bg-gray-50 sm:p-6">
            <div className="mt-5 grid grid-cols-2 gap-4">
              <button
                onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY!)}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upgrade Monthly
              </button>
              <button
                onClick={() => handleUpgrade(process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ANNUAL!)}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Upgrade Annually
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