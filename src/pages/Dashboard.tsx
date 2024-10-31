import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit3 } from 'lucide-react';
import { useCanvasStore } from '../stores/canvasStore';

export function Dashboard() {
  const navigate = useNavigate();
  const { canvases, createCanvas, deleteCanvas } = useCanvasStore();

  const handleCreateCanvas = () => {
    const newCanvasId = createCanvas();
    navigate(`/canvas/${newCanvasId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Value Proposition Canvases</h1>
        <button
          onClick={handleCreateCanvas}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Canvas
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {canvases.map((canvas) => (
          <div
            key={canvas.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {canvas.title}
            </h3>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => navigate(`/canvas/${canvas.id}`)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                <Edit3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => deleteCanvas(canvas.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {canvases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No canvases yet. Create your first one!
          </p>
        </div>
      )}
    </div>
  );
}