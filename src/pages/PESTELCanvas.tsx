import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { getCanvas, updateCanvas } from '../lib/db';
import { CanvasSection } from '../components/CanvasSection';
import { AIChat } from '../components/AIChat';
import { icons } from '../utils/icons';

interface PESTELCanvasData {
  id: string;
  title: string;
  content: {
    political: string[];
    economic: string[];
    social: string[];
    technological: string[];
    environmental: string[];
    legal: string[];
  };
  project_name: string;
  author: string;
  date: string;
  comments: string;
}

const sectionStyles = {
  political: {
    bgColor: 'bg-[#4DB6AC]',
    lightBg: 'bg-[#B2DFDB]',
    textColor: 'text-white',
  },
  economic: {
    bgColor: 'bg-[#FF7043]',
    lightBg: 'bg-[#FFCCBC]',
    textColor: 'text-white',
  },
  social: {
    bgColor: 'bg-[#C0CA33]',
    lightBg: 'bg-[#F0F4C3]',
    textColor: 'text-white',
  },
  technological: {
    bgColor: 'bg-[#4DB6AC]',
    lightBg: 'bg-[#B2DFDB]',
    textColor: 'text-white',
  },
  environmental: {
    bgColor: 'bg-[#FF7043]',
    lightBg: 'bg-[#FFCCBC]',
    textColor: 'text-white',
  },
  legal: {
    bgColor: 'bg-[#C0CA33]',
    lightBg: 'bg-[#F0F4C3]',
    textColor: 'text-white',
  },
};

export function PESTELCanvas() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [canvas, setCanvas] = useState<PESTELCanvasData | null>(null);
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

  const handleSectionUpdate = async (section: keyof PESTELCanvasData['content'], items: string[]) => {
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
        placeholder="Untitled PESTEL Analysis"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(canvas.content).map(([key, items]) => {
          const sectionKey = key as keyof typeof sectionStyles;
          const style = sectionStyles[sectionKey];
          
          return (
            <div key={key} className="flex flex-col">
              <div className={`flex flex-col items-center ${style.lightBg} rounded-lg overflow-hidden`}>
                <div className={`w-20 h-20 ${style.bgColor} rounded-full flex items-center justify-center -mt-10 mb-2 shadow-lg`}>
                  <span className="text-3xl font-bold text-white">
                    {key.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className={`text-xl font-semibold mb-4 ${style.bgColor} w-full text-center py-2 text-white`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h3>
                <div className="p-4 min-h-[200px] w-full">
                  <CanvasSection
                    title=""
                    items={items}
                    onUpdate={(newItems) => handleSectionUpdate(sectionKey, newItems)}
                    description=""
                    className="bg-transparent"
                    icon={icons[sectionKey]}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-8">
        <AIChat canvasContent={canvas.content} />
      </div>
    </div>
  );
}