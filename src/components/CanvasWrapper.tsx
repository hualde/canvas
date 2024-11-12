import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Sparkles, Save } from 'lucide-react';

interface CanvasWrapperProps {
  children: ReactNode;
  title: string;
  isActive: boolean;
  onExportPDF: () => void;
  onAIAssist: () => void;
  onSave: () => void;
}

export function CanvasWrapper({ 
  children, 
  title, 
  isActive, 
  onExportPDF, 
  onAIAssist, 
  onSave 
}: CanvasWrapperProps) {
  const navigate = useNavigate();

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
            onClick={onExportPDF}
            disabled={!isActive}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
              isActive ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            aria-label="Export PDF"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
          <button
            onClick={onAIAssist}
            disabled={!isActive}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
              isActive ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            aria-label="AI Assistant"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            AI Assistant
          </button>
          <button
            onClick={onSave}
            disabled={!isActive}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
              isActive ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            aria-label="Save"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>

      {children}
    </div>
  );
}