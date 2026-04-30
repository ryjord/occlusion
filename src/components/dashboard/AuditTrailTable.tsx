"use client";

// Libs
import React, { useEffect } from 'react';

// Components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Services
import { useDashboardStore } from '@/store/useDashboardStore';

export function AuditTrailTable() {
  // Use atomic selectors to prevent the endless re-render loop
  const recentActivity = useDashboardStore((state) => state.recentActivity);
  const fetchStats = useDashboardStore((state) => state.fetchStats);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchStats();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' | ' + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getBadgeColor = (status: string) => {
    const lowerStatus = status?.toLowerCase() || '';
    if (lowerStatus === 'resolved' || lowerStatus === 'success') {
      return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    }
    if (lowerStatus === 'warning') {
      return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    }
    if (lowerStatus === 'critical') {
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    }
    return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
  };

  return (
    <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-visible">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
          <TableRow className="border-slate-200 dark:border-slate-800">
            <TableHead className="font-semibold">Technician</TableHead>
            <TableHead className="font-semibold">Action</TableHead>
            <TableHead className="font-semibold">Target Node</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="text-right font-semibold">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { !!recentActivity?.length ? (
            recentActivity.map((log) => (
              <TableRow key={ log.id } className="border-slate-200 dark:border-slate-800">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900 dark:text-white">{ log.changedBy?.fullName || 'Unknown Device' }</span>
                    <span className="text-xs text-slate-500">{ log.changedBy?.role || 'Field Tech' }</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-0 bg-blue-500/10 text-blue-500">{ log.actionType }</Badge>
                </TableCell>
                <TableCell className="text-slate-700 dark:text-slate-300">{ log.newState?.markerId || 'Unknown Node' }</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`border-0 ${getBadgeColor(log.newState?.status || 'Resolved')}`}>{ (log.newState?.status || 'Resolved').toUpperCase() }</Badge>
                </TableCell>
                <TableCell className="text-right text-slate-500 font-mono text-xs">{ formatTime(log.timestamp) }</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={ 5 } className="text-center text-slate-500 py-8">Awaiting spatial diagnostic data...</TableCell>
            </TableRow>
          ) }
        </TableBody>
      </Table>
    </div>
  );
}
