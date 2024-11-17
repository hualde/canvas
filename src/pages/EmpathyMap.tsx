import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCanvas, updateCanvas } from '../lib/db';
import { CanvasSection } from '../components/CanvasSection';
import { icons } from '../utils/icons';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import { CanvasWrapper } from '../components/CanvasWrapper';
import { exportEmpathyMapToPDF } from '../utils/empathyMapPdfExport';
import { useTranslation } from 'react-i18next';

interface EmpathyMapData {
  id: string;
  title: string;
  content: {
    thinkAndFeel: string[];
    see: string[];
    hear: string[];
    sayAndDo: string[];
    pains: string[];
    gains: string[];
  };
  project_name: string;
  author: string;
  date: string;
  comments: string;
}

export function EmpathyMap() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, subscriptionTier } = useAuthWithSubscription();
  const [canvas, setCanvas] = useState<EmpathyMapData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [project_name, setProject_name] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

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

  const handleSectionUpdate = async (section: keyof EmpathyMapData['content'], items: string[]) => {
    if (!canvas) return;
    const updatedItems = items.map(item => item.trim().replace(/^[•\-]\s*/, '')).filter(Boolean);
    const updatedContent = { ...canvas.content, [section]: updatedItems };
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
    if (canvas && user) {
      try {
        await exportEmpathyMapToPDF(canvas, user.sub);
        console.log('PDF exported successfully');
      } catch (error) {
        console.error('Error exporting PDF:', error);
        alert(t('empathyMap.pdfExportError'));
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
        alert(t('empathyMap.saveError'));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!canvas) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-gray-600">{t('empathyMap.notFound')}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {t('empathyMap.returnToDashboard')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <CanvasWrapper
      title={canvas.title}
      onExportPDF={handleExportPDF}
      canvasContent={canvas.content}
    >
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <input
          type="text"
          value={project_name}
          onChange={(e) => setProject_name(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('empathyMap.projectName')}
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('empathyMap.author')}
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
          placeholder={t('empathyMap.comments')}
        />
      </div>

      <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-blue-200/30"></div>
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <CanvasSection
            title={t('empathyMap.sections.thinkAndFeel.title')}
            items={canvas.content.thinkAndFeel || []}
            onUpdate={(items) => handleSectionUpdate('thinkAndFeel', items)}
            description={t('empathyMap.sections.thinkAndFeel.description')}
            className="bg-white/50 border border-gray-200"
            icon={icons.think}
          />
          <CanvasSection
            title={t('empathyMap.sections.see.title')}
            items={canvas.content.see || []}
            onUpdate={(items) => handleSectionUpdate('see', items)}
            description={t('empathyMap.sections.see.description')}
            className="bg-white/50 border border-gray-200"
            icon={icons.see}
          />
          <CanvasSection
            title={t('empathyMap.sections.hear.title')}
            items={canvas.content.hear || []}
            onUpdate={(items) => handleSectionUpdate('hear', items)}
            description={t('empathyMap.sections.hear.description')}
            className="bg-white/50 border border-gray-200"
            icon={icons.hear}
          />
          <CanvasSection
            title={t('empathyMap.sections.sayAndDo.title')}
            items={canvas.content.sayAndDo || []}
            onUpdate={(items) => handleSectionUpdate('sayAndDo', items)}
            description={t('empathyMap.sections.sayAndDo.description')}
            className="bg-white/50 border border-gray-200"
            icon={icons.sayDo}
          />
          <CanvasSection
            title={t('empathyMap.sections.pains.title')}
            items={canvas.content.pains || []}
            onUpdate={(items) => handleSectionUpdate('pains', items)}
            description={t('empathyMap.sections.pains.description')}
            className="!bg-green-100 border border-gray-200"
            icon={icons.pain}
          />
          <CanvasSection
            title={t('empathyMap.sections.gains.title')}
            items={canvas.content.gains || []}
            onUpdate={(items) => handleSectionUpdate('gains', items)}
            description={t('empathyMap.sections.gains.description')}
            className="!bg-green-100 border border-gray-200"
            icon={icons.gain}
          />
        </div>
      </div>
    </CanvasWrapper>
  );
}