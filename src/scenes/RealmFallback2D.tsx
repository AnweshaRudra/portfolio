import { Compass } from 'lucide-react'
import { useEffect } from 'react'
import { useRealm } from '../context/realmContextCore'
import { DESTINATIONS } from '../data/destinations'

export function RealmFallback2D({ reason }: { reason?: string }) {
  const { selectedId, selectDestination, markSceneReady, scene } = useRealm()

  useEffect(() => {
    markSceneReady()
  }, [markSceneReady])

  if (scene === 'intro') {
    return (
      <div
        className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_30%,#392C20_0%,#171411_70%)]"
        aria-hidden="true"
      />
    )
  }

  return (
    <div className="fixed inset-0 z-0 overflow-auto bg-[#171411] px-4 pt-24 pb-24">
      <div className="mx-auto max-w-5xl rounded-lg border border-[#B18A45]/40 bg-[#211C17]/95 p-6 shadow-2xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#B18A45]/25 pb-4">
          <div className="flex items-center gap-2.5">
            <Compass className="h-5 w-5 text-[#B18A45]" />
            <h2 className="font-display text-lg tracking-wider uppercase text-[#E5D5B9]">
              Kingdom Cartography (2D Mode)
            </h2>
          </div>
          {reason && <p className="text-xs text-[#8C8274]">{reason}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((dest) => {
            const active = selectedId === dest.id
            return (
              <button
                key={dest.id}
                type="button"
                onClick={() => selectDestination(dest.id)}
                className={`rounded-md border p-4 text-left transition-colors cursor-pointer ${
                  active
                    ? 'border-[#CFA861] bg-[#392C20]'
                    : 'border-[#B18A45]/35 bg-[#171411]/80 hover:border-[#B18A45]'
                }`}
              >
                <span className="text-[11px] font-medium tracking-widest uppercase text-[#8C8274]">
                  {dest.regionTag}
                </span>
                <h3 className="mt-1 font-display text-base font-semibold text-[#CFA861]">
                  {dest.realmName}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-[#E5D5B9]">{dest.portfolioTitle}</p>
                <p className="mt-2 text-xs leading-relaxed text-[#E5D5B9]/75">
                  {dest.shortDescription}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
