"use client";

// Libs
import React from 'react';
import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './themetoggle';

// Services
import { useDashboardStore } from '@/store/useDashboardStore';

// Icons
import { Activity, LayoutDashboard, Wrench, ShieldAlert, LogOut } from 'lucide-react';

export function Sidebar() {
  const router = useRouter();
  const { user, logout } = useDashboardStore();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col min-h-screen border-r border-slate-800">
      <div className="p-6 flex items-center gap-3 text-white">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Activity className="h-5 w-5" />
        </div>
        <span className="font-bold tracking-wider text-lg">OCCLUSION</span>
      </div>
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <Button variant="ghost" className="w-full justify-start text-white bg-slate-800 hover:bg-slate-700 hover:text-white">
          <LayoutDashboard className="mr-3 h-5 w-5" />
          System Overview
        </Button>
        <Button variant="ghost" className="w-full justify-start hover:bg-slate-800 hover:text-white">
          <ShieldAlert className="mr-3 h-5 w-5" />
          Fault Logs
        </Button>
        <Button variant="ghost" className="w-full justify-start hover:bg-slate-800 hover:text-white">
          <Wrench className="mr-3 h-5 w-5" />
          Hardware Tracking
        </Button>
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="mb-4 px-2 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">{user?.fullName || 'Operator'}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">{user?.role || 'Guest'}</p>
          </div>
          <ThemeToggle />
        </div>
        <Button
          variant="destructive"
          className="w-full justify-start bg-red-950/30 text-red-400 hover:bg-red-900 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Terminate Session
        </Button>
      </div>
    </aside>
  );
}
