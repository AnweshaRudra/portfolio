import { Map, ScrollText } from 'lucide-react'
import { useRealm } from '../context/realmContextCore'
import { DESTINATIONS } from '../data/destinations'
import { PROFILE_DATA } from '../data/profile'
import { AboutSection } from './AboutSection'
import { AchievementsSection } from './AchievementsSection'
import { ContactSection } from './ContactSection'
import { ExperienceSection } from './ExperienceSection'
import { ProjectsSection } from './ProjectsSection'
import { SkillsSection } from './SkillsSection'

export function ChronicleView() {
  const { scene, returnToMap } = useRealm()

  if (scene !== 'chronicle') return null

  return (
    <div className="relative z-10 min-h-screen bg-[#171411] px-4 pt-20 pb-20 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-10">
        {/* Top Chronicle Banner */}
        <header className="surface-leather rounded-lg p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 font-display text-xs tracking-[0.2em] uppercase text-[#B18A45]">
                <ScrollText className="h-4 w-4" />
                <span>Conventional Chronicle Reader</span>
              </p>
              <h1 className="mt-1 font-display text-2xl font-bold tracking-wider uppercase text-[#E5D5B9] sm:text-3xl">
                {PROFILE_DATA.ownerName}
              </h1>
              <p className="mt-1 font-editorial text-lg italic text-[#CFA861]">
                {PROFILE_DATA.tagline}
              </p>
            </div>

            <button
              type="button"
              onClick={returnToMap}
              className="inline-flex items-center gap-2 rounded border border-[#CFA861] bg-[#392C20] px-3.5 py-2 text-xs font-semibold tracking-wider uppercase text-[#E5D5B9] hover:bg-[#493828] cursor-pointer"
            >
              <Map className="h-4 w-4 text-[#CFA861]" />
              <span>View 3D Kingdom Map</span>
            </button>
          </div>

          <nav aria-label="Chronicle Sections" className="mt-5 flex flex-wrap gap-2">
            {DESTINATIONS.map((dest) => (
              <a
                key={dest.id}
                href={`#chronicle-${dest.id}`}
                className="rounded border border-[#B18A45]/35 bg-[#171411]/80 px-3 py-1.5 text-xs font-medium text-[#E5D5B9] hover:border-[#CFA861] hover:text-[#CFA861]"
              >
                {dest.portfolioTitle}
              </a>
            ))}
          </nav>
        </header>

        <section id="chronicle-winterfell" className="scroll-mt-20 space-y-4">
          <h2 className="font-display text-xl font-bold tracking-wide text-[#CFA861]">
            Winterfell — About &amp; Education
          </h2>
          <AboutSection />
        </section>

        <section id="chronicle-citadel" className="scroll-mt-20 space-y-4">
          <h2 className="font-display text-xl font-bold tracking-wide text-[#CFA861]">
            The Citadel — Skills &amp; Craft
          </h2>
          <SkillsSection />
        </section>

        <section id="chronicle-kings-landing" className="scroll-mt-20 space-y-4">
          <h2 className="font-display text-xl font-bold tracking-wide text-[#CFA861]">
            King&apos;s Landing — Projects &amp; Case Studies
          </h2>
          <ProjectsSection />
        </section>

        <section id="chronicle-dragonstone" className="scroll-mt-20 space-y-4">
          <h2 className="font-display text-xl font-bold tracking-wide text-[#CFA861]">
            Dragonstone — Achievements &amp; Certifications
          </h2>
          <AchievementsSection />
        </section>

        <section id="chronicle-the-wall" className="scroll-mt-20 space-y-4">
          <h2 className="font-display text-xl font-bold tracking-wide text-[#CFA861]">
            The Wall — Experience &amp; Watch
          </h2>
          <ExperienceSection />
        </section>

        <section id="chronicle-ravens-keep" className="scroll-mt-20 space-y-4">
          <h2 className="font-display text-xl font-bold tracking-wide text-[#CFA861]">
            Raven&apos;s Keep — Contact &amp; Dispatch
          </h2>
          <ContactSection />
        </section>
      </div>
    </div>
  )
}
