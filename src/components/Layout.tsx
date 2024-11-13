import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '../stores/authStore';

export function Layout() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      <Navigation />
      <div className="flex flex-col md:flex-row flex-grow w-full">
        {isAuthenticated && (
          <div className="md:w-64 flex-shrink-0">
            <Sidebar />
          </div>
        )}
        <main className="flex-grow p-4 md:p-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}