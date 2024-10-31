import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, BookOpen } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="mt-5 px-2">
        <Link
          to="/"
          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
            isActive('/') ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <LayoutGrid
            className={`mr-4 h-6 w-6 ${
              isActive('/') ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
            }`}
          />
          Dashboard
        </Link>

        <Link
          to="/tutorial"
          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
            isActive('/tutorial') ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <BookOpen
            className={`mr-4 h-6 w-6 ${
              isActive('/tutorial') ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
            }`}
          />
          Tutorial
        </Link>
      </nav>
    </div>
  );
}