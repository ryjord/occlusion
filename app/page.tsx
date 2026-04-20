"use client";

import { useEffect } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { AlertTriangle, Wrench, CheckCircle, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { stats, isLoading, fetchStats } = useDashboardStore();

  // Fetch data when the page loads
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (isLoading || !stats) {
    return <div className="p-10 text-center">Loading System Metrics...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">System Overview</h1>
        <p className="text-slate-500">Live TR3 AR Prototype Telemetry</p>
      </header>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Open Faults Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
          <div className="p-3 bg-red-100 text-red-600 rounded-lg mr-4">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Open Faults</p>
            <p className="text-2xl font-bold text-slate-900">{stats.openFaults}</p>
          </div>
        </div>

        {/* Resolved Faults Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg mr-4">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Resolved</p>
            <p className="text-2xl font-bold text-slate-900">{stats.resolvedFaults}</p>
          </div>
        </div>

        {/* Active Tools Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
            <Wrench size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Tracked Tools</p>
            <p className="text-2xl font-bold text-slate-900">{stats.activeTools}</p>
          </div>
        </div>

        {/* MTTR Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg mr-4">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">System MTTR</p>
            <p className="text-2xl font-bold text-slate-900">{stats.mttrHours} hrs</p>
          </div>
        </div>

      </div>

      {/* Future space for the Recharts graph and Map grid */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 h-96 flex items-center justify-center">
        <p className="text-slate-400">[ Spatial Map & MTTR Chart Component will go here ]</p>
      </div>
    </div>
  );
}
