import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';

export default function Upgrade() {
  const navigate = useNavigate();
  const { user, subscriptionTier } = useAuthWithSubscription();

  const handleUpgrade = () => {
    // TODO: Implement actual upgrade logic here
    alert('Upgrade functionality not implemented yet.');
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
            <div className="mt-5">
              <button
                onClick={handleUpgrade}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upgrade to Premium
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