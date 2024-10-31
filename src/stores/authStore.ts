import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  lastLogin: Date;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthState: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      checkAuthState: () => {
        const persistedAuth = localStorage.getItem('auth-storage');
        if (persistedAuth) {
          const { state } = JSON.parse(persistedAuth);
          set({ 
            user: state.user, 
            isAuthenticated: Boolean(state.user) 
          });
        }
      },

      login: async (email: string, password: string) => {
        if (email && password.length >= 6) {
          const user = {
            email,
            lastLogin: new Date()
          };
          
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);