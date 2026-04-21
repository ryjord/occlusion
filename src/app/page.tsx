"use client";

// Libs
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Components
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sidebar } from '@/components/layout/sidebar';
import { AuditTrailTable } from '@/components/dashboard/AuditTrailTable';

// Services
import { useDashboardStore } from '@/store/useDashboardStore';

export default function DashboardPage() {
  const router = useRouter();
  const { user, stats, isLoading, fetchStats } = useDashboardStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!isMounted) {
      return;
    }

    if (!user) {
      router.push('/login');
      return;
    }
    fetchStats();
  }, [user, router, fetchStats]);

  if (!isMounted || !!isLoading || !stats) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-slate-500 font-medium animate-pulse">Establishing Secure Connection...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">System Overview</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome back, {user?.fullName}. Terminal connection secure.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-sm border-slate-200 dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Open Faults</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600 dark:text-red-500">{stats.openFaults}</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200 dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-500">{stats.resolvedFaults}</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200 dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Active AR Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-500">{stats.activeTools}</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200 dark:border-slate-800 dark:bg-slate-900">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">System MTTR</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-500">{stats.mttrHours} hrs</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Audit Activity</h2>
          <AuditTrailTable />
        </div>
      </main>
    </div>
  );
}
