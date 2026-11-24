# The Realm of Anwesha

A Chronicle of Code, Creativity & Conquest — an interactive, medieval-fantasy developer portfolio built with React, Vite, TypeScript, Three.js, React Three Fiber, Drei, GSAP, Motion, and Tailwind CSS.

## Current Milestone Status

- **Milestone 0 — Repository reconnaissance & implementation plan**: Complete
- **Milestone 1 — Functional foundation & greybox prototype**: Complete
- **Milestone 2 — Cinematic throne-room experience**: Complete
- **Milestone 3 — Kingdom map and cinematic navigation**: Pending review

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

## Architecture Overview

- `src/app/` — Application shell (`AppShell.tsx`) integrating the single persistent R3F `<Canvas>`, header, intro overlay, map navigation bar, and content panels.
- `src/context/` — Central `RealmContext` managing scene state (`intro` / `map`), selected/hovered/focused destinations, panel open/close, audio opt-in state (off by default), and reduced-motion state.
- `src/data/` — Structured personal & portfolio data modules (`profile.ts`, `destinations.ts`, `projects.ts`, `skills.ts`, `achievements.ts`, `experience.ts`). Personal facts are strictly isolated from 3D scene components.
- `src/scenes/` — Single persistent Three.js / R3F world (`RealmWorldCanvas.tsx`), greybox throne room (`ThroneIntroScene.tsx`), greybox kingdom map (`KingdomMapScene.tsx`, `MapLandmark.tsx`), `SceneErrorBoundary.tsx`, and 2D WebGL fallback (`RealmFallback2D.tsx`).
- `src/components/` — Reusable UI primitives (`ui/`) and layout controls (`layout/RealmHeader.tsx`, `DestinationNavBar.tsx`, `IntroOverlay.tsx`, `ContentPanelShell.tsx`).
- `src/sections/` — Accessible React content sections for all six destinations (`AboutSection`, `SkillsSection`, `ProjectsSection`, `AchievementsSection`, `ExperienceSection`, `ContactSection`).
- `src/animations/` — GSAP camera transition orchestration (`cameraTransitions.ts`).
- `src/styles/` — Design tokens (`tokens.css`) and global/Tailwind rules (`global.css`).

## Six Portfolio Destinations

1. **Winterfell** — About, Education & Developer Journey
2. **The Citadel** — Skills, Tools & Technologies
3. **King's Landing** — Projects & Case Studies
4. **Dragonstone** — Hackathons, Awards & Certifications
5. **The Wall** — Experience, Responsibilities & Challenges
6. **Raven's Keep** — Contact, Resume, GitHub & LinkedIn

## Asset Attribution

See [public/asset-credits.md](public/asset-credits.md).
