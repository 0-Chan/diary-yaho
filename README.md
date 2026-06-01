# Diary Yaho

Next.js App Router 기반의 PWA 일기 앱입니다.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Biome
- pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
pnpm lint
pnpm format
pnpm build
```

## PWA

- Manifest: `src/app/manifest.ts`
- Service worker: `public/sw.js`
- Service worker registration: `src/components/service-worker-register.tsx`
- App icons: `public/icon.svg`, `public/icon-192.png`, `public/icon-512.png`, `public/apple-icon.png`
- Offline route: `src/app/offline/page.tsx`

Service worker registration is enabled only in production builds.
