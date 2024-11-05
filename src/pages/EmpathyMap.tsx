import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { getCanvas, updateCanvas } from '../lib/db';
import { CanvasSection } from '../components/CanvasSection';
import { AIChat } from '../components/AIChat';
import { icons } from '../utils/icons';

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
  const { user } = useAuth0();
  const [canvas, setCanvas] = useState<EmpathyMapData | null>(null);
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

  const handleSectionUpdate = async (section: keyof EmpathyMapData['content'], items: string[]) => {
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
        type="text"
        value={canvas.title}
        onChange={(e) => handleUpdateTitle(e.target.value)}
        className="text-3xl font-bold text-gray-900 mb-8 px-2 py-1 border-2 border-transparent rounded focus:border-blue-500 focus:outline-none w-full"
        placeholder="Untitled Empathy Map"
      />

      <div className="mb-8 grid grid-cols-2 gap-4">
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
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
          placeholder="Comments"
        />
      </div>

      <div className="relative border-2 border-gray-200 rounded-lg aspect-[16/10] mb-8">
        <div className="absolute inset-0">
          {/* Central circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-gray-200 rounded-full bg-white z-20 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="font-semibold">User/Customer</div>
              <div className="text-sm">Profile</div>
            </div>
          </div>

          {/* Back section - Think & Feel */}
          <div className="absolute inset-0 flex items-center justify-center">
            <CanvasSection
              title="Think & Feel?"
              items={canvas.content.thinkAndFeel || []}
              onUpdate={(items) => handleSectionUpdate('thinkAndFeel', items)}
              description="What might your user be thinking and feeling?"
              className="h-full w-full bg-purple-50 z-0"
              icon={icons.thinkAndFeel}
            />
          </div>

          {/* Right section - See */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 z-10">
            <CanvasSection
              title="See?"
              items={canvas.content.see || []}
              onUpdate={(items) => handleSectionUpdate('see', items)}
              description="What does your user see in their environment?"
              className="h-full bg-blue-50"
              icon={icons.see}
            />
          </div>

          {/* Left section - Hear */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 z-10">
            <CanvasSection
              title="Hear?"
              items={canvas.content.hear || []}
              onUpdate={(items) => handleSectionUpdate('hear', items)}
              description="What does your user hear from others?"
              className="h-full bg-green-50"
              icon={icons.hear}
            />
          </div>

          {/* Bottom section - Say & Do */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 z-10">
            <CanvasSection
              title="Say & Do?"
              items={canvas.content.sayAndDo || []}
              onUpdate={(items) => handleSectionUpdate('sayAndDo', items)}
              description="What does your user say and do?"
              className="h-full bg-yellow-50"
              icon={icons.sayAndDo}
            />
          </div>
        </div>
      </div>

      {/* Bottom sections - Pains and Gains */}
      <div className="grid grid-cols-2 gap-4">
        <CanvasSection
          title="Pain"
          items={canvas.content.pains || []}
          onUpdate={(items) => handleSectionUpdate('pains', items)}
          description="What are your user's fears, frustrations, and anxieties?"
          className="bg-red-50"
          icon={icons.pains}
        />
        <CanvasSection
          title="Gain"
          items={canvas.content.gains || []}
          onUpdate={(items) => handleSectionUpdate('gains', items)}
          description="What are your user's wants, needs, and measures of success?"
          className="bg-emerald-50"
          icon={icons.gains}
        />
      </div>

      <AIChat canvasContent={canvas.content} />
    </div>
  );
}