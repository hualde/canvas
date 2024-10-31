import { Link, useNavigate } from 'react-router-dom';
import { Menu, Plus, LogOut, HelpCircle } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

export function Navigation() {
  const { isAuthenticated, logout, user } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({ 
      logoutParams: {
        returnTo: window.location.origin 
      }
    });
  };

  return (
    <nav className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Menu className="h-6 w-6" />
              <span className="font-bold text-xl">Value Canvas</span>
            </Link>
          </div>

          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/canvas/new')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Canvas
              </button>
              <Link
                to="/tutorial"
                className="p-2 rounded-full hover:bg-blue-800 transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
              </Link>
              <div className="flex items-center space-x-3">
                {user?.picture && (
                  <img
                    src={user.picture}
                    alt={user.name || 'User avatar'}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full hover:bg-blue-800 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}