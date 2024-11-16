import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCanvas, updateCanvas } from '../lib/db';
import { CanvasSection } from '../components/CanvasSection';
import { icons } from '../utils/icons';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import { CanvasWrapper } from '../components/CanvasWrapper';
import { exportToPDF } from '../utils/pdfExport';
import { useTranslation } from 'react-i18next';

interface CanvasData {
  id: string;
  title: string;
  type: string;
  content: {
    keyPartners: string[];
    keyActivities: string[];
    keyResources: string[];
    valuePropositions: string[];
    customerRelationships: string[];
    channels: string[];
    customerSegments: string[];
    costStructure: string[];
    revenueStreams: string[];
  };
  project_name: string;
  author: string;
  date: string;
  comments: string;
}

export default function Canvas() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, subscriptionTier } = useAuthWithSubscription();
  const [canvas, setCanvas] = useState<CanvasData | null>(null);
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

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [canvas?.title]);

  const handleSectionUpdate = async (section: keyof CanvasData['content'], items: string[]) => {
    if (!canvas) return;
    const updatedItems = items.map(item => item.startsWith('• ') ? item : `• ${item}`);
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
    if (canvas) {
      try {
        await exportToPDF(canvas);
        console.log('PDF exported successfully');
      } catch (error) {
        console.error('Error exporting PDF:', error);
        alert(t('canvas.pdfExportError'));
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
        alert(t('canvas.saveError'));
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
          <p className="text-gray-600">{t('canvas.notFound')}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {t('canvas.returnToDashboard')}
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
          placeholder={t('canvas.projectName')}
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('canvas.author')}
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
          placeholder={t('canvas.comments')}
        />
      </div>

      <div className="relative border-2 border-gray-200 rounded-lg p-4 md:p-6 overflow-hidden">
        <div className="absolute inset-0 bg-blue-200/30"></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <CanvasSection
            title={t('canvas.sections.keyPartners.title')}
            items={canvas.content.keyPartners}
            onUpdate={(items) => handleSectionUpdate('keyPartners', items)}
            description={t('canvas.sections.keyPartners.description')}
            className="h-full bg-white/50"
            icon={icons.keyPartnerships}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <CanvasSection
              title={t('canvas.sections.keyActivities.title')}
              items={canvas.content.keyActivities}
              onUpdate={(items) => handleSectionUpdate('keyActivities', items)}
              description={t('canvas.sections.keyActivities.description')}
              className="h-full bg-white/50"
              icon={icons.keyActivities}
            />
            <CanvasSection
              title={t('canvas.sections.keyResources.title')}
              items={canvas.content.keyResources}
              onUpdate={(items) => handleSectionUpdate('keyResources', items)}
              description={t('canvas.sections.keyResources.description')}
              className="h-full bg-white/50"
              icon={icons.keyResources}
            />
          </div>
          <CanvasSection
            title={t('canvas.sections.valuePropositions.title')}
            items={canvas.content.valuePropositions}
            onUpdate={(items) => handleSectionUpdate('valuePropositions', items)}
            description={t('canvas.sections.valuePropositions.description')}
            className="h-full bg-white/50"
            icon={icons.valuePropositions}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <CanvasSection
              title={t('canvas.sections.customerRelationships.title')}
              items={canvas.content.customerRelationships}
              onUpdate={(items) => handleSectionUpdate('customerRelationships', items)}
              description={t('canvas.sections.customerRelationships.description')}
              className="h-full bg-white/50"
              icon={icons.customerRelationships}
            />
            <CanvasSection
              title={t('canvas.sections.channels.title')}
              items={canvas.content.channels}
              onUpdate={(items) => handleSectionUpdate('channels', items)}
              description={t('canvas.sections.channels.description')}
              className="h-full bg-white/50"
              icon={icons.channels}
            />
          </div>
          <CanvasSection
            title={t('canvas.sections.customerSegments.title')}
            items={canvas.content.customerSegments}
            onUpdate={(items) => handleSectionUpdate('customerSegments', items)}
            description={t('canvas.sections.customerSegments.description')}
            className="h-full bg-white/50"
            icon={icons.customerSegments}
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <CanvasSection
            title={t('canvas.sections.costStructure.title')}
            items={canvas.content.costStructure}
            onUpdate={(items) => handleSectionUpdate('costStructure', items)}
            description={t('canvas.sections.costStructure.description')}
            className="h-full bg-white/50"
            icon={icons.costStructure}
          />
          <CanvasSection
            title={t('canvas.sections.revenueStreams.title')}
            items={canvas.content.revenueStreams}
            onUpdate={(items) => handleSectionUpdate('revenueStreams', items)}
            description={t('canvas.sections.revenueStreams.description')}
            className="h-full bg-white/50"
            icon={icons.revenueStreams}
          />
        </div>
      </div>
    </CanvasWrapper>
  );
}