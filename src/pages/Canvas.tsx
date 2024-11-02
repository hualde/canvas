import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { getCanvas, updateCanvas } from '../lib/db';
import { CanvasSection } from '../components/CanvasSection';
import { exportToPDF } from '../utils/pdfExport';

export function Canvas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [canvas, setCanvas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareMessage, setShowShareMessage] = useState(false);

  useEffect(() => {
    async function fetchCanvas() {
      if (id) {
        setIsLoading(true);
        try {
          const fetchedCanvas = await getCanvas(id);
          setCanvas(fetchedCanvas);
        } catch (error) {
          console.error('Error fetching canvas:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchCanvas();
  }, [id]);

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

  const handleUpdateTitle = async (title: string) => {
    if (!title.trim()) return;
    try {
      const updatedCanvas = await updateCanvas(canvas.id, title, canvas.content);
      setCanvas(updatedCanvas);
    } catch (error) {
      console.error('Error updating canvas title:', error);
    }
  };

  const handleSectionUpdate = async (section: string, items: string[]) => {
    const updatedContent = { ...canvas.content, [section]: items };
    try {
      const updatedCanvas = await updateCanvas(canvas.id, canvas.title, updatedContent);
      setCanvas(updatedCanvas);
    } catch (error) {
      console.error('Error updating canvas section:', error);
    }
  };

  const handleExportPDF = () => {
    exportToPDF(canvas);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/share/${canvas.id}`;
    navigator.clipboard.writeText(url);
    setShowShareMessage(true);
    setTimeout(() => setShowShareMessage(false), 3000);
  };

  return (
    <div className="max-w-[1600px] mx-auto p-6">
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
            onClick={handleShare}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
          
          <button
            onClick={handleExportPDF}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {showShareMessage && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Share link copied to clipboard!
        </div>
      )}

      <input
        type="text"
        value={canvas.title}
        onChange={(e) => handleUpdateTitle(e.target.value)}
        className="text-3xl font-bold text-gray-900 mb-8 px-2 py-1 border-2 border-transparent rounded focus:border-blue-500 focus:outline-none w-full"
        placeholder="Untitled Business Model Canvas"
      />

      <div className="grid grid-cols-5 gap-4">
        {/* Canvas sections */}
        <CanvasSection
          title="Key Partners"
          items={canvas.content.keyPartners || []}
          onUpdate={(items) => handleSectionUpdate('keyPartners', items)}
          description="Who are your key partners and suppliers?"
        />
        <div className="col-span-1 space-y-4">
          <CanvasSection
            title="Key Activities"
            items={canvas.content.keyActivities || []}
            onUpdate={(items) => handleSectionUpdate('keyActivities', items)}
            description="What key activities does your value proposition require?"
          />
          <CanvasSection
            title="Key Resources"
            items={canvas.content.keyResources || []}
            onUpdate={(items) => handleSectionUpdate('keyResources', items)}
            description="What key resources does your value proposition require?"
          />
        </div>
        <CanvasSection
          title="Value Propositions"
          items={canvas.content.valuePropositions || []}
          onUpdate={(items) => handleSectionUpdate('valuePropositions', items)}
          description="What value do you deliver to the customer?"
        />
        <div className="col-span-1 space-y-4">
          <CanvasSection
            title="Customer Relationships"
            items={canvas.content.customerRelationships || []}
            onUpdate={(items) => handleSectionUpdate('customerRelationships', items)}
            description="What relationship does each customer segment expect?"
          />
          <CanvasSection
            title="Channels"
            items={canvas.content.channels || []}
            onUpdate={(items) => handleSectionUpdate('channels', items)}
            description="Which channels do your customers prefer?"
          />
        </div>
        <CanvasSection
          title="Customer Segments"
          items={canvas.content.customerSegments || []}
          onUpdate={(items) => handleSectionUpdate('customerSegments', items)}
          description="For whom are you creating value?"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <CanvasSection
          title="Cost Structure"
          items={canvas.content.costStructure || []}
          onUpdate={(items) => handleSectionUpdate('costStructure', items)}
          description="What are the most important costs inherent in your business model?"
        />
        <CanvasSection
          title="Revenue Streams"
          items={canvas.content.revenueStreams || []}
          onUpdate={(items) => handleSectionUpdate('revenueStreams', items)}
          description="For what value are your customers really willing to pay?"
        />
      </div>
    </div>
  );
}