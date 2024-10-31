import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Tutorial() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">How to Use Value Canvas</h1>

      <div className="prose prose-blue max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="text-gray-600 mb-4">
            The Value Proposition Canvas helps you understand your customers and design products
            and services they want. It has two sides:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Customer Profile (right side)</li>
            <li>Value Map (left side)</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Customer Profile</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-800">Customer Jobs</h3>
              <p className="text-gray-600">
                What tasks are your customers trying to accomplish? What problems are they trying
                to solve?
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800">Pains</h3>
              <p className="text-gray-600">
                What frustrates your customers? What risks do they fear?
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800">Gains</h3>
              <p className="text-gray-600">
                What benefits are your customers seeking? What would make their lives easier?
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Value Map</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-medium text-gray-800">Products & Services</h3>
              <p className="text-gray-600">
                What are you offering to your customers?
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800">Pain Relievers</h3>
              <p className="text-gray-600">
                How do your products and services alleviate customer pains?
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-800">Gain Creators</h3>
              <p className="text-gray-600">
                How do your products and services create customer gains?
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}