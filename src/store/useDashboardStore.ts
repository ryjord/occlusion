// Libs
import { create } from 'zustand';

// Interfaces
interface User {
  id: string;
  fullName: string;
  role: string;
}

interface DashboardState {
  user: User | null;
  isLoading: boolean;
  loginError: string | null;
  login: (employeeId: string, passwordPlain: string, hardwareId: string) => Promise<boolean>;
  logout: () => void;

};

export const useDashboardStore = create<DashboardState>((set) => ({
  user: null,
  isLoading: false,
  loginError: null,

  login: async (employeeId, passwordPlain, hardwareId) => {
    set({ isLoading: true, loginError: null });
    try {
      // Pointing to your local backend API
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // CRITICAL: This allows the secure HttpOnly cookie to be saved by the browser
        credentials: 'include',
        body: JSON.stringify({
          employeeId,
          password: passwordPlain,
          hardwareId,
        }),
      });

      const json = await res.json();

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

  logout: () => {
    set({ user: null });
    // In a full build, we would also hit a POST /api/auth/logout endpoint to kill the cookie!
  }
}));
