"use client";

// Libs
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// Components
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// Services
import { useDashboardStore } from '@/store/useDashboardStore';

export default function DashboardPage() {
  const router = useRouter();
  const { user, stats, isLoading, fetchStats } = useDashboardStore();

  useEffect(() => {
    // If there is no user logged in, kick them back to the login page
    if (!user) {
      router.push('/login');
      return;
    }

    fetchStats();
  }, [user, router, fetchStats]);

  if (!!isLoading || !stats) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 font-medium">Loading System Metrics...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">System Overview</h1>
        <p className="text-slate-500">Welcome back, {user?.fullName || 'Operator'}</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-sm border-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Open Faults</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{stats.openFaults}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{stats.resolvedFaults}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Tracked Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{stats.activeTools}</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">System MTTR</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{stats.mttrHours} hrs</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
