import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCanvas, updateCanvas } from '../lib/db';
import { CanvasSection } from '../components/CanvasSection';
import { icons } from '../utils/icons';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import { CanvasWrapper } from '../components/CanvasWrapper';
import { exportPESTELToPDF } from '../utils/pestelPdfExport';

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

const sections = [
  { 
    key: 'political', 
    color: '#4DB6AC', 
    lightColor: '#B2DFDB', 
    label: 'Political', 
    description: 'What political factors can affect your business?'
  },
  { 
    key: 'economic', 
    color: '#FF7043', 
    lightColor: '#FFCCBC', 
    label: 'Economic', 
    description: 'What are the economic conditions influencing your market?'
  },
  { 
    key: 'social', 
    color: '#C0CA33', 
    lightColor: '#F0F4C3', 
    label: 'Social', 
    description: 'What social and cultural trends affect your audience?'
  },
  { 
    key: 'technological', 
    color: '#4DB6AC', 
    lightColor: '#B2DFDB', 
    label: 'Technological', 
    description: 'How does technology impact your industry and products?'
  },
  { 
    key: 'environmental', 
    color: '#FF7043', 
    lightColor: '#FFCCBC', 
    label: 'Environmental', 
    description: 'What environmental factors are relevant to your business?'
  },
  { 
    key: 'legal', 
    color: '#C0CA33', 
    lightColor: '#F0F4C3', 
    label: 'Legal', 
    description: 'What laws and regulations affect your operation?'
  }
];

export function PESTELCanvas() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthWithSubscription();
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

  const handleExportPDF = async () => {
    if (canvas) {
      try {
        await exportPESTELToPDF(canvas);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {sections.map((section) => (
          <div key={section.key} className="relative">
            <div 
              style={{ backgroundColor: section.lightColor }}
              className="rounded-lg pt-8 pb-4 px-4 h-full"
            >
              <div 
                style={{ backgroundColor: section.color }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
              >
                <span className="text-2xl font-bold text-white">
                  {section.key.charAt(0).toUpperCase()}
                </span>
              </div>
              <div 
                style={{ backgroundColor: section.color }}
                className="text-white text-center py-2 -mx-4 mb-4"
              >
                <h3 className="text-lg font-semibold">{section.label}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">{section.description}</p>
              <div className="min-h-[200px]">
                <CanvasSection
                  title=""
                  items={canvas.content[section.key as keyof PESTELCanvasData['content']] || []}
                  onUpdate={(items) => handleSectionUpdate(section.key as keyof PESTELCanvasData['content'], items)}
                  description=""
                  className="bg-transparent"
                  icon={icons[section.key as keyof typeof icons]}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </CanvasWrapper>
  );
}