import { lazy, Suspense } from 'react'
import { RoyalCommandModal } from '../components/easter-eggs/RoyalCommandModal'
import { ContentPanelShell } from '../components/layout/ContentPanelShell'
import { DestinationNavBar } from '../components/layout/DestinationNavBar'
import { IntroOverlay } from '../components/layout/IntroOverlay'
import { MapHudControls } from '../components/layout/MapHudControls'
import { RealmHeader } from '../components/layout/RealmHeader'
import { ResumeModal } from '../components/layout/ResumeModal'
import { useRealm } from '../context/realmContextCore'
import { DESTINATIONS } from '../data/destinations'
import { useRealmAudioSync } from '../hooks/useRealmAudio'
import { AboutSection } from '../sections/AboutSection'
import { AchievementsSection } from '../sections/AchievementsSection'
import { ContactSection } from '../sections/ContactSection'
import { ExperienceSection } from '../sections/ExperienceSection'
import { ProjectsSection } from '../sections/ProjectsSection'
import { SkillsSection } from '../sections/SkillsSection'

const LazyRealmWorldCanvas = lazy(() => import('../scenes/RealmWorldCanvas'))
const LazyChronicleView = lazy(() =>
  import('../sections/ChronicleView').then((mod) => ({ default: mod.ChronicleView })),
)

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
  const { scene, hoveredId, focusedId, selectedDestination, isPanelOpen, openChronicle } =
    useRealm()

  const previewId = hoveredId ?? focusedId
  const previewDestination = previewId
    ? DESTINATIONS.find((dest) => dest.id === previewId) ?? null
    : null

  const liveAnnouncement = selectedDestination
    ? `Opened ${selectedDestination.realmName}: ${selectedDestination.portfolioTitle}`
    : scene === 'chronicle'
      ? 'Switched to Conventional Reader View'
      : scene === 'map'
        ? 'Viewing Kingdom Map with six portfolio landmarks'
        : 'Viewing Throne Room introduction'

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#171411] text-[#E5D5B9]">
      {/* Keyboard skip link for screen readers and keyboard-only navigation */}
      <a
        href="#realm-main-content"
        onClick={(e) => {
          if (scene === 'intro') {
            e.preventDefault()
            openChronicle()
          }
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:border focus:border-[#CFA861] focus:bg-[#171411] focus:px-3 focus:py-2 focus:text-xs focus:font-medium focus:text-[#CFA861]"
      >
        Skip to portfolio content
      </a>

      {/* Live region announcing scene & landmark changes */}
      <div className="sr-only" aria-live="polite">
        {liveAnnouncement}
      </div>

      {scene !== 'chronicle' && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-0 flex items-center justify-center bg-[#171411] text-[#B18A45]">
              <p className="font-display text-xs tracking-[0.2em] uppercase">
                Summoning the Realm…
              </p>
            </div>
          }
        >
          <LazyRealmWorldCanvas />
        </Suspense>
      )}

      <RealmHeader />

      <main id="realm-main-content" tabIndex={-1}>
        <IntroOverlay />
        <MapHudControls />

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

        {scene === 'chronicle' && (
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center text-xs text-[#CFA861]">
                Loading Reader View…
              </div>
            }
          >
            <LazyChronicleView />
          </Suspense>
        )}
      </main>

      <DestinationNavBar />
      <ResumeModal />
      <RoyalCommandModal />
    </div>
  )
}
