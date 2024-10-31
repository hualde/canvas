import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCanvasStore } from '../stores/canvasStore';

export function SharedCanvas() {
  const { shareId } = useParams();
  const getCanvasByShareId = useCanvasStore((state) => state.getCanvasByShareId);
  const [canvas, setCanvas] = useState(shareId ? getCanvasByShareId(shareId) : null);

  useEffect(() => {
    if (shareId) {
      const loadedCanvas = getCanvasByShareId(shareId);
      setCanvas(loadedCanvas);
    }
  }, [shareId, getCanvasByShareId]);

  if (!canvas) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-gray-600">Canvas not found or sharing link has expired</p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto p-6">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Go to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">{canvas.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Section
            title="Products & Services"
            items={canvas.products}
            description="What are you offering to your customers?"
          />
          <Section
            title="Pain Relievers"
            items={canvas.painRelievers}
            description="How do your products and services alleviate customer pains?"
          />
          <Section
            title="Gain Creators"
            items={canvas.gainCreators}
            description="How do your products and services create customer gains?"
          />
        </div>

        <div className="space-y-8">
          <Section
            title="Customer Jobs"
            items={canvas.customerJobs}
            description="What tasks are your customers trying to accomplish?"
          />
          <Section
            title="Pains"
            items={canvas.pains}
            description="What frustrates your customers? What risks do they fear?"
          />
          <Section
            title="Gains"
            items={canvas.gains}
            description="What benefits are your customers seeking?"
          />
        </div>
      </div>
    </div>
  );
}

function Section({ title, items, description }: { title: string; items: string[]; description: string }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="bg-gray-50 rounded-md p-3">
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">No items added</p>
      )}
    </div>
  );
}