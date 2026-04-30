"use client";
// Components
import { LoginForm } from '@/components/auth/LoginForm';
import Antigravity from "@/components/Antigravity";
import Particles from "@/components/Particles";
// Icons
import { Activity } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white dark:bg-slate-950">
      <div className="hidden md:flex flex-col justify-between w-1/2 bg-slate-900 p-12 text-white relative overflow-visible">
      <div className="absolute inset-0"> 
        <Particles
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleColors={["#7C3AED","#6366F1"]}
          moveParticlesOnHover
          particleHoverFactor={1}
          alphaParticles={false}
          particleBaseSize={100}
          sizeRandomness={1}
          cameraDistance={20}
          disableRotation={false}
        />
      </div>
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-blue-900/20 to-slate-900 pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-wider">OCCLUSION AR</span>
        </div>
        <div className="relative z-10 space-y-6 max-w-lg">
          <h1 className="text-4xl font-bold leading-tight">
            Advanced spatial telemetry and fault diagnostics.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Securely access the TRL 3 Dashboard to monitor active technicians, track hardware telemetry, and review spatial repair logs in real-time.
          </p>
        </div>
        <div className="relative z-10 text-slate-500 text-sm font-medium">
          System Build v0.1.0 • Enterprise Edition
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 md:p-24 bg-slate-50 dark:bg-slate-950 relative">
        {/* BACKGROUND */}
        <div className="absolute inset-0 z-0">
          <Antigravity
            count={300}
            magnetRadius={18}
            ringRadius={2}
            waveSpeed={2}
            waveAmplitude={0.9}
            particleSize={0.5}
            lerpSpeed={0.27}
            color="#4c4978"
            autoAnimate={false}
            particleVariance={1}
            rotationSpeed={0}
            depthFactor={1}
            pulseSpeed={3}
            particleShape="capsule"
            fieldStrength={10}
          />
        </div>
        {/* CARD */}
        <div className="w-full max-w-md relative z-10">
          <div className="w-full rounded-xl bg-slate-900 border border-blue-500/30 shadow-[0_0_40px_20px_rgba(59,130,246,0.4)]">
            <div className="flex md:hidden items-center gap-2 mb-8 text-slate-900 dark:text-white">
              <div className="p-1.5 bg-blue-600 rounded-md">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">OCCLUSION</span>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
