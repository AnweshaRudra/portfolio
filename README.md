# The Realm of Anwesha

A Chronicle of Code, Creativity & Conquest — an interactive, medieval-fantasy developer portfolio for **Anwesha Rudra**, built with React, Vite, TypeScript, Three.js, React Three Fiber, Drei, GSAP, Motion, and Tailwind CSS.

## Milestone Status

- **Milestone 0 — Repository reconnaissance & implementation plan**: Complete
- **Milestone 1 — Functional foundation & greybox prototype**: Complete
- **Milestone 2 — Cinematic throne-room experience**: Complete
- **Milestone 3 — Kingdom map and cinematic navigation**: Complete
- **Milestone 4 — Portfolio content and case studies**: Complete
- **Milestone 5 — Atmosphere, sound and Easter eggs**: Complete (with original D-Dorian Web Audio score)
- **Milestone 6 — Responsive design, accessibility and performance**: Complete
- **Milestone 7 — Quality assurance and deployment**: Complete (Vercel configured; ready to link & deploy)

## Setup & Scripts

```bash
npm install
npm run dev
```

Available npm scripts:

- `npm run dev` — Start local Vite development server
- `npm run build` — Run TypeScript type-check (`tsc -b`) and production Vite build
- `npm run lint` — Run `oxlint` across the codebase
- `npm run preview` — Preview the production build locally

Regenerate assets (if needed):

- `node scripts/generate-throne-glb.mjs` — Regenerates `public/models/sovereign-throne.glb`
- `node scripts/generate-resume-pdf.mjs` — Regenerates `public/Anwesha_Rudra_Resume.pdf`

## Architecture Overview

- `src/app/` — Application shell (`AppShell.tsx`) with skip links, `aria-live` announcements, lazy-loaded 3D world & reader mode.
- `src/context/` — Central `RealmContext` managing scene state (`intro` / `map` / `chronicle`), selected/hovered/focused destinations, panel/modal state, audio opt-in state (off by default), and reduced-motion state.
- `src/data/` — Structured personal & portfolio data modules (`profile.ts`, `destinations.ts`, `projects.ts`, `skills.ts`, `achievements.ts`, `experience.ts`).
- `src/scenes/` — Single persistent Three.js / R3F world (`RealmWorldCanvas.tsx`), custom GLB throne room (`ThroneIntroScene.tsx`), 2.5D textured kingdom map (`KingdomMapScene.tsx`, `MapLandmark.tsx`), `SceneErrorBoundary.tsx`, and 2D WebGL fallback (`RealmFallback2D.tsx`).
- `src/components/` — Reusable UI primitives (`ui/`), layout & navigation (`layout/`), and non-blocking Easter eggs (`easter-eggs/`).
- `src/sections/` — Accessible React content sections (`AboutSection`, `SkillsSection`, `ProjectsSection`, `AchievementsSection`, `ExperienceSection`, `ContactSection`, `ChronicleView`).
- `src/animations/` — GSAP camera transition orchestration (`cameraTransitions.ts`).
- `src/utils/` — Procedural map heightfield/texture (`kingdomGeography.ts`), procedural Web Audio score (`audioEngine.ts`), WebGL check (`webgl.ts`).
- `src/styles/` — Design tokens (`tokens.css`) and global/Tailwind rules (`global.css`).

## Deployment on Vercel

This project includes [vercel.json](vercel.json) with SPA rewrites and immutable caching headers for `/models/*`.

To deploy from Vercel:
1. Sign in at https://vercel.com and click **Add New → Project**.
2. Import **`AnweshaRudra/portfolio`** from GitHub.
3. Keep the detected **Vite** preset (`Build Command: npm run build`, `Output Directory: dist`).
4. Click **Deploy** (no environment variables required).

## Asset Attribution

See [public/asset-credits.md](public/asset-credits.md).
