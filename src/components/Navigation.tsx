import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut, HelpCircle, User } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import { SUBSCRIPTION_STATUS_DISPLAY } from '../constants/subscriptionTiers';

export function Navigation() {
  const { isAuthenticated, logout, user } = useAuth0();
  const { subscriptionStatus } = useAuthWithSubscription();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin 
      }
    });
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="bg-blue-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 flex-wrap">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Menu className="h-6 w-6" />
              <span className="font-bold text-xl">Value Canvas</span>
            </Link>
          </div>

          <div className="flex md:hidden ml-auto">
            <button
              onClick={toggleUserMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {isAuthenticated && (
            <div className={`${isUserMenuOpen ? 'block' : 'hidden'} md:flex items-center space-x-4 w-full md:w-auto mt-4 md:mt-0`}>
              <Link
                to="/tutorial"
                className="p-2 rounded-full hover:bg-blue-800 transition-colors block md:inline-block"
              >
                <HelpCircle className="h-5 w-5" />
              </Link>
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  {user?.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name || 'User avatar'}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <User className="h-8 w-8 p-1 bg-blue-700 rounded-full" />
                  )}
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 md:right-0 md:left-auto">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <p>Subscription: {SUBSCRIPTION_STATUS_DISPLAY[subscriptionStatus] || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">Status: {subscriptionStatus}</p>
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}