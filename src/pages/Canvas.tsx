import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getCanvas, updateCanvas } from '../lib/db';
import { CanvasSection } from '../components/CanvasSection';
import { icons } from '../utils/icons';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';

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
    <div className="max-w-[1600px] mx-auto p-6 relative">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      <input
        ref={titleInputRef}
        type="text"
        value={canvas?.title || ''}
        onChange={(e) => {
          setCanvas({ ...canvas, title: e.target.value });
        }}
        onBlur={(e) => handleUpdateTitle(e.target.value)}
        className="text-3xl font-bold text-gray-900 mb-4 px-2 py-1 border-2 border-transparent rounded focus:border-blue-500 focus:outline-none w-full"
        placeholder={`Untitled ${canvas?.type || ''} Canvas`}
      />

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

      <div className="relative border-2 border-gray-200 rounded-lg p-6 overflow-hidden">
        <div className="absolute inset-0 bg-blue-200/30"></div>
        <div className="relative z-10 grid grid-cols-5 gap-4">
          <CanvasSection
            title="Key Partners"
            items={canvas.content.keyPartners}
            onUpdate={(items) => handleSectionUpdate('keyPartners', items)}
            description="Who are your key partners and suppliers?"
            className="h-full bg-white/50"
            icon={icons.keyPartnerships}
          />
          <div className="grid grid-rows-2 gap-4">
            <CanvasSection
              title="Key Activities"
              items={canvas.content.keyActivities}
              onUpdate={(items) => handleSectionUpdate('keyActivities', items)}
              description="What key activities does your value proposition require?"
              className="h-full bg-white/50"
              icon={icons.keyActivities}
            />
            <CanvasSection
              title="Key Resources"
              items={canvas.content.keyResources}
              onUpdate={(items) => handleSectionUpdate('keyResources', items)}
              description="What key resources does your value proposition require?"
              className="h-full bg-white/50"
              icon={icons.keyResources}
            />
          </div>
          <CanvasSection
            title="Value Propositions"
            items={canvas.content.valuePropositions}
            onUpdate={(items) => handleSectionUpdate('valuePropositions', items)}
            description="What value do you deliver to the customer?"
            className="h-full bg-white/50"
            icon={icons.valuePropositions}
          />
          <div className="grid grid-rows-2 gap-4">
            <CanvasSection
              title="Customer Relationships"
              items={canvas.content.customerRelationships}
              onUpdate={(items) => handleSectionUpdate('customerRelationships', items)}
              description="What relationship does each customer segment expect?"
              className="h-full bg-white/50"
              icon={icons.customerRelationships}
            />
            <CanvasSection
              title="Channels"
              items={canvas.content.channels}
              onUpdate={(items) => handleSectionUpdate('channels', items)}
              description="Which channels do your customers prefer?"
              className="h-full bg-white/50"
              icon={icons.channels}
            />
          </div>
          <CanvasSection
            title="Customer Segments"
            items={canvas.content.customerSegments}
            onUpdate={(items) => handleSectionUpdate('customerSegments', items)}
            description="For whom are you creating value?"
            className="h-full bg-white/50"
            icon={icons.customerSegments}
          />
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4 mt-4">
          <CanvasSection
            title="Cost Structure"
            items={canvas.content.costStructure}
            onUpdate={(items) => handleSectionUpdate('costStructure', items)}
            description="What are the most important costs inherent in your business model?"
            className="h-full bg-white/50"
            icon={icons.costStructure}
          />
          <CanvasSection
            title="Revenue Streams"
            items={canvas.content.revenueStreams}
            onUpdate={(items) => handleSectionUpdate('revenueStreams', items)}
            description="For what value are your customers really willing to pay?"
            className="h-full bg-white/50"
            icon={icons.revenueStreams}
          />
        </div>
      </div>
    </div>
  );
}