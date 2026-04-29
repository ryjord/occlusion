// Libs
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// User Interface
interface IUser {
  id: string;
  fullName: string;
  role: string;
}

// Stats Interface
interface IStats {
  totalFaults: number;
  openFaults: number;
  resolvedFaults: number;
  activeTools: number;
  mttrHours: number;
}

const API_URL = process.env.NODE_ENV === 'production' ? 'https://occlusion-backend.vercel.app' : 'http://localhost:3001';

// Dashboard State Interface
interface IDashboardState {
  // Auth State
  user: IUser | null;
  loginError: string | null;
  login: (employeeId: string, passwordPlain: string, hardwareId: string) => Promise<boolean>;
  logout: () => void;

  // Stats State
  stats: IStats | null;
  isLoading: boolean;
  recentActivity: any[];
  fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<IDashboardState>()(
  persist(
    (set) => ({
      user: null,
      loginError: null,
      stats: null,
      isLoading: false,

    // Login
      recentActivity: [],
      login: async (employeeId, passwordPlain, hardwareId) => {
        set({ isLoading: true, loginError: null });
        try {
          const res = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ employeeId, password: passwordPlain, hardwareId }),
          });

          const json = await res.json();

        // Check if successful
          if (!!json.success) {
            set({ user: json.data, isLoading: false });
            return true;
          } else {
            set({ loginError: json.error || 'Login failed', isLoading: false });
            return false;
          }
        } catch(error) {
          console.error('Login error:', error);
          set({ loginError: 'Network error connecting to backend', isLoading: false });
          return false;
        }
      },

    // Logout
      logout: async () => {
        try {
          await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
          });
        } catch(error) {
          console.error('Failed to communicate logout to server:', error);
        } finally {
          set({ user: null, stats: null });
        }
      },

    // Fetch Users Stats
      fetchStats: async () => {
        set({ isLoading: true });
        try {
          const res = await fetch(`${API_URL}/api/dashboard/stats`, {
            credentials: 'include'
          });
          const json = await res.json();
          if (!!json.success) {
            set({ stats: json.data, recentActivity: json.data.recentActivity || [], isLoading: false });
          } else {
            set({ user: null, stats: null, recentActivity: [], isLoading: false });
          }
        } catch(error) {
          console.error('Failed to fetch dashboard stats', error);
          set({ user: null, stats: null, recentActivity: [], isLoading: false });
        }
      },
    }),
    {
      name: 'occlusion-auth-storage',
      // ONLY save the user object to localStorage
      partialize: (state) => ({ user: state.user }),
    }
  )
);
