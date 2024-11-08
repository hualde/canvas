import { useState, useEffect } from 'react';
import { Plus, X, AlertCircle } from 'lucide-react';
import { useAuthWithSubscription } from '../hooks/useAuthWithSubscription';
import { SUBSCRIPTION_TIERS, TIER_LIMITS } from '../constants/subscriptionTiers';

interface CanvasSectionProps {
  title: string;
  items: string[];
  onUpdate: (items: string[]) => void;
  description: string;
  className?: string;
  icon?: string;
}

export function CanvasSection({ title, items = [], onUpdate, description, className, icon }: CanvasSectionProps) {
  const [newItem, setNewItem] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { subscriptionTier } = useAuthWithSubscription();
  const [canAddMoreItems, setCanAddMoreItems] = useState(true);

  useEffect(() => {
    const itemLimit = TIER_LIMITS[subscriptionTier].maxItemsPerSection;
    setCanAddMoreItems(items.length < itemLimit);
  }, [items, subscriptionTier]);

  const handleAddItem = () => {
    if (newItem.trim() && canAddMoreItems) {
      const itemWithBullet = newItem.trim().startsWith('• ') ? newItem.trim() : `• ${newItem.trim()}`;
      onUpdate([...items, itemWithBullet]);
      setNewItem('');
      setIsAdding(false);
    }
  };

  const handleRemoveItem = (index: number) => {
    onUpdate(items.filter((_, i) => i !== index));
  };

  const renderItemWithBullet = (item: string) => {
    if (item.startsWith('• ')) {
      return item;
    }
    return `• ${item}`;
  };

  return (
    <div className={`bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-sm p-4 flex flex-col ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          {icon && <img src={icon} alt={title} className="w-6 h-6" />}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>
        {!isAdding && canAddMoreItems && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-2 py-1 text-sm font-medium rounded text-blue-700 bg-blue-50 hover:bg-blue-100"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </button>
        )}
      </div>

      <div className="flex-grow overflow-y-auto">
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between group bg-white bg-opacity-10 rounded-md p-2"
            >
              <span className="text-gray-700 whitespace-pre-wrap">
                {renderItemWithBullet(item)}
              </span>
              <button
                onClick={() => handleRemoveItem(index)}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity ml-2 flex-shrink-0"
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

      {!canAddMoreItems && subscriptionTier === SUBSCRIPTION_TIERS.FREE && (
        <div className="mt-4 p-2 bg-yellow-100 border border-yellow-400 rounded-md flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-700 mr-2" />
          <p className="text-sm text-yellow-700">
            You've reached the maximum number of items for this section. 
            <a href="/upgrade" className="font-medium underline ml-1">Upgrade to Premium</a> for unlimited items.
          </p>
        </div>
      )}

      {isAdding && (
        <div className="mt-4">
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
              disabled={!newItem.trim() || !canAddMoreItems}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}