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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
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
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700"
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
        className="text-3xl font-bold text-gray-900 mb-8 px-2 py-1 border-2 border-transparent rounded focus:border-gray-500 focus:outline-none w-full"
        placeholder="Untitled Empathy Map"
      />

      <div className="mb-8 grid grid-cols-2 gap-4">
        <input
          type="text"
          value={project_name}
          onChange={(e) => setProject_name(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Project Name"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Author"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          rows={2}
          placeholder="Comments"
        />
      </div>

      <div className="relative border-2 border-gray-200 rounded-lg aspect-[16/10] mb-8 overflow-hidden bg-white">
        {/* Diagonal dotted lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full border-b border-dotted border-gray-300 transform rotate-45 origin-center" />
          <div className="absolute top-0 left-0 w-full h-full border-b border-dotted border-gray-300 transform -rotate-45 origin-center" />
        </div>

        {/* Center circle with smiley */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-gray-900 bg-white z-20 flex items-center justify-center">
          <div className="w-24 h-24 text-4xl">☺</div>
        </div>

        {/* Think & Feel section */}
        <div className="absolute top-0 left-0 right-0 h-1/2 flex items-start justify-center pt-4">
          <div className="w-2/3 text-center">
            <div className="text-xs text-gray-500 mb-1">what does (s)he</div>
            <h2 className="text-2xl font-bold mb-2">THINK & FEEL?</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <div>What really counts</div>
              <div>Major preoccupations</div>
              <div>Worries & aspirations</div>
            </div>
            <CanvasSection
              title=""
              items={canvas.content.thinkAndFeel || []}
              onUpdate={(items) => handleSectionUpdate('thinkAndFeel', items)}
              description=""
              className="mt-2"
            />
          </div>
        </div>

        {/* Hear section */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 flex items-center justify-start pl-8">
          <div className="w-2/3">
            <div className="text-xs text-gray-500 mb-1">what does (s)he</div>
            <h2 className="text-2xl font-bold mb-2">HEAR?</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <div>What friends say</div>
              <div>What the boss says</div>
              <div>What influencers say</div>
            </div>
            <CanvasSection
              title=""
              items={canvas.content.hear || []}
              onUpdate={(items) => handleSectionUpdate('hear', items)}
              description=""
              className="mt-2"
            />
          </div>
        </div>

        {/* See section */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 flex items-center justify-end pr-8">
          <div className="w-2/3 text-right">
            <div className="text-xs text-gray-500 mb-1">what does (s)he</div>
            <h2 className="text-2xl font-bold mb-2">SEE?</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Environment</div>
              <div>Friends</div>
              <div>What the market offers</div>
            </div>
            <CanvasSection
              title=""
              items={canvas.content.see || []}
              onUpdate={(items) => handleSectionUpdate('see', items)}
              description=""
              className="mt-2"
            />
          </div>
        </div>

        {/* Say & Do section */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 flex items-end justify-center pb-4">
          <div className="w-2/3 text-center">
            <div className="text-xs text-gray-500 mb-1">what does (s)he</div>
            <h2 className="text-2xl font-bold mb-2">SAY & DO?</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Attitude in public</div>
              <div>Appearance</div>
              <div>Behaviour towards others</div>
            </div>
            <CanvasSection
              title=""
              items={canvas.content.sayAndDo || []}
              onUpdate={(items) => handleSectionUpdate('sayAndDo', items)}
              description=""
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Bottom sections with dotted separator */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0 border-l border-dotted border-gray-300"></div>
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">☹</span>
              <h2 className="text-2xl font-bold">PAINS</h2>
            </div>
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <div>fears</div>
              <div>frustrations</div>
              <div>obstacles</div>
            </div>
            <CanvasSection
              title=""
              items={canvas.content.pains || []}
              onUpdate={(items) => handleSectionUpdate('pains', items)}
              description=""
            />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">GAINS</h2>
              <span className="text-2xl">☺</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <div>"wants"/needs</div>
              <div>measures of success</div>
              <div>obstacles</div>
            </div>
            <CanvasSection
              title=""
              items={canvas.content.gains || []}
              onUpdate={(items) => handleSectionUpdate('gains', items)}
              description=""
            />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <AIChat canvasContent={canvas.content} />
      </div>
    </div>
  );
}