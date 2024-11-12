import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Sparkles, BookOpen } from 'lucide-react';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import { SUBSCRIPTION_STATUS } from '../constants/subscriptionTiers';
import { AIChat } from './AIChat';

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

  const isActive = subscriptionStatus === SUBSCRIPTION_STATUS.ACTIVE;

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-700">
      Please log in to access this page.
    </div>;
  }

  const handleAIAssistClick = () => {
    if (isActive) {
      setIsAIChatOpen(true);
    } else {
      alert("Please upgrade to a premium subscription to use the AI Assistant feature.");
    }
  };

  const handleExportPDF = () => {
    if (isActive) {
      onExportPDF();
    } else {
      alert("Please upgrade to a premium subscription to use the Export PDF feature.");
    }
  };

  const handleShowExamples = () => {
    if (isActive) {
      navigate('/examples');
    } else {
      alert("Please upgrade to a premium subscription to view example canvases.");
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto p-6 relative">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleExportPDF}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
              isActive ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            aria-label="Export PDF"
            disabled={!isActive}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
          <button
            onClick={handleAIAssistClick}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
              isActive ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            aria-label="AI Assistant"
            disabled={!isActive}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Assistant
          </button>
          <button
            onClick={handleShowExamples}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
              isActive ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-400 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
            aria-label="Show Examples"
            disabled={!isActive}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Show Examples
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>

      {children}

      <AIChat
        canvasContent={canvasContent}
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />
    </div>
  );
}