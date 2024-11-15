import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, HelpCircle, User, ChevronDown, Menu } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import { SUBSCRIPTION_STATUS_DISPLAY } from '../constants/subscriptionTiers';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
    <nav className="bg-white shadow-md text-[#1E1F26] relative w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 flex-wrap w-full">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 no-underline">
              <User className="h-8 w-8 text-[#FF6600]" />
              <span className="font-bold text-2xl text-[#1E1F26]">DAI Vinci</span>
            </Link>
          </div>

          <div className="flex md:hidden ml-auto">
            <button
              onClick={toggleUserMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#1E1F26] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#FF6600]"
            >
              <span className="sr-only">Open user menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {isAuthenticated && (
            <div className={`${isUserMenuOpen ? 'block' : 'hidden'} md:flex items-center justify-end space-x-4 w-full md:w-auto mt-4 md:mt-0`}>
              <Link
                to="/tutorial"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors block md:inline-block"
              >
                <HelpCircle className="h-5 w-5 text-[#1E1F26]" />
              </Link>
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2">
                      {user?.picture ? (
                        <img
                          src={user.picture}
                          alt={user.name || 'User avatar'}
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <User className="h-8 w-8 p-1 bg-[#FF6600] text-white rounded-full" />
                      )}
                      <ChevronDown className="h-4 w-4 text-[#1E1F26]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>
                      <p>Subscription: {SUBSCRIPTION_STATUS_DISPLAY[subscriptionStatus] || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">Status: {subscriptionStatus}</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}