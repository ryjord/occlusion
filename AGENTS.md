# Agent Instructions for Occlusion Project

## Project Overview
Next.js web app for AR fault diagnostics dashboard with technician monitoring interface.

## Tech Stack
- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 + shadcn/ui + CVA for styling
- Zustand 5 for state management (with persist)
- Three.js ecosystem for 3D graphics
- next-themes for dark/light mode

## Build & Run Commands
- `npm run dev` → Start dev server (http://localhost:3000)
- `npm run build` → Production build
- `npm start` → Production server
- `npm run lint` → ESLint check

## Architecture Decisions
- **Component boundaries**: UI components in `src/components/ui/`, domain-specific in subfolders
- **State management**: Centralized in `src/store/useDashboardStore.ts` with `{success, data, error}` API pattern
- **Authentication**: Credentials mode with hardware ID binding (currently mocked)
- **Styling**: OKLch color space, status colors (emerald=success, amber=warning, red=critical, blue=info)

## Project Conventions
- Interface naming: Prefix with `I` (e.g., `IUser`, `IStats`)
- Client components: Always mark with `"use client"` directive
- Component variants: Use CVA for button/input variants
- Class merging: Use `cn()` utility from `src/lib/utils.ts`
- API responses: Standardized format with success flag

## Key Files & Patterns
- [src/store/useDashboardStore.ts](src/store/useDashboardStore.ts) - State management & API integration
- [src/components/ui/button.tsx](src/components/ui/button.tsx) - CVA variant system example
- [src/app/page.tsx](src/app/page.tsx) - Protected route with hydration safety
- [src/components/auth/LoginForm.tsx](src/components/auth/LoginForm.tsx) - Form handling pattern

## Potential Pitfalls
- **Hydration mismatch**: Use `isMounted` useState → useEffect pattern in dashboard
- **Backend dependency**: API must run on `localhost:3001` (dev) for login/stats functionality
- **Mock data**: AuditTrailTable uses hardcoded data (not API-connected)
- **Hardware ID**: Currently mocked as `IPAD-PRO-998877`
- **React 19**: Experimental version may have library compatibility issues

## Development Environment
- Backend API: `occlusion-backend.vercel.app` (prod) / `localhost:3001` (dev)
- Login credentials: employeeId format `ADM-001`, any password for testing

## Links
- [README.md](README.md) - Project setup (generic Next.js content)</content>
<parameter name="filePath">c:\Users\olive\OneDrive\Documents\GitHub\occlusion\AGENTS.md