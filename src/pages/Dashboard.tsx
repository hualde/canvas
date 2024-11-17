import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Plus, Trash2, Edit3, FileText, PieChart, Users, BarChart2, Compass, ChevronDown, AlertCircle } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { getCanvases, createCanvas, deleteCanvas, canUserCreateCanvas, getCanvasCount } from '../lib/db';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import { SUBSCRIPTION_STATUS, TIER_LIMITS } from '../constants/subscriptionTiers';
import { useSubscriptionStatus } from '../hooks/useSubscriptionStatus';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTranslation } from 'react-i18next';

interface Canvas {
  id: string;
  title: string;
  type: string;
  updated_at: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { subscriptionStatus, refreshSubscription } = useAuthWithSubscription();
  const { isLoading: isLoadingSubscription, error: subscriptionError } = useSubscriptionStatus();
  const [canvases, setCanvases] = useState<Canvas[]>([]);
  const [isLoadingCanvases, setIsLoadingCanvases] = useState(true);
  const [canvasToDelete, setCanvasToDelete] = useState<Canvas | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [canCreateCanvas, setCanCreateCanvas] = useState(false);
  const [canvasCount, setCanvasCount] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      setShowSuccessMessage(true);
      refreshSubscription();
      navigate('/', { replace: true });
    }
  }, [location, navigate, refreshSubscription]);

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
      if (!canCreateCanvas && subscriptionStatus !== SUBSCRIPTION_STATUS.ACTIVE) {
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
        return <FileText className="h-6 w-6 text-[#FF6600]" />;
      case 'Value Proposition':
        return <PieChart className="h-6 w-6 text-[#FF6600]" />;
      case 'SWOT Analysis':
        return <BarChart2 className="h-6 w-6 text-[#FF6600]" />;
      case 'Empathy Map':
        return <Users className="h-6 w-6 text-[#FF6600]" />;
      case 'PESTEL Analysis':
        return <Compass className="h-6 w-6 text-[#FF6600]" />;
      default:
        return <FileText className="h-6 w-6 text-[#FF6600]" />;
    }
  };

  if (isLoading || isLoadingCanvases || isLoadingSubscription) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#F5F7FA] to-[#E6ECF2]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6600]"></div>
      </div>
    );
  }

  const showUpgradeBanner = subscriptionStatus !== SUBSCRIPTION_STATUS.ACTIVE;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#F5F7FA] to-[#E6ECF2] text-[#1E1F26] font-sans">
      <div className="container mx-auto px-4 py-8">
        {showSuccessMessage && (
          <Card className="mb-6 bg-green-100 border-l-4 border-green-500">
            <CardContent className="p-4">
              <p className="font-bold text-green-700">{t('dashboard.subscriptionSuccessful')}</p>
              <p className="text-green-700">{t('dashboard.subscriptionThankYou')}</p>
            </CardContent>
          </Card>
        )}
        
        {subscriptionError && (
          <Card className="mb-6 bg-red-100 border-l-4 border-red-500">
            <CardContent className="p-4">
              <p className="font-bold text-red-700">{t('dashboard.subscriptionError')}</p>
              <p className="text-red-700">{subscriptionError}</p>
            </CardContent>
          </Card>
        )}

        {showUpgradeBanner && (
          <Card className="mb-6 bg-[#F5F7FA] border-l-4 border-[#FF6600]">
            <CardContent className="p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 text-[#FF6600]" />
                <div>
                  <p className="font-bold text-[#1E1F26]">
                    {subscriptionStatus === SUBSCRIPTION_STATUS.FREE 
                      ? t('dashboard.freeTier') 
                      : subscriptionStatus === SUBSCRIPTION_STATUS.CANCELLED
                        ? t('dashboard.subscriptionCancelled')
                        : t('dashboard.subscriptionInactive')}
                  </p>
                  <p className="mt-1 text-[#6B7280]">
                    {t('dashboard.upgradeToPremium')}
                    {' '}
                    <Link to="/upgrade" className="font-bold underline text-[#FF6600]">{t('dashboard.upgradeNow')}</Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between items-start mb-8 flex-col sm:flex-row gap-4">
          <h1 className="text-4xl font-bold text-[#1E1F26]">{t('dashboard.myCanvases')}</h1>
          <div className="relative w-full sm:w-auto">
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors shadow-sm w-full sm:w-auto ${
                canCreateCanvas || subscriptionStatus === SUBSCRIPTION_STATUS.ACTIVE
                  ? 'bg-[#FF6600] text-white hover:bg-[#FF6600]/90'
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
              disabled={!canCreateCanvas && subscriptionStatus !== SUBSCRIPTION_STATUS.ACTIVE}
            >
              <Plus className="w-5 h-5 mr-2" />
              {t('dashboard.newCanvas')}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            {isDropdownOpen && (canCreateCanvas || subscriptionStatus === SUBSCRIPTION_STATUS.ACTIVE) && (
              <Card className="absolute right-0 mt-2 w-56 z-10">
                <CardContent className="p-0">
                  {['business', 'value-proposition', 'swot', 'empathy-map', 'pestel'].map((type) => (
                    <Button
                      key={type}
                      onClick={() => handleCreateCanvas(type as any)}
                      variant="ghost"
                      className="w-full justify-start rounded-none"
                    >
                      {t(`canvasTypes.${type}`)}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <Card className="mb-6 bg-white">
          <CardContent className="p-4">
            <p className="text-[#6B7280]">
              {t('dashboard.canvasesCreated')} {canvasCount} / {subscriptionStatus === SUBSCRIPTION_STATUS.ACTIVE ? '∞' : TIER_LIMITS[SUBSCRIPTION_STATUS.FREE].maxCanvases}
            </p>
            {subscriptionStatus !== SUBSCRIPTION_STATUS.ACTIVE && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-[#FF6600] h-2.5 rounded-full" 
                  style={{ width: `${(canvasCount / TIER_LIMITS[SUBSCRIPTION_STATUS.FREE].maxCanvases) * 100}%` }}
                ></div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {canvases.map((canvas) => (
            <Card key={canvas.id} className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {getCanvasIcon(canvas.type)}
                  <h3 className="text-xl font-semibold text-[#1E1F26] ml-2 truncate">
                    {canvas.title}
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                  <span className="text-sm text-[#6B7280]">
                    {t('dashboard.updated')}: {new Date(canvas.updated_at).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => navigate(getCanvasRoute(canvas))}
                      variant="ghost"
                      size="sm"
                      className="text-[#FF6600] hover:bg-[#FF6600]/10"
                    >
                      <Edit3 className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={() => setCanvasToDelete(canvas)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {canvases.length === 0 && (
          <Card className="bg-white">
            <CardContent className="p-12 text-center">
              <p className="text-[#6B7280] text-lg">
                {t('dashboard.noCanvases')}
              </p>
            </CardContent>
          </Card>
        )}

        {canvasToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="bg-white max-w-md w-full">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{t('dashboard.confirmDeletion')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">{t('dashboard.deleteConfirmation')}</p>
                <div className="flex justify-end space-x-4">
                  <Button
                    onClick={() => setCanvasToDelete(null)}
                    variant="outline"
                  >
                    {t('dashboard.cancel')}
                  </Button>
                  <Button
                    onClick={handleDeleteCanvas}
                    variant="destructive"
                  >
                    {t('dashboard.delete')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Component() {
  return <Dashboard />;
}