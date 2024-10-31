import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CanvasItem {
  id: string;
  title: string;
  keyPartners: string[];
  keyActivities: string[];
  keyResources: string[];
  valuePropositions: string[];
  customerRelationships: string[];
  channels: string[];
  customerSegments: string[];
  costStructure: string[];
  revenueStreams: string[];
  shareId?: string;
}

interface CanvasStore {
  canvases: CanvasItem[];
  createCanvas: () => string;
  getCanvas: (id: string) => CanvasItem | undefined;
  getCanvasByShareId: (shareId: string) => CanvasItem | undefined;
  updateCanvas: (id: string, updates: Partial<CanvasItem>) => void;
  deleteCanvas: (id: string) => void;
  generateShareId: (id: string) => string;
}

export const useCanvasStore = create<CanvasStore>()(
  persist(
    (set, get) => ({
      canvases: [],

      createCanvas: () => {
        const id = Math.random().toString(36).substring(2, 9);
        const newCanvas: CanvasItem = {
          id,
          title: 'Untitled Business Model Canvas',
          keyPartners: [],
          keyActivities: [],
          keyResources: [],
          valuePropositions: [],
          customerRelationships: [],
          channels: [],
          customerSegments: [],
          costStructure: [],
          revenueStreams: []
        };

        set((state) => ({
          canvases: [...state.canvases, newCanvas]
        }));

        return id;
      },

      getCanvas: (id) => {
        return get().canvases.find(canvas => canvas.id === id);
      },

      getCanvasByShareId: (shareId) => {
        return get().canvases.find(canvas => canvas.shareId === shareId);
      },

      updateCanvas: (id, updates) => {
        set((state) => ({
          canvases: state.canvases.map((canvas) =>
            canvas.id === id ? { ...canvas, ...updates } : canvas
          )
        }));
      },

      deleteCanvas: (id) => {
        set((state) => ({
          canvases: state.canvases.filter((canvas) => canvas.id !== id)
        }));
      },

      generateShareId: (id) => {
        const canvas = get().canvases.find(c => c.id === id);
        if (!canvas) return '';

        const shareId = Math.random().toString(36).substring(2, 15) + 
                       Math.random().toString(36).substring(2, 15);

        set((state) => ({
          canvases: state.canvases.map((c) =>
            c.id === id ? { ...c, shareId } : c
          )
        }));

        return shareId;
      }
    }),
    {
      name: 'canvas-storage'
    }
  )
);