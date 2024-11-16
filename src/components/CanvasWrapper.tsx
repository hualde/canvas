import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Sparkles, BookOpen, Menu } from 'lucide-react';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import { SUBSCRIPTION_STATUS } from '../constants/subscriptionTiers';
import { AIChat } from './AIChat';
import { useTranslation } from 'react-i18next';

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
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          {t('canvasWrapper.backToDashboard')}
        </button>
        <div className="flex items-center space-x-4">
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">{t('canvasWrapper.openMenu')}</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:flex sm:space-x-4 flex-col sm:flex-row space-y-2 sm:space-y-0 w-full sm:w-auto`}>
            <button
              onClick={handleExportPDF}
              className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                isActive ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full sm:w-auto`}
              aria-label={t('canvasWrapper.exportPDF')}
              disabled={!isActive}
            >
              <Download className="h-4 w-4 mr-2" />
              {t('canvasWrapper.exportPDF')}
            </button>
            <button
              onClick={handleAIAssistClick}
              className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                isActive ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 w-full sm:w-auto`}
              aria-label={t('canvasWrapper.aiAssistant')}
              disabled={!isActive}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {t('canvasWrapper.aiAssistant')}
            </button>
            <button
              onClick={handleShowExamples}
              className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                isActive ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 w-full sm:w-auto`}
              aria-label={t('canvasWrapper.showExamples')}
              disabled={!isActive}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              {t('canvasWrapper.showExamples')}
            </button>
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