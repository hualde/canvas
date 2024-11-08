import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit3, FileText, PieChart, Users, BarChart2, Compass, ChevronDown, AlertCircle } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { getCanvases, createCanvas, deleteCanvas, canUserCreateCanvas, getCanvasCount } from '../lib/db';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import { SUBSCRIPTION_TIERS, TIER_LIMITS } from '../constants/subscriptionTiers';

interface Canvas {
  id: string;
  title: string;
  type: string;
  updated_at: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { subscriptionTier } = useAuthWithSubscription();
  const [canvases, setCanvases] = useState<Canvas[]>([]);
  const [isLoadingCanvases, setIsLoadingCanvases] = useState(true);
  const [canvasToDelete, setCanvasToDelete] = useState<Canvas | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [canCreateCanvas, setCanCreateCanvas] = useState(false);
  const [canvasCount, setCanvasCount] = useState(0);

  useEffect(() => {
    async function fetchCanvases() {
      if (isAuthenticated && user?.sub) {
        setIsLoadingCanvases(true);
        try {
          const fetchedCanvases = await getCanvases(user.sub);
          setCanvases(fetchedCanvases);
          const count = await getCanvasCount(user.sub);
          setCanvasCount(count);
          const canCreate = await canUserCreateCanvas(user.sub);
          setCanCreateCanvas(canCreate);
        } catch (error) {
          console.error('Error fetching canvases:', error);
        } finally {
          setIsLoadingCanvases(false);
        }
      }
    }
    fetchCanvases();
  }, [isAuthenticated, user]);

  const handleCreateCanvas = async (type: 'business' | 'value-proposition' | 'swot' | 'empathy-map' | 'pestel') => {
    if (isAuthenticated && user?.sub) {
      if (!canCreateCanvas && subscriptionTier !== SUBSCRIPTION_TIERS.PREMIUM) {
        alert('You have reached the maximum number of canvases for free users. Please upgrade to create more.');
        return;
      }

      try {
        const canvasType = 
          type === 'business' ? 'Business Model' : 
          type === 'value-proposition' ? 'Value Proposition' : 
          type === 'swot' ? 'SWOT Analysis' :
          type === 'empathy-map' ? 'Empathy Map' :
          'PESTEL Analysis';
        
        const newCanvas = await createCanvas(user.sub, `Untitled ${canvasType} Canvas`, canvasType);
        
        setCanvases([...canvases, newCanvas]);
        setCanvasCount(canvasCount + 1);
        const canCreate = await canUserCreateCanvas(user.sub);
        setCanCreateCanvas(canCreate);
        
        navigate(getCanvasRoute(newCanvas));
      } catch (error) {
        console.error('Error creating canvas:', error);
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    }
    setIsDropdownOpen(false);
  };

  const handleDeleteCanvas = async () => {
    if (canvasToDelete && user?.sub) {
      try {
        await deleteCanvas(canvasToDelete.id);
        setCanvases(canvases.filter(canvas => canvas.id !== canvasToDelete.id));
        setCanvasCount(canvasCount - 1);
        setCanvasToDelete(null);
        
        const canCreate = await canUserCreateCanvas(user.sub);
        setCanCreateCanvas(canCreate);
      } catch (error) {
        console.error('Error deleting canvas:', error);
      }
    }
  };

  const getCanvasRoute = (canvas: Canvas) => {
    switch (canvas.type) {
      case 'Business Model':
        return `/canvas/${canvas.id}`;
      case 'Value Proposition':
        return `/value-proposition/${canvas.id}`;
      case 'SWOT Analysis':
        return `/swot/${canvas.id}`;
      case 'Empathy Map':
        return `/empathy-map/${canvas.id}`;
      case 'PESTEL Analysis':
        return `/pestel/${canvas.id}`;
      default:
        console.error(`Unknown canvas type: ${canvas.type}`);
        return `/canvas/${canvas.id}`;
    }
  };

  const getCanvasIcon = (type: string) => {
    switch (type) {
      case 'Business Model':
        return <FileText className="h-6 w-6 text-blue-600" />;
      case 'Value Proposition':
        return <PieChart className="h-6 w-6 text-green-600" />;
      case 'SWOT Analysis':
        return <BarChart2 className="h-6 w-6 text-orange-600" />;
      case 'Empathy Map':
        return <Users className="h-6 w-6 text-purple-600" />;
      case 'PESTEL Analysis':
        return <Compass className="h-6 w-6 text-red-600" />;
      default:
        return <FileText className="h-6 w-6 text-gray-600" />;
    }
  };

  if (isLoading || isLoadingCanvases) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-8 flex-col sm:flex-row gap-4">
        <h1 className="text-3xl font-bold text-gray-900">My Canvases</h1>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors shadow-sm ${
              canCreateCanvas || subscriptionTier === SUBSCRIPTION_TIERS.PREMIUM
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
            disabled={!canCreateCanvas && subscriptionTier !== SUBSCRIPTION_TIERS.PREMIUM}
          >
            <Plus className="w-5 h-5 mr-2" />
            New Canvas
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
          {isDropdownOpen && (canCreateCanvas || subscriptionTier === SUBSCRIPTION_TIERS.PREMIUM) && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button onClick={() => handleCreateCanvas('business')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Business Model Canvas</button>
                <button onClick={() => handleCreateCanvas('value-proposition')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Value Proposition Canvas</button>
                <button onClick={() => handleCreateCanvas('swot')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">SWOT Analysis</button>
                <button onClick={() => handleCreateCanvas('empathy-map')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">Empathy Map</button>
                <button onClick={() => handleCreateCanvas('pestel')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">PESTEL Analysis</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {subscriptionTier === SUBSCRIPTION_TIERS.FREE && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>
              You are using the free tier. You can create up to {TIER_LIMITS[SUBSCRIPTION_TIERS.FREE].maxCanvases} canvases.
              {' '}
              <a href="/upgrade" className="font-bold underline">Upgrade to Premium</a> for unlimited canvases and more features!
            </p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <p className="text-gray-600">
          Canvases created: {canvasCount} / {subscriptionTier === SUBSCRIPTION_TIERS.PREMIUM ? '∞' : TIER_LIMITS[SUBSCRIPTION_TIERS.FREE].maxCanvases}
        </p>
        {subscriptionTier === SUBSCRIPTION_TIERS.FREE && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(canvasCount / TIER_LIMITS[SUBSCRIPTION_TIERS.FREE].maxCanvases) * 100}%` }}
            ></div>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {canvases.map((canvas) => (
          <div
            key={canvas.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              {getCanvasIcon(canvas.type)}
              <h3 className="text-xl font-semibold text-gray-900 ml-2">
                {canvas.title}
              </h3>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Updated: {new Date(canvas.updated_at).toLocaleDateString()}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(getCanvasRoute(canvas))}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCanvasToDelete(canvas)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {canvases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No canvases yet. Create your first one!
          </p>
        </div>
      )}

      {canvasToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this canvas? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setCanvasToDelete(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCanvas}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}