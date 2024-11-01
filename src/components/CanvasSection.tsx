import { useState } from 'react';
import { Plus, X, Handshake, Cog, Gem, Diamond, MessageCircle, Target, Users, DollarSign, TrendingUp } from 'lucide-react';

interface CanvasSectionProps {
  title: string;
  items: string[];
  onUpdate: (items: string[]) => void;
  description: string;
}

const sectionIcons = {
  'Key Partners': Handshake,
  'Key Activities': Cog,
  'Key Resources': Gem,
  'Value Propositions': Diamond,
  'Customer Relationships': MessageCircle,
  'Channels': Target,
  'Customer Segments': Users,
  'Cost Structure': DollarSign,
  'Revenue Streams': TrendingUp,
};

export function CanvasSection({ title, items = [], onUpdate, description }: CanvasSectionProps) {
  const [newItem, setNewItem] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const Icon = sectionIcons[title as keyof typeof sectionIcons];

  const handleAddItem = () => {
    if (newItem.trim()) {
      onUpdate([...items, newItem.trim()]);
      setNewItem('');
      setIsAdding(false);
    }
  };

  const handleRemoveItem = (index: number) => {
    onUpdate(items.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-blue-600" />}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-2 py-1 text-sm font-medium rounded text-blue-700 bg-blue-50 hover:bg-blue-100"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </button>
        )}
      </div>

      {isAdding && (
        <div className="mb-4">
          <textarea
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAddItem();
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter a new item..."
            rows={2}
            autoFocus
          />
          <div className="mt-2 flex justify-end space-x-2">
            <button
              onClick={() => {
                setIsAdding(false);
                setNewItem('');
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleAddItem}
              disabled={!newItem.trim()}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between group bg-gray-50 rounded-md p-2"
          >
            <span className="text-gray-700">{item}</span>
            <button
              onClick={() => handleRemoveItem(index)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      {items.length === 0 && !isAdding && (
        <p className="text-sm text-gray-500 text-center py-3">
          No items yet. Click "Add Item" to get started.
        </p>
      )}
    </div>
  );
}