import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, BookOpen, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Sidebar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const SidebarContent = () => (
    <ScrollArea className="h-full">
      <nav className="space-y-2 p-4">
        <Link
          to="/"
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive('/') 
              ? 'bg-[#FF6600] text-white' 
              : 'text-[#1E1F26] hover:bg-[#FF6600]/10 hover:text-[#FF6600]'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        >
          <LayoutGrid className="mr-3 h-5 w-5" />
          Dashboard
        </Link>

        <Link
          to="/tutorial"
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            isActive('/tutorial') 
              ? 'bg-[#FF6600] text-white' 
              : 'text-[#1E1F26] hover:bg-[#FF6600]/10 hover:text-[#FF6600]'
          }`}
          onClick={() => setIsSidebarOpen(false)}
        >
          <BookOpen className="mr-3 h-5 w-5" />
          Tutorial
        </Link>
      </nav>
    </ScrollArea>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-20 bg-white shadow-md"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <div 
          className={`fixed inset-0 bg-black/50 z-10 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`} 
          onClick={toggleSidebar}
        />
        <aside 
          className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-20 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarContent />
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen">
        <SidebarContent />
      </aside>
    </>
  );
}