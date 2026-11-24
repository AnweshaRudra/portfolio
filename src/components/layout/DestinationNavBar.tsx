import { Compass, ExternalLink, MapPin, ScrollText } from 'lucide-react'
import { useRealm } from '../../context/realmContextCore'
import { DESTINATIONS } from '../../data/destinations'
import { PROFILE_DATA } from '../../data/profile'

export function DestinationNavBar() {
  const {
    scene,
    selectedId,
    isNavDrawerOpen,
    selectDestination,
    setHoveredId,
    setFocusedId,
    setNavDrawerOpen,
    replayIntro,
    openChronicle,
  } = useRealm()

  if (scene !== 'map') return null

  return (
    <>
      {/* Persistent bottom quick-navigation bar & compass legend for desktop/tablet */}
      <nav
        aria-label="Kingdom Destinations"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-20 hidden px-4 pb-4 md:block"
      >
        <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-md border border-[#B18A45]/45 bg-[#171411]/90 px-3 py-2 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-2 border-r border-[#B18A45]/25 pr-3">
            <Compass className="h-4 w-4 text-[#B18A45]" />
            <div className="leading-tight">
              <p className="font-display text-[10px] tracking-widest uppercase text-[#B18A45]">
                Kingdom Map
              </p>
              <p className="text-[11px] text-[#8C8274]">Select a stronghold</p>
            </div>
          </div>

          <ul className="flex flex-1 flex-wrap items-center justify-center gap-1.5">
            {DESTINATIONS.map((dest) => {
              const isSelected = selectedId === dest.id
              return (
                <li key={dest.id}>
                  <button
                    type="button"
                    onClick={() => selectDestination(dest.id)}
                    onMouseEnter={() => setHoveredId(dest.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setFocusedId(dest.id)}
                    onBlur={() => setFocusedId(null)}
                    aria-current={isSelected ? 'location' : undefined}
                    className={`rounded border px-2.5 py-1.5 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#CFA861] bg-[#392C20] text-[#CFA861]'
                        : 'border-[#B18A45]/25 bg-[#211C17]/80 text-[#E5D5B9] hover:border-[#B18A45] hover:bg-[#392C20]/60'
                    }`}
                  >
                    <span className="block font-display text-[11px] font-semibold tracking-wider uppercase">
                      {dest.realmName}
                    </span>
                    <span className="block text-[10px] text-[#8C8274]">{dest.portfolioTitle}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile bottom bar + Conventional Drawer for keyboard/mobile accessibility */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 p-3 md:hidden">
        <div className="pointer-events-auto flex items-center justify-between gap-2 rounded-md border border-[#B18A45]/50 bg-[#171411]/95 px-3 py-2 shadow-xl">
          <button
            type="button"
            onClick={() => setNavDrawerOpen(true)}
            className="flex flex-1 items-center justify-center gap-2 rounded border border-[#B18A45]/50 bg-[#392C20] px-3 py-2 text-xs font-medium text-[#E5D5B9] cursor-pointer"
          >
            <MapPin className="h-3.5 w-3.5 text-[#CFA861]" />
            <span className="font-display tracking-wider uppercase">Explore 6 Realms</span>
          </button>
          <button
            type="button"
            onClick={openChronicle}
            className="flex items-center justify-center gap-1.5 rounded border border-[#B18A45]/40 bg-[#211C17] px-3 py-2 text-xs font-medium text-[#CFA861] cursor-pointer"
          >
            <ScrollText className="h-3.5 w-3.5" />
            <span>Reader</span>
          </button>
        </div>
      </div>

      {isNavDrawerOpen && (
        <div
          id="realm-destinations-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Conventional Realm Navigation"
          className="fixed inset-0 z-40 flex justify-end bg-black/65 backdrop-blur-xs"
          onClick={() => setNavDrawerOpen(false)}
        >
          <nav
            aria-label="All Portfolio Destinations"
            className="surface-leather realm-scroll flex h-full w-full max-w-sm flex-col justify-between overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#B18A45]/30 pb-4">
                <div>
                  <p className="font-display text-xs tracking-[0.2em] uppercase text-[#B18A45]">
                    Royal Ledger
                  </p>
                  <h2 className="mt-0.5 font-display text-lg font-semibold text-[#E5D5B9]">
                    All Destinations
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setNavDrawerOpen(false)}
                  className="rounded border border-[#B18A45]/40 px-2.5 py-1 text-xs text-[#E5D5B9] hover:border-[#CFA861] cursor-pointer"
                >
                  Close
                </button>
              </div>

              <ul className="mt-5 space-y-2.5">
                {DESTINATIONS.map((dest) => {
                  const isSelected = selectedId === dest.id
                  return (
                    <li key={dest.id}>
                      <button
                        type="button"
                        onClick={() => selectDestination(dest.id)}
                        className={`w-full rounded border p-3 text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#CFA861] bg-[#392C20]'
                            : 'border-[#B18A45]/30 bg-[#171411]/75 hover:border-[#B18A45]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-display text-sm font-semibold tracking-wide text-[#CFA861]">
                            {dest.realmName}
                          </span>
                          <span className="text-[11px] uppercase tracking-wider text-[#8C8274]">
                            {dest.regionTag}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm font-medium text-[#E5D5B9]">
                          {dest.portfolioTitle}
                        </p>
                        <p className="mt-1 text-xs text-[#E5D5B9]/75">{dest.shortDescription}</p>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="mt-6 space-y-3 border-t border-[#B18A45]/30 pt-4 text-xs text-[#E5D5B9]/85">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => selectDestination('ravens-keep')}
                  className="inline-flex items-center gap-1 rounded border border-[#B18A45]/40 px-2.5 py-1.5 hover:border-[#CFA861] cursor-pointer"
                >
                  <ExternalLink className="h-3 w-3 text-[#B18A45]" />
                  <span>GitHub / LinkedIn / Contact</span>
                </button>
                <button
                  type="button"
                  onClick={replayIntro}
                  className="rounded border border-[#B18A45]/30 px-2.5 py-1.5 text-[#8C8274] hover:text-[#E5D5B9] cursor-pointer"
                >
                  Replay Intro
                </button>
              </div>
              <p className="text-[11px] text-[#8C8274]">{PROFILE_DATA.targetRoles}</p>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
