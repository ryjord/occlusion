"use client";

// Libs
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

// Services
import { useDashboardStore } from '@/store/useDashboardStore';

// Icons
import { ShieldAlert, Loader2 } from 'lucide-react';

// Main Logout Form
export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, loginError } = useDashboardStore();

  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const mockHardwareId = 'IPAD-PRO-998877';

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const isSuccess = await login(employeeId, password, mockHardwareId);

    if (!!isSuccess) {
      router.push('/');
    }
  };

  return (
    <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
      <CardHeader className="space-y-2 px-0 text-left pb-8">
        <CardTitle className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Terminal Access
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400 text-base">
          Authenticate with your Technician ID and Passkey.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="employeeId" className="text-slate-700 dark:text-slate-300 font-semibold">Employee ID</Label>
            <Input
              id="employeeId"
              placeholder="e.g. ADM-001"
              value={employeeId}
              onChange={(event) => setEmployeeId(event.target.value)}
              className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white focus-visible:ring-blue-600"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-semibold">Security Passkey</Label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white focus-visible:ring-blue-600"
              required
            />
          </div>
          {!!loginError &&
            <div className="flex items-center gap-2 p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900/50 rounded-lg">
              <ShieldAlert className="h-4 w-4" />
              <p>{loginError}</p>
            </div>
          }
          <Button
            type="submit"
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
            disabled={!!isLoading}
          >
            {!!isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying Uplink...
              </>
            ) : (
              'Initialize Session'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="px-0 pt-6">
        <p className="text-xs text-slate-500 dark:text-slate-500 text-center w-full px-4">
          Hardware ID binding enforced. Unregistered devices will be blocked by the Edge Network.
        </p>
      </CardFooter>
    </Card>
  );
}
