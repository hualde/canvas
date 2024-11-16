import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCanvas, updateCanvas } from '../lib/db';
import { CanvasSection } from '../components/CanvasSection';
import { icons } from '../utils/icons';
import { CanvasWrapper } from '../components/CanvasWrapper';
import { exportToPDF } from '../utils/valuePropositionPdfExport';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

interface CanvasData {
  id: string;
  title: string;
  content: {
    productsAndServices: string[];
    gainCreators: string[];
    painRelievers: string[];
    customerJobs: string[];
    gains: string[];
    pains: string[];
  };
  project_name: string;
  author: string;
  date: string;
  comments: string;
}

export function ValuePropositionCanvas() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [canvas, setCanvas] = useState<CanvasData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [project_name, setProject_name] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth0();
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

  const handleSectionUpdate = async (section: keyof CanvasData['content'], items: string[]) => {
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
    if (canvas && user) {
      try {
        await exportToPDF(canvas, user.sub);
        console.log('PDF exported successfully');
      } catch (error) {
        console.error('Error exporting PDF:', error);
        if (error instanceof Error) {
          alert(t('valuePropositionCanvas.pdfExportError', { error: error.message }));
        }
      }
    }
  };

  const handleAIAssist = () => {
    console.log('Opening AI Assistant...');
    // Implement AI assistant logic here
  };

  const handleSave = async () => {
    if (canvas) {
      try {
        await updateCanvas(canvas.id, canvas);
        console.log('Canvas saved successfully!');
      } catch (error) {
        console.error('Error saving canvas:', error);
        alert(t('valuePropositionCanvas.saveError'));
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
          <p className="text-gray-600">{t('valuePropositionCanvas.notFound')}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {t('valuePropositionCanvas.returnToDashboard')}
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
          placeholder={t('valuePropositionCanvas.projectName')}
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={t('valuePropositionCanvas.author')}
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
          placeholder={t('valuePropositionCanvas.comments')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Square section */}
        <div className="relative border-2 border-gray-200 rounded-lg p-4 md:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-blue-200/30"></div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 h-full z-10">
            <div className="relative">
              <CanvasSection
                title={t('valuePropositionCanvas.sections.productsAndServices.title')}
                items={canvas.content.productsAndServices || []}
                onUpdate={(items) => handleSectionUpdate('productsAndServices', items)}
                description={t('valuePropositionCanvas.sections.productsAndServices.description')}
                icon={icons.products}
                className="h-full bg-white/50"
              />
            </div>
            <div className="relative">
              <CanvasSection
                title={t('valuePropositionCanvas.sections.gainCreators.title')}
                items={canvas.content.gainCreators || []}
                onUpdate={(items) => handleSectionUpdate('gainCreators', items)}
                description={t('valuePropositionCanvas.sections.gainCreators.description')}
                icon={icons.gainCreators}
                className="h-full bg-white/50"
              />
            </div>
            <div className="relative col-span-1 sm:col-span-2">
              <CanvasSection
                title={t('valuePropositionCanvas.sections.painRelievers.title')}
                items={canvas.content.painRelievers || []}
                onUpdate={(items) => handleSectionUpdate('painRelievers', items)}
                description={t('valuePropositionCanvas.sections.painRelievers.description')}
                icon={icons.painRelievers}
                className="h-full bg-white/50"
              />
            </div>
          </div>
        </div>

        {/* Right side - Circle section */}
        <div className="relative border-2 border-gray-200 rounded-lg lg:rounded-full aspect-auto lg:aspect-square">
          <div className="absolute inset-0 bg-blue-200/30 rounded-lg lg:rounded-full"></div>
          <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
            <div className="relative z-20">
              <CanvasSection
                title={t('valuePropositionCanvas.sections.customerJobs.title')}
                items={canvas.content.customerJobs || []}
                onUpdate={(items) => handleSectionUpdate('customerJobs', items)}
                description={t('valuePropositionCanvas.sections.customerJobs.description')}
                icon={icons.customerJobs}
                className="h-full bg-white/50"
              />
            </div>
            <div className="relative z-20">
              <CanvasSection
                title={t('valuePropositionCanvas.sections.gains.title')}
                items={canvas.content.gains || []}
                onUpdate={(items) => handleSectionUpdate('gains', items)}
                description={t('valuePropositionCanvas.sections.gains.description')}
                icon={icons.gains}
                className="h-full bg-white/50"
              />
            </div>
            <div className="relative col-span-1 sm:col-span-2 z-20">
              <CanvasSection
                title={t('valuePropositionCanvas.sections.pains.title')}
                items={canvas.content.pains || []}
                onUpdate={(items) => handleSectionUpdate('pains', items)}
                description={t('valuePropositionCanvas.sections.pains.description')}
                icon={icons.pains}
                className="h-full bg-white/50"
              />
            </div>
          </div>
        </div>
      </div>
    </CanvasWrapper>
  );
}