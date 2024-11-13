import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '../stores/authStore';

export function Layout() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex flex-col md:flex-row">
        {isAuthenticated && (
          <div className="md:block">
            <Sidebar />
          </div>
        )}
        <main className="flex-1 p-4 md:p-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}