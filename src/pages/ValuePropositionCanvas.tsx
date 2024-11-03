import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Package, TrendingUp, Pill, List, SmilePlus, Frown } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { getCanvas, updateCanvas } from '../lib/db';
import { CanvasSection } from '../components/CanvasSection';
import { exportToPDF } from '../utils/pdfExport';

export function ValuePropositionCanvas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [canvas, setCanvas] = useState(null);
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
          setDate(fetchedCanvas?.date ? new Date(fetchedCanvas.date).toISOString().split('T')[0] : '');
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
    if (!title.trim()) return;
    try {
      const updatedCanvas = await updateCanvas(canvas.id, { ...canvas, title });
      setCanvas(updatedCanvas);
    } catch (error) {
      console.error('Error updating canvas title:', error);
    }
  };

  const handleSectionUpdate = async (section: string, items: string[]) => {
    const updatedContent = { ...canvas.content, [section]: items };
    try {
      const updatedCanvas = await updateCanvas(canvas.id, { ...canvas, content: updatedContent });
      setCanvas(updatedCanvas);
    } catch (error) {
      console.error('Error updating canvas section:', error);
    }
  };

  const handleExportPDF = () => {
    exportToPDF(canvas);
  };

  const handleUpdateCanvasInfo = async () => {
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
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
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

        <div className="flex items-center space-x-4">
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <input
          type="text"
          value={project_name}
          onChange={(e) => setProject_name(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Value Proposition"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          onBlur={handleUpdateCanvasInfo}
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Customer Segment"
        />
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left side - Square section */}
        <div className="relative border-2 border-gray-200 rounded-lg p-4 aspect-square">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="relative">
              <CanvasSection
                title="Products and Services"
                items={canvas.content.productsAndServices || []}
                onUpdate={(items) => handleSectionUpdate('productsAndServices', items)}
                description="What products and services do you offer?"
                icon={<Package className="w-5 h-5" />}
                className="h-full"
              />
            </div>
            <div className="relative">
              <CanvasSection
                title="Gain Creators"
                items={canvas.content.gainCreators || []}
                onUpdate={(items) => handleSectionUpdate('gainCreators', items)}
                description="How do you create customer gains?"
                icon={<TrendingUp className="w-5 h-5" />}
                className="h-full"
              />
            </div>
            <div className="relative col-span-2">
              <CanvasSection
                title="Pain Relievers"
                items={canvas.content.painRelievers || []}
                onUpdate={(items) => handleSectionUpdate('painRelievers', items)}
                description="How do you relieve customer pains?"
                icon={<Pill className="w-5 h-5" />}
                className="h-full"
              />
            </div>
          </div>
        </div>

        {/* Right side - Circle section */}
        <div className="relative border-2 border-gray-200 rounded-full p-4 aspect-square">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <List className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="relative">
              <CanvasSection
                title="Customer Jobs"
                items={canvas.content.customerJobs || []}
                onUpdate={(items) => handleSectionUpdate('customerJobs', items)}
                description="What jobs do your customers need to get done?"
                icon={<List className="w-5 h-5" />}
                className="h-full"
              />
            </div>
            <div className="relative">
              <CanvasSection
                title="Gains"
                items={canvas.content.gains || []}
                onUpdate={(items) => handleSectionUpdate('gains', items)}
                description="What gains do your customers desire?"
                icon={<SmilePlus className="w-5 h-5" />}
                className="h-full"
              />
            </div>
            <div className="relative col-span-2">
              <CanvasSection
                title="Pains"
                items={canvas.content.pains || []}
                onUpdate={(items) => handleSectionUpdate('pains', items)}
                description="What pains do your customers experience?"
                icon={<Frown className="w-5 h-5" />}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}