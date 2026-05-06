# BiteCast

A podcast/video clip streaming web app that replicates the BiteCast mobile UI — a TikTok-style short-clip feed for podcast content.

## Run & Operate

- `pnpm --filter @workspace/bitecast run dev` — run the frontend (port auto-assigned)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Wouter (routing), Lucide icons
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (not yet used)
- Build: esbuild (API), Vite (frontend)

## Where things live

- `artifacts/bitecast/src/pages/` — all page components
- `artifacts/bitecast/src/components/BottomNav.tsx` — bottom navigation bar
- `artifacts/bitecast/src/data/mockData.ts` — all mock clip/playlist/category data
- `artifacts/bitecast/src/App.tsx` — router setup
- `artifacts/bitecast/src/index.css` — dark theme CSS variables

## Architecture decisions

- Pure dark theme (black background, `hsl(0 0% 0%)`) to match original mobile app
- Mobile-first layout: max-width 430px centered, mimics a phone screen in the browser
- All data is mock/static (no backend wired up) — data lives in `mockData.ts`
- Wouter used for lightweight client-side routing
- Bottom nav hidden on Bites and Player screens (fullscreen experience)

## Product

- **Home**: Scrollable vertical feed of video clips with like/views/bookmark counts
- **Bites**: TikTok-style fullscreen vertical snap-scroll with right-side action buttons (like, save, dislike, volume, speed)
- **Explore**: Category grid + Podcast Playlists grid
- **Library**: Liked/Saved tabs with clip grid
- **Profile**: Stats + menu (Activity History, Account Settings, Admin Panel, Help & Support)
- **Admin Panel**: Upload Podcast, Manage Clips, Upload Clips (Demo), Analytics, Quick Stats
- **Upload Clip / Upload Clip Demo**: Forms for adding clips
- **Activity History**: Stats + recent watched clip list
- **Account Settings**: Profile info editing + delete account
- **Help & Support**: FAQ/Contact/Legal + "Coming Soon" modal

## User preferences

- Exact UI replication of the BiteCast mobile app from the provided video

## Gotchas

- The app is frontend-only with mock data — no backend routes wired up yet
- Scrollbar is hidden globally via CSS for a native-app feel

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See the `react-vite` skill for frontend conventions
