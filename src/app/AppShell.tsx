import { ContentPanelShell } from '../components/layout/ContentPanelShell'
import { DestinationNavBar } from '../components/layout/DestinationNavBar'
import { IntroOverlay } from '../components/layout/IntroOverlay'
import { RealmHeader } from '../components/layout/RealmHeader'
import { useRealm } from '../context/realmContextCore'
import { DESTINATIONS } from '../data/destinations'
import { useRealmAudioSync } from '../hooks/useRealmAudio'
import { RealmWorldCanvas } from '../scenes/RealmWorldCanvas'
import { AboutSection } from '../sections/AboutSection'
import { AchievementsSection } from '../sections/AchievementsSection'
import { ContactSection } from '../sections/ContactSection'
import { ExperienceSection } from '../sections/ExperienceSection'
import { ProjectsSection } from '../sections/ProjectsSection'
import { SkillsSection } from '../sections/SkillsSection'

function ActiveSectionContent() {
  const { selectedId } = useRealm()

  switch (selectedId) {
    case 'winterfell':
      return <AboutSection />
    case 'citadel':
      return <SkillsSection />
    case 'kings-landing':
      return <ProjectsSection />
    case 'dragonstone':
      return <AchievementsSection />
    case 'the-wall':
      return <ExperienceSection />
    case 'ravens-keep':
      return <ContactSection />
    default:
      return null
  }
}

export function AppShell() {
  useRealmAudioSync()
  const { scene, hoveredId, focusedId, isPanelOpen } = useRealm()
  const previewId = hoveredId ?? focusedId
  const previewDestination = previewId
    ? DESTINATIONS.find((dest) => dest.id === previewId) ?? null
    : null

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#171411] text-[#E5D5B9]">
      <RealmWorldCanvas />
      <RealmHeader />

      <main>
        <IntroOverlay />

        {/* Subtle hovered/focused destination preview banner on map */}
        {scene === 'map' && !isPanelOpen && previewDestination && (
          <div className="pointer-events-none fixed top-16 left-1/2 z-20 hidden -translate-x-1/2 md:block">
            <div className="rounded border border-[#B18A45]/55 bg-[#171411]/90 px-4 py-2 text-center shadow-xl backdrop-blur-xs">
              <p className="font-display text-xs font-semibold tracking-[0.16em] uppercase text-[#CFA861]">
                {previewDestination.realmName} — {previewDestination.portfolioTitle}
              </p>
              <p className="mt-0.5 text-[11px] text-[#E5D5B9]/85">
                {previewDestination.shortDescription}
              </p>
            </div>
          </div>
        )}

        <ContentPanelShell>
          <ActiveSectionContent />
        </ContentPanelShell>
      </main>

      <DestinationNavBar />
    </div>
  )
}
