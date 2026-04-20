"use client";

// Libs
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// Components
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Services
import { useDashboardStore } from '@/store/useDashboardStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, loginError } = useDashboardStore();

  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  // Simulating the hardware ID reading for the TRL 3 Prototype
  const mockHardwareId = 'IPAD-PRO-998877';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isSuccess = await login(employeeId, password, mockHardwareId);

    if (!!isSuccess) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="space-y-1 text-center bg-slate-900 text-slate-50 rounded-t-xl pb-8 pt-8">
          <CardTitle className="text-2xl font-bold tracking-tight">TRL 3 AR System</CardTitle>
          <CardDescription className="text-slate-400">Secure Depot Authentication</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                placeholder="e.g. ADM-001"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Security Passkey</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!!loginError && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {loginError}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!!isLoading}
            >
              {!!isLoading ? 'Authenticating...' : 'Access Terminal'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-xs text-slate-500 justify-center pb-6">
          <p>Hardware ID binding enforced. Unregistered devices will be blocked.</p>
        </CardFooter>
      </Card>
    </div>
  );
}