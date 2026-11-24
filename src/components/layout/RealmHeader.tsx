import { Code2, Compass, FileText, Map, Menu, RotateCcw, ScrollText, X } from 'lucide-react'
import { useRealm } from '../../context/realmContextCore'
import { PROFILE_DATA } from '../../data/profile'
import { AudioToggle } from '../ui/AudioToggle'
import { MotionToggle } from '../ui/MotionToggle'

export function RealmHeader() {
  const {
    scene,
    isPanelOpen,
    isNavDrawerOpen,
    returnToMap,
    replayIntro,
    openChronicle,
    setNavDrawerOpen,
    setResumeOpen,
  } = useRealm()

  const handleResumeClick = () => {
    if (PROFILE_DATA.resumeUrl) {
      window.open(PROFILE_DATA.resumeUrl, '_blank', 'noopener,noreferrer')
      return
    }
    setResumeOpen(true)
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between gap-2 px-3 py-3 sm:px-6 sm:py-4">
      <div className="pointer-events-auto flex items-center gap-2">
        {scene !== 'intro' ? (
          <button
            type="button"
            onClick={returnToMap}
            className="flex items-center gap-2 rounded border border-[#B18A45]/50 bg-[#171411]/90 px-3 py-1.5 text-left transition-colors hover:border-[#CFA861] cursor-pointer"
          >
            <Compass className="h-4 w-4 text-[#B18A45]" />
            <span className="font-display text-xs font-semibold tracking-[0.14em] uppercase text-[#E5D5B9] sm:text-sm">
              Realm of Anwesha
            </span>
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded border border-[#B18A45]/35 bg-[#171411]/80 px-3 py-1.5">
            <Compass className="h-4 w-4 text-[#B18A45]" />
            <span className="font-display text-xs tracking-[0.14em] uppercase text-[#E5D5B9]">
              Anwesha Rudra
            </span>
          </div>
        )}

        {((scene === 'map' && isPanelOpen) || scene === 'chronicle') && (
          <button
            type="button"
            onClick={returnToMap}
            className="inline-flex items-center gap-1.5 rounded border border-[#CFA861] bg-[#392C20]/95 px-3 py-1.5 text-xs font-medium text-[#E5D5B9] hover:bg-[#4b3a2b] cursor-pointer"
          >
            <Map className="h-3.5 w-3.5 text-[#CFA861]" />
            <span>Return to Map</span>
          </button>
        )}
      </div>

      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
        {PROFILE_DATA.githubUrl && (
          <a
            href={PROFILE_DATA.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Anwesha Rudra on GitHub"
            title="GitHub Profile"
            className="inline-flex items-center gap-1.5 rounded border border-[#B18A45]/45 bg-[#171411]/85 px-2.5 py-1.5 text-xs font-medium text-[#E5D5B9] transition-colors hover:border-[#CFA861] hover:text-[#CFA861]"
          >
            <Code2 className="h-3.5 w-3.5 text-[#B18A45]" />
            <span className="hidden lg:inline">GitHub</span>
          </a>
        )}

        <button
          type="button"
          onClick={handleResumeClick}
          title={PROFILE_DATA.resumeUrl ? 'Open Resume PDF' : 'View Resume Summary'}
          className="inline-flex items-center gap-1.5 rounded border border-[#B18A45]/60 bg-[#392C20]/90 px-2.5 py-1.5 text-xs font-medium text-[#E5D5B9] transition-colors hover:border-[#CFA861] hover:bg-[#493828] cursor-pointer"
        >
          <FileText className="h-3.5 w-3.5 text-[#CFA861]" />
          <span>Resume</span>
        </button>

        {scene !== 'chronicle' && (
          <button
            type="button"
            onClick={openChronicle}
            title="Read all portfolio sections without 3D interaction"
            className="inline-flex items-center gap-1.5 rounded border border-[#B18A45]/40 bg-[#171411]/85 px-2.5 py-1.5 text-xs text-[#E5D5B9] hover:border-[#CFA861] cursor-pointer"
          >
            <ScrollText className="h-3.5 w-3.5 text-[#B18A45]" />
            <span className="hidden md:inline">Reader View</span>
          </button>
        )}

        {scene === 'map' && (
          <button
            type="button"
            onClick={replayIntro}
            title="Replay Throne Room Intro"
            className="hidden lg:inline-flex items-center gap-1.5 rounded border border-[#B18A45]/40 bg-[#171411]/85 px-2.5 py-1.5 text-xs text-[#8C8274] hover:border-[#B18A45] hover:text-[#E5D5B9] cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Intro</span>
          </button>
        )}

        <MotionToggle />
        <AudioToggle />

        {scene === 'map' && (
          <button
            type="button"
            onClick={() => setNavDrawerOpen(!isNavDrawerOpen)}
            aria-expanded={isNavDrawerOpen}
            aria-controls="realm-destinations-drawer"
            aria-label="Toggle conventional destinations menu"
            className="inline-flex items-center gap-1.5 rounded border border-[#B18A45]/55 bg-[#171411]/90 px-2.5 py-1.5 text-xs font-medium text-[#E5D5B9] hover:border-[#CFA861] cursor-pointer"
          >
            {isNavDrawerOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">Realms</span>
          </button>
        )}
      </div>
    </header>
  )
}
