// Libs
import React from 'react';

// Components
import { Sidebar } from '@/components/layout/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Interfaces
interface IFault {
  id: string;
  markerId: string;
  status: string;
  severity: string;
  annotationNotes: string | null;
  createdAt: string;
}

const API_URL = process.env.NODE_ENV === 'production' ? 'https://occlusion-backend.vercel.app' : 'http://localhost:3001';

async function fetchFaults(): Promise<IFault[]> {
  try {
    const res = await fetch(`${API_URL}/api/faults`, { cache: 'no-store' });

    const contentType = res.headers.get('content-type');
    if (!!contentType && contentType.includes('application/json')) {
      const json = await res.json();
      if (!!json.success) {
        return json.data;
      }
    } else {
      console.warn(`[Faults API] Expected JSON but received HTML (Status: ${res.status}). The endpoint might be 404.`);
    }
    return [];
  } catch(error) {
    console.error('[Faults API] Network Error.', error);
    return [];
  }
}

export default async function FaultDirectoryPage() {
  const faults = await fetchFaults();

  const getBadgeColor = (status: string) => {
    if (status === 'Resolved') return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (status === 'In Progress') return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Fault Directory</h1>
          <p className="text-slate-500 dark:text-slate-400">Complete historical log of all system anomalies and resolutions.</p>
        </header>

        <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
              <TableRow className="border-slate-200 dark:border-slate-800">
                <TableHead className="font-semibold">Marker ID</TableHead>
                <TableHead className="font-semibold">Severity</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Technician Notes</TableHead>
                <TableHead className="text-right font-semibold">Date Logged</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { !!faults.length ? (
                faults.map((fault: IFault) => (
                  <TableRow key={ fault.id } className="border-slate-200 dark:border-slate-800">
                    <TableCell className="font-medium text-slate-900 dark:text-white">
                      { fault.markerId }
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`border-0 ${fault.severity === 'Critical' ? 'bg-red-500/10 text-red-500' : 'bg-slate-500/10 text-slate-400'}`}>
                        { fault.severity }
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`border-0 ${getBadgeColor(fault.status)}`}>
                        { fault.status }
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm max-w-xs truncate">
                      { fault.annotationNotes || 'No notes provided.' }
                    </TableCell>
                    <TableCell className="text-right text-slate-500 font-mono text-xs">
                      { new Date(fault.createdAt).toLocaleDateString() }
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={ 5 } className="text-center text-slate-500 py-8">
                    No diagnostic records found.
                  </TableCell>
                </TableRow>
              ) }
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
