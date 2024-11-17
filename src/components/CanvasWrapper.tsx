import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Sparkles, BookOpen, Menu } from 'lucide-react';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import { SUBSCRIPTION_STATUS } from '../constants/subscriptionTiers';
import { AIChat } from './AIChat';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";

interface CanvasWrapperProps {
  children: ReactNode;
  title: string;
  onExportPDF: () => void;
  canvasContent: Record<string, string[]>;
}

export function CanvasWrapper({ 
  children, 
  title, 
  onExportPDF,
  canvasContent
}: CanvasWrapperProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, subscriptionStatus } = useAuthWithSubscription();
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const isActive = subscriptionStatus === SUBSCRIPTION_STATUS.ACTIVE;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-700">
        {t('canvasWrapper.pleaseLogin')}
      </div>
    );
  }

  const handleAIAssistClick = () => {
    if (isActive) {
      setIsAIChatOpen(true);
    } else {
      alert(t('canvasWrapper.upgradeForAI'));
    }
  };

  const handleExportPDF = () => {
    if (isActive) {
      onExportPDF();
    } else {
      alert(t('canvasWrapper.upgradeForPDF'));
    }
  };

  const handleShowExamples = () => {
    if (isActive) {
      navigate('/examples');
    } else {
      alert(t('canvasWrapper.upgradeForExamples'));
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 relative">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 p-0"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('canvasWrapper.backToDashboard')}
        </Button>
        <div className="flex items-center space-x-4">
          <div className="sm:hidden">
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">{t('canvasWrapper.openMenu')}</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </Button>
          </div>
          <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:flex sm:space-x-4 flex-col sm:flex-row space-y-2 sm:space-y-0 w-full sm:w-auto`}>
            <Button
              onClick={handleExportPDF}
              variant={isActive ? "default" : "secondary"}
              className="w-full sm:w-auto"
              disabled={!isActive}
            >
              <Download className="h-4 w-4 mr-2" />
              {t('canvasWrapper.exportPDF')}
            </Button>
            <Button
              onClick={handleAIAssistClick}
              variant={isActive ? "default" : "secondary"}
              className="w-full sm:w-auto"
              disabled={!isActive}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {t('canvasWrapper.aiAssistant')}
            </Button>
            <Button
              onClick={handleShowExamples}
              variant={isActive ? "default" : "secondary"}
              className="w-full sm:w-auto"
              disabled={!isActive}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {t('canvasWrapper.showExamples')}
            </Button>
          </div>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">{title}</h1>

      {children}

      <AIChat
        canvasContent={canvasContent}
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />
    </div>
  );
}