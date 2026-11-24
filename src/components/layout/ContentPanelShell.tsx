import { ArrowLeft, ArrowRight, Map, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { type ReactNode, useEffect, useRef } from 'react'
import { useRealm } from '../../context/realmContextCore'
import { DESTINATIONS } from '../../data/destinations'

interface ContentPanelShellProps {
  children: ReactNode
}

export function ContentPanelShell({ children }: ContentPanelShellProps) {
  const {
    scene,
    isPanelOpen,
    selectedDestination,
    reducedMotion,
    closePanel,
    returnToMap,
    selectDestination,
  } = useRealm()

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isPanelOpen) {
      closeButtonRef.current?.focus()
    }
  }, [isPanelOpen, selectedDestination?.id])

  if (scene !== 'map' || !selectedDestination) return null

  const currentIndex = DESTINATIONS.findIndex((d) => d.id === selectedDestination.id)
  const prevDestination =
    DESTINATIONS[(currentIndex - 1 + DESTINATIONS.length) % DESTINATIONS.length]
  const nextDestination = DESTINATIONS[(currentIndex + 1) % DESTINATIONS.length]

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <div
          className="fixed inset-0 z-30 flex items-stretch justify-end bg-black/45 md:bg-black/25"
          onClick={closePanel}
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="realm-panel-heading"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 36 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.25, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            className="surface-leather flex h-full w-full flex-col md:mt-16 md:mr-4 md:mb-20 md:h-auto md:max-h-[calc(100vh-9.5rem)] md:max-w-2xl md:rounded-lg"
          >
            {/* Panel header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#B18A45]/35 px-5 py-4 sm:px-6">
              <div>
                <p className="font-display text-[11px] tracking-[0.2em] uppercase text-[#B18A45]">
                  {selectedDestination.regionTag} • {selectedDestination.visualTreatment}
                </p>
                <h2
                  id="realm-panel-heading"
                  className="mt-1 font-display text-xl font-bold tracking-wide text-[#E5D5B9] sm:text-2xl"
                >
                  {selectedDestination.realmName} — {selectedDestination.portfolioTitle}
                </h2>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closePanel}
                aria-label="Close panel and return to map"
                className="rounded border border-[#B18A45]/45 bg-[#171411]/80 p-2 text-[#E5D5B9] transition-colors hover:border-[#CFA861] hover:text-[#CFA861] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable manuscript content */}
            <div className="realm-scroll flex-1 overflow-y-auto px-5 py-5 sm:px-6">{children}</div>

            {/* Panel footer navigation */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#B18A45]/30 bg-[#171411]/70 px-4 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => selectDestination(prevDestination.id)}
                className="inline-flex items-center gap-1.5 rounded border border-[#B18A45]/35 px-2.5 py-1.5 text-xs text-[#E5D5B9] hover:border-[#CFA861] cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-[#B18A45]" />
                <span>{prevDestination.realmName}</span>
              </button>

              <button
                type="button"
                onClick={returnToMap}
                className="inline-flex items-center gap-1.5 rounded border border-[#CFA861]/70 bg-[#392C20] px-3 py-1.5 text-xs font-medium text-[#CFA861] hover:bg-[#4a392a] cursor-pointer"
              >
                <Map className="h-3.5 w-3.5" />
                <span>Return to Map</span>
              </button>

              <button
                type="button"
                onClick={() => selectDestination(nextDestination.id)}
                className="inline-flex items-center gap-1.5 rounded border border-[#B18A45]/35 px-2.5 py-1.5 text-xs text-[#E5D5B9] hover:border-[#CFA861] cursor-pointer"
              >
                <span>{nextDestination.realmName}</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#B18A45]" />
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
