// Libs
import { create } from 'zustand';

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
  fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<IDashboardState>((set) => ({
  user: null,
  loginError: null,
  stats: null,
  isLoading: false,

  // Login
  login: async (employeeId, passwordPlain, hardwareId) => {
    set({ isLoading: true, loginError: null });
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
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
      await fetch('http://localhost:3000/api/auth/logout', {
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
      const res = await fetch('http://localhost:3000/api/dashboard/stats', {
        credentials: 'include'
      });
      const json = await res.json();
      if (!!json.success) {
        set({ stats: json.data, isLoading: false });
      }
    } catch(error) {
      console.error("Failed to fetch dashboard stats", error);
      set({ isLoading: false });
    }
  },
}));
