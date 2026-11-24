# The Realm of Anwesha

**A Chronicle of Code, Creativity & Conquest** — an interactive, medieval-fantasy 3D developer portfolio for **Anwesha Rudra**, crafted with React, TypeScript, Vite, Three.js, React Three Fiber, Drei, GSAP, Motion, and Tailwind CSS.

> **Live Website (GitHub Pages):** https://anwesharudra.github.io/portfolio/  
> **GitHub Repository:** https://github.com/AnweshaRudra/portfolio

> *"Part problem-solver, part builder, full-time learner — always compiling something new."*

---

## Experience Highlights

- **Cinematic Throne-Room Intro (`Scene A`):** Custom procedural `.glb` Sovereign Throne ([`public/models/sovereign-throne.glb`](public/models/sovereign-throne.glb)), moonlit lancet shafts, flickering brazier lights, swaying banners, embers, and a GSAP title reveal — always skippable (`Skip Intro`) and never forced on repeat visits.
- **Interactive 2.5D Kingdom Map (`Scene B`):** Original procedurally sculpted terrain heightfield and cartographic texture ([`src/utils/kingdomGeography.ts`](src/utils/kingdomGeography.ts)) with six distinct 3D landmarks, hover/focus callouts, live azimuth-synced compass rose, `+`/`-` zoom, camera reset, and cartographer's legend.
- **Zero-3D Reader Mode & WebGL Fallback:** Dedicated **Reader View** (`ChronicleView`) and automatic 2D fallback (`RealmFallback2D`) so every project, skill, credential, and contact link is readable on any desktop or mobile device without requiring 3D interaction.
- **Original D-Dorian Web Audio Score:** Synthesized bowed-cello ostinato, warm string pads, subtle war-drum pulse, hall/coastal wind, and UI chimes ([`src/utils/audioEngine.ts`](src/utils/audioEngine.ts)). Strictly **opt-in** (`Sound Off` by default, zero autoplay) and automatically ducks when reading content.
- **Downloadable Resume & Verified Links:** Built-in Resume viewer modal with one-click PDF download ([`public/Anwesha_Rudra_Resume.pdf`](public/Anwesha_Rudra_Resume.pdf)), plus direct GitHub, LinkedIn, Email, and Phone links.
- **Accessibility & Performance:** Skip-to-content link, `aria-live` scene announcements, `Escape` dismissal, keyboard navigation across all destinations, `Low Motion` / `prefers-reduced-motion` support (`frameloop="demand"`), and lazy-loaded 3D code splitting.
- **Optional Non-Blocking Easter Eggs:** Three-Eyed Raven (`3` clicks on the feather in the map HUD), Dragon's Secret (`Dragonstone` forge note), Royal Command (`Ctrl+K` / `Cmd+K` or `Shift+?`), and Night's Watch whisper (`Raven's Keep`).

---

## The Six Realms

| Realm | Portfolio Section | Highlights |
| --- | --- | --- |
| **Winterfell** | About & Education | Biography, objective, and academic chronicle (ICFAI University Dehradun, WBBHSE, WBBSE) |
| **The Citadel** | Skills & Craft | Programming (`Python`, `Java`, `JavaScript`, `SQL`), Data & ML, Backend & Mobile, Tools |
| **King's Landing** | Projects & Case Studies | Domain filters & case studies for *AI Fake Stock Detector*, *Business Entity Resolution*, *SolarQuest*, and *SANGYAN Shield* |
| **Dragonstone** | Achievements & Certifications | Hackathon awards (*ByteVerse 1.0*, *GNA 4.0*, *IIT BHU SANGYAN Top 100*, *AWS ML*) & Udemy Java certification |
| **The Wall** | Experience & Watch | Collaborative hackathon engineering responsibilities, integration challenges, and internship readiness |
| **Raven's Keep** | Contact & Dispatch | Email, Phone, LinkedIn, GitHub, Resume PDF download, and `mailto:` dispatch composer |

---

## Tech Stack

- **Core:** React 19, TypeScript, Vite 8
- **3D & Motion:** Three.js, `@react-three/fiber`, `@react-three/drei`, GSAP (`@gsap/react`), Motion
- **Styling & Icons:** Tailwind CSS v4, custom CSS tokens (`Cinzel`, `Cormorant Garamond`, `Inter`), Lucide React
- **Audio & Assets:** Native Web Audio API (procedural score), Three.js `GLTFExporter` (custom `.glb`), pure-Node PDF generator

---

## Project Structure

```text
├── public/
│   ├── Anwesha_Rudra_Resume.pdf   # Downloadable ATS-clean resume PDF
│   ├── asset-credits.md           # Original & open-source asset attribution
│   ├── favicon.svg                # Original royal crest favicon
│   ├── og-preview.svg             # Social preview image
│   └── models/
│       └── sovereign-throne.glb   # Custom procedural throne model
├── scripts/
│   ├── generate-resume-pdf.mjs    # Regenerates public/Anwesha_Rudra_Resume.pdf
│   └── generate-throne-glb.mjs    # Regenerates public/models/sovereign-throne.glb
└── src/
    ├── animations/                # GSAP camera transitions
    ├── app/                       # Lazy-loaded shell, skip link & aria-live region
    ├── components/
    │   ├── easter-eggs/           # Optional non-blocking Easter eggs
    │   ├── layout/                # Header, Intro, Map HUD, Nav bar, Panels, Resume modal
    │   └── ui/                    # ManuscriptCard, WaxSealBadge, ProjectCaseStudy, toggles
    ├── context/                   # Central navigation, audio & motion state
    ├── data/                      # Structured portfolio data (isolated from 3D scenes)
    ├── hooks/                     # Audio sync, viewport tier & reduced-motion hooks
    ├── scenes/                    # R3F Canvas, Throne Room, 2.5D Map, Landmarks & 2D fallback
    ├── sections/                  # Six realm content sections + Zero-3D ChronicleView
    ├── styles/                    # Design tokens and global styles
    └── utils/                     # Procedural map heightfield/texture, audio engine & WebGL check
```

---

## Local Setup & Scripts

```bash
git clone https://github.com/AnweshaRudra/portfolio.git
cd portfolio
npm install
npm run dev
```

Open **http://localhost:5173/** in your browser.

### Available Commands

- `npm run dev` — Start the Vite development server
- `npm run build` — Run TypeScript type-checking (`tsc -b`) and build `dist/`
- `npm run lint` — Run `oxlint` static checks
- `npm run preview` — Preview the production build locally
- `node scripts/generate-throne-glb.mjs` — Regenerate `public/models/sovereign-throne.glb`
- `node scripts/generate-resume-pdf.mjs` — Regenerate `public/Anwesha_Rudra_Resume.pdf`

---

## Asset Attribution

All 3D geometry, procedural map textures, SVG crests, and synthesized audio are original to this project. Third-party fonts and icon libraries are documented in [public/asset-credits.md](public/asset-credits.md).

---

## Contact

- **Name:** Anwesha Rudra
- **Location:** Dehradun, Uttarakhand, India
- **Email:** [anwesharudra2005@gmail.com](mailto:anwesharudra2005@gmail.com)
- **LinkedIn:** [linkedin.com/in/anwesha-rudra-00720a321](https://www.linkedin.com/in/anwesha-rudra-00720a321/)
- **GitHub:** [github.com/AnweshaRudra](https://github.com/AnweshaRudra)
