import { BookMarked, Compass, Minus, Plus, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { useRealm } from '../../context/realmContextCore'
import { DESTINATIONS } from '../../data/destinations'

export function MapHudControls() {
  const {
    scene,
    isPanelOpen,
    compassAngleDeg,
    reducedMotion,
    resetMapView,
    zoomMap,
    selectDestination,
  } = useRealm()

  const [legendOpen, setLegendOpen] = useState(false)

  if (scene !== 'map' || isPanelOpen) return null

  return (
    <aside
      aria-label="Map Compass, Legend and Camera Controls"
      className="pointer-events-none fixed top-16 left-3 z-20 flex flex-col items-start gap-2 sm:top-20 sm:left-6"
    >
      <div className="pointer-events-auto flex items-center gap-2 rounded-md border border-[#B18A45]/45 bg-[#171411]/88 px-2.5 py-2 shadow-xl backdrop-blur-xs">
        {/* Live Rotating Compass Rose */}
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B18A45]/55 bg-[#241D17]"
          title={`North Compass (${compassAngleDeg}°)`}
        >
          <div
            style={{
              transform: reducedMotion ? 'none' : `rotate(${-compassAngleDeg}deg)`,
              transition: 'transform 120ms linear',
            }}
            className="flex flex-col items-center"
          >
            <span className="font-display text-[8px] font-bold leading-none text-[#CFA861]">
              N
            </span>
            <Compass className="h-4 w-4 text-[#B18A45]" />
          </div>
        </div>

        {/* Zoom & Reset Controls */}
        <div className="flex items-center gap-1 border-l border-[#B18A45]/25 pl-2">
          <button
            type="button"
            onClick={() => zoomMap('in')}
            aria-label="Zoom in on kingdom map"
            title="Zoom in"
            className="rounded border border-[#B18A45]/35 bg-[#211C17] p-1.5 text-[#E5D5B9] hover:border-[#CFA861] hover:text-[#CFA861] cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => zoomMap('out')}
            aria-label="Zoom out on kingdom map"
            title="Zoom out"
            className="rounded border border-[#B18A45]/35 bg-[#211C17] p-1.5 text-[#E5D5B9] hover:border-[#CFA861] hover:text-[#CFA861] cursor-pointer"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={resetMapView}
            aria-label="Reset map camera view"
            title="Reset map camera"
            className="inline-flex items-center gap-1 rounded border border-[#B18A45]/35 bg-[#211C17] px-2 py-1.5 text-[11px] font-medium text-[#E5D5B9] hover:border-[#CFA861] hover:text-[#CFA861] cursor-pointer"
          >
            <RotateCcw className="h-3 w-3 text-[#B18A45]" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button
            type="button"
            onClick={() => setLegendOpen((open) => !open)}
            aria-expanded={legendOpen}
            aria-label="Toggle map legend"
            title="Map Legend"
            className={`inline-flex items-center gap-1 rounded border px-2 py-1.5 text-[11px] font-medium transition-colors cursor-pointer ${
              legendOpen
                ? 'border-[#CFA861] bg-[#392C20] text-[#CFA861]'
                : 'border-[#B18A45]/35 bg-[#211C17] text-[#E5D5B9] hover:border-[#CFA861]'
            }`}
          >
            <BookMarked className="h-3 w-3" />
            <span className="hidden sm:inline">Legend</span>
          </button>
        </div>
      </div>

      {/* Expandable Cartographic Legend */}
      {legendOpen && (
        <div className="pointer-events-auto w-72 rounded-md border border-[#B18A45]/50 bg-[#171411]/95 p-3.5 text-xs shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-[#B18A45]/25 pb-2">
            <span className="font-display text-[11px] font-semibold tracking-[0.16em] uppercase text-[#CFA861]">
              Cartographer&apos;s Legend
            </span>
            <button
              type="button"
              onClick={() => setLegendOpen(false)}
              className="text-[11px] text-[#8C8274] hover:text-[#E5D5B9] cursor-pointer"
            >
              Hide
            </button>
          </div>

          <ul className="mt-2.5 space-y-1.5">
            {DESTINATIONS.map((dest) => (
              <li key={dest.id}>
                <button
                  type="button"
                  onClick={() => selectDestination(dest.id)}
                  className="flex w-full items-center justify-between rounded px-1.5 py-1 text-left hover:bg-[#392C20]/60 cursor-pointer"
                >
                  <span className="font-display text-[11px] font-semibold text-[#CFA861]">
                    {dest.realmName}
                  </span>
                  <span className="text-[11px] text-[#E5D5B9]/85">{dest.portfolioTitle}</span>
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-3 border-t border-[#B18A45]/20 pt-2 text-[11px] leading-relaxed text-[#8C8274]">
            Drag to orbit • Scroll or +/- to zoom • Click any stronghold or use the bottom ledger.
          </p>
        </div>
      )}
    </aside>
  )
}
