import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCanvas, updateCanvas } from '../lib/db';
import { CanvasSection } from '../components/CanvasSection';
import { icons } from '../utils/icons';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import { CanvasWrapper } from '../components/CanvasWrapper';
import { exportSWOTToPDF } from '../utils/swotPdfExport';

interface SWOTCanvasData {
  id: string;
  title: string;
  content: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  project_name: string;
  author: string;
  date: string;
  comments: string;
}

export function SWOTCanvas() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, subscriptionTier } = useAuthWithSubscription();
  const [canvas, setCanvas] = useState<SWOTCanvasData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [project_name, setProject_name] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    async function fetchCanvas() {
      if (id) {
        setIsLoading(true);
        try {
          const fetchedCanvas = await getCanvas(id);
          setCanvas(fetchedCanvas);
          setProject_name(fetchedCanvas?.project_name || '');
          setAuthor(fetchedCanvas?.author || '');
          setDate(fetchedCanvas?.date || '');
          setComments(fetchedCanvas?.comments || '');
        } catch (error) {
          console.error('Error fetching canvas:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchCanvas();
  }, [id]);

  const handleUpdateTitle = async (title: string) => {
    if (!title.trim() || !canvas) return;
    try {
      const updatedCanvas = await updateCanvas(canvas.id, { ...canvas, title });
      setCanvas(updatedCanvas);
    } catch (error) {
      console.error('Error updating canvas title:', error);
    }
  };

  const handleSectionUpdate = async (section: keyof SWOTCanvasData['content'], items: string[]) => {
    if (!canvas) return;
    const updatedContent = { ...canvas.content, [section]: items };
    try {
      const updatedCanvas = await updateCanvas(canvas.id, { ...canvas, content: updatedContent });
      setCanvas(updatedCanvas);
    } catch (error) {
      console.error('Error updating canvas section:', error);
    }
  };

  const handleUpdateCanvasInfo = async () => {
    if (!canvas) return;
    try {
      const updatedCanvas = await updateCanvas(canvas.id, {
        ...canvas,
        project_name,
        author,
        date,
        comments
      });
      setCanvas(updatedCanvas);
    } catch (error) {
      console.error('Error updating canvas info:', error);
    }
  };

  const handleExportPDF = async () => {
    if (canvas) {
      try {
        await exportSWOTToPDF(canvas);
        console.log('PDF exported successfully');
      } catch (error) {
        console.error('Error exporting PDF:', error);
        alert('Failed to export PDF. Please try again.');
      }
    }
  };

  const handleAIAssist = () => {
    console.log('AI Assist functionality not implemented yet');
  };

  const handleSave = async () => {
    if (canvas) {
      try {
        await updateCanvas(canvas.id, canvas);
        console.log('Canvas saved successfully');
      } catch (error) {
        console.error('Error saving canvas:', error);
        alert('Failed to save canvas. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!canvas) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-gray-600">Canvas not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <CanvasWrapper
      title={canvas.title}
      onExportPDF={handleExportPDF}
      onAIAssist={handleAIAssist}
      onSave={handleSave}
    >
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={project_name}
          onChange={(e) => setProject_name(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Project Name"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Author"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Comments"
        />
      </div>

      <div className="relative border-2 border-gray-200 rounded-lg p-4 sm:p-6 overflow-hidden">
        <div className="absolute inset-0 bg-blue-200/30"></div>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CanvasSection
            title="Strengths"
            items={canvas.content.strengths || []}
            onUpdate={(items) => handleSectionUpdate('strengths', items)}
            description="Internal factors that give an advantage over others"
            className="h-full bg-white/50"
            icon={icons.strength}
          />
          <CanvasSection
            title="Weaknesses"
            items={canvas.content.weaknesses || []}
            onUpdate={(items) => handleSectionUpdate('weaknesses', items)}
            description="Internal factors that place the business at a disadvantage"
            className="h-full bg-white/50"
            icon={icons.weakness}
          />
          <CanvasSection
            title="Opportunities"
            items={canvas.content.opportunities || []}
            onUpdate={(items) => handleSectionUpdate('opportunities', items)}
            description="External factors that the business could exploit to its advantage"
            className="h-full bg-white/50"
            icon={icons.opportunity}
          />
          <CanvasSection
            title="Threats"
            items={canvas.content.threats || []}
            onUpdate={(items) => handleSectionUpdate('threats', items)}
            description="External factors that could cause trouble for the business"
            className="h-full bg-white/50"
            icon={icons.threat}
          />
        </div>
      </div>
    </CanvasWrapper>
  );
}