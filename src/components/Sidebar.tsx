import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, BookOpen, Menu, X } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const SidebarContent = () => (
    <nav className="mt-5 px-2">
      <Link
        to="/"
        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
          isActive('/') ? 'bg-blue-100 text-blue-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
        onClick={() => setIsSidebarOpen(false)}
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
        onClick={() => setIsSidebarOpen(false)}
      >
        <BookOpen
          className={`mr-4 h-6 w-6 ${
            isActive('/tutorial') ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
          }`}
        />
        Tutorial
      </Link>
    </nav>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-20 p-2 rounded-md bg-white shadow-md"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-10 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleSidebar}></div>
        <div className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-20 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full overflow-y-auto">
            <SidebarContent />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen">
        <SidebarContent />
      </div>
    </>
  );
}