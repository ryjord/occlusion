export const dynamic = 'force-dynamic';

// Libs
import React from 'react';

// Components
import { Sidebar } from '@/components/layout/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Interfaces
interface ITool {
  id: string;
  toolName: string;
  category: string;
  lastKnownX: number;
  lastKnownY: number;
  lastKnownZ: number;
  lastTrackedAt: string;
}

const API_URL = process.env.NODE_ENV === 'production' ? 'https://occlusion-backend.vercel.app' : 'http://localhost:3001';

async function fetchHardware(): Promise<ITool[]> {
  try {
    const res = await fetch(`${API_URL}/api/hardware`, { cache: 'no-store' });
    const contentType = res.headers.get('content-type');

    if (!!contentType && contentType.includes('application/json')) {
      const json = await res.json();
      if (!!json.success) {
        return json.data;
      }
    } else {
      console.error(`[Hardware API] Failed: Expected JSON but received HTML. Status: ${ res.status }`);
    }

    return [];
  } catch(error) {
    console.error('[Hardware API] Network Error: Could not reach backend.', error);
    return [];
  }
}

export default async function HardwareTrackingPage() {
  const tools = await fetchHardware();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Hardware Tracking</h1>
          <p className="text-slate-500 dark:text-slate-400">Live telemetry and accountability log for AR-assisted maintenance tools.</p>
        </header>

        <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
              <TableRow className="border-slate-200 dark:border-slate-800">
                <TableHead className="font-semibold">Tool Name</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Last Known Coordinates (X, Y, Z)</TableHead>
                <TableHead className="text-right font-semibold">Last Tracked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { !!tools.length ? (
                tools.map((tool: ITool) => (
                  <TableRow key={ tool.id } className="border-slate-200 dark:border-slate-800">
                    <TableCell className="font-medium text-slate-900 dark:text-white">
                      { tool.toolName }
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-0 bg-blue-500/10 text-blue-500">
                        { tool.category }
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500 font-mono text-xs">
                      { tool.lastKnownX.toFixed(2) }, { tool.lastKnownY.toFixed(2) }, { tool.lastKnownZ.toFixed(2) }
                    </TableCell>
                    <TableCell className="text-right text-slate-500 font-mono text-xs">
                      { new Date(tool.lastTrackedAt).toLocaleString() }
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={ 4 } className="text-center text-slate-500 py-8">
                    No hardware data detected. Connect AR terminal to synchronize tools.
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
