import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getCanvas, updateCanvas } from '../lib/db';
import { CanvasSection } from '../components/CanvasSection';
import { icons } from '../utils/icons';
import { CanvasWrapper } from '../components/CanvasWrapper';

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
  const [canvas, setCanvas] = useState<CanvasData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [project_name, setProject_name] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);

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

  const handleExportPDF = () => {
    console.log('Exporting PDF...');
    // Implementar la lógica de exportación a PDF aquí
  };

  const handleAIAssist = () => {
    console.log('Opening AI Assistant...');
    // Implementar la lógica del asistente AI aquí
  };

  const handleSave = async () => {
    if (canvas) {
      try {
        await updateCanvas(canvas.id, canvas);
        console.log('Canvas saved successfully!');
      } catch (error) {
        console.error('Error saving canvas:', error);
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
      <div className="mb-4 grid grid-cols-3 gap-4">
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

      <div className="grid grid-cols-2 gap-8">
        {/* Left side - Square section */}
        <div className="relative border-2 border-gray-200 rounded-lg p-6 aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-blue-200/30"></div>
          <div className="relative grid grid-cols-2 gap-4 h-full z-10">
            <div className="relative">
              <CanvasSection
                title="Products and Services"
                items={canvas.content.productsAndServices || []}
                onUpdate={(items) => handleSectionUpdate('productsAndServices', items)}
                description="What products and services do you offer?"
                icon={icons.products}
                className="h-full bg-white/50"
              />
            </div>
            <div className="relative">
              <CanvasSection
                title="Gain Creators"
                items={canvas.content.gainCreators || []}
                onUpdate={(items) => handleSectionUpdate('gainCreators', items)}
                description="How do you create customer gains?"
                icon={icons.gainCreators}
                className="h-full bg-white/50"
              />
            </div>
            <div className="relative col-span-2">
              <CanvasSection
                title="Pain Relievers"
                items={canvas.content.painRelievers || []}
                onUpdate={(items) => handleSectionUpdate('painRelievers', items)}
                description="How do you relieve customer pains?"
                icon={icons.painRelievers}
                className="h-full bg-white/50"
              />
            </div>
          </div>
        </div>

        {/* Right side - Circle section */}
        <div className="relative border-2 border-gray-200 rounded-full aspect-square">
          <div className="absolute inset-0 bg-blue-200/30 rounded-full"></div>
          <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4">
            <div className="relative z-20">
              <CanvasSection
                title="Customer Jobs"
                items={canvas.content.customerJobs || []}
                onUpdate={(items) => handleSectionUpdate('customerJobs', items)}
                description="What jobs do your customers need to get done?"
                icon={icons.customerJobs}
                className="h-full bg-white/50"
              />
            </div>
            <div className="relative z-20">
              <CanvasSection
                title="Gains"
                items={canvas.content.gains || []}
                onUpdate={(items) => handleSectionUpdate('gains', items)}
                description="What gains do your customers desire?"
                icon={icons.gains}
                className="h-full bg-white/50"
              />
            </div>
            <div className="relative col-span-2 z-20">
              <CanvasSection
                title="Pains"
                items={canvas.content.pains || []}
                onUpdate={(items) => handleSectionUpdate('pains', items)}
                description="What pains do your customers experience?"
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