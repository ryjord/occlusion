"use client";

// Components
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// TEMPORARY DATA FOR VIEW
const auditLogs = [
  { id: 'LOG-001', technician: 'TECH-001', action: 'Resolved Fault', component: 'Track Switch A4', status: 'success', timestamp: '2026-04-21 08:30:00' },
  { id: 'LOG-002', technician: 'ADM-001', action: 'Hardware Diagnostic', component: 'AR Headset 2', status: 'info', timestamp: '2026-04-21 09:15:22' },
  { id: 'LOG-003', technician: 'TECH-001', action: 'Reported Anomaly', component: 'Signal Relay B', status: 'warning', timestamp: '2026-04-21 11:05:10' },
  { id: 'LOG-004', technician: 'DEV-001', action: 'System Override', component: 'Main Control Node', status: 'critical', timestamp: '2026-04-21 13:42:05' }
];

// Badges
export function AuditTrailTable() {
  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20';
      case 'warning':
        return 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20';
      case 'critical':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
      case 'info':
      default:
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
    }
  };

  return (
    <div className="rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
          <TableRow className="border-slate-200 dark:border-slate-800">
            <TableHead className="font-semibold">Log ID</TableHead>
            <TableHead className="font-semibold">Technician</TableHead>
            <TableHead className="font-semibold">Action</TableHead>
            <TableHead className="font-semibold">Component</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="text-right font-semibold">Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          { auditLogs.map((log) => (
            <TableRow key={ log.id } className="border-slate-200 dark:border-slate-800">
              <TableCell className="font-medium">{ log.id }</TableCell>
              <TableCell>{ log.technician }</TableCell>
              <TableCell>{ log.action }</TableCell>
              <TableCell>{ log.component }</TableCell>
              <TableCell>
                <Badge variant="outline" className={`border-0 ${getBadgeColor(log.status)}`}>
                  { log.status.toUpperCase() }
                </Badge>
              </TableCell>
              <TableCell className="text-right text-slate-500">{ log.timestamp }</TableCell>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    </div>
  );
}