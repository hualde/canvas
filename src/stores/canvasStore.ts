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
}

interface CanvasStore {
  canvases: CanvasItem[];
  createCanvas: () => string;
  getCanvas: (id: string) => CanvasItem | undefined;
  updateCanvas: (id: string, updates: Partial<CanvasItem>) => void;
  deleteCanvas: (id: string) => void;
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
      }
    }),
    {
      name: 'canvas-storage'
    }
  )
);