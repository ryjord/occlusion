import { create } from 'zustand';

interface DashboardState {
  stats: {
    totalFaults: number;
    openFaults: number;
    resolvedFaults: number;
    activeTools: number;
    mttrHours: number;
  } | null;
  isLoading: boolean;
  fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  isLoading: false,
  fetchStats: async () => {
    set({ isLoading: true });
    try {
      // In production, this URL will come from your .env file
      const res = await fetch('http://localhost:3000/api/dashboard/stats');
      const json = await res.json();
      if (json.success) {
        set({ stats: json.data, isLoading: false });
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
      set({ isLoading: false });
    }
  },
}));