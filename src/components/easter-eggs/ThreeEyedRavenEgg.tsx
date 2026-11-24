import { Eye, Feather, X } from 'lucide-react'
import { useState } from 'react'
import { useRealm } from '../../context/realmContextCore'
import { PROFILE_DATA } from '../../data/profile'
import { realmAudioEngine } from '../../utils/audioEngine'

export function ThreeEyedRavenEgg() {
  const { audioEnabled } = useRealm()
  const [clicks, setClicks] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const handleRavenClick = () => {
    const next = clicks + 1
    if (next >= 3) {
      setClicks(0)
      setRevealed(true)
      if (audioEnabled) {
        realmAudioEngine.playInteractionChime('easterEgg')
      }
      return
    }
    setClicks(next)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleRavenClick}
        aria-label="Hidden Three-Eyed Raven Easter Egg"
        title={clicks > 0 ? `The Raven watches (${clicks}/3)…` : 'A quiet raven perches here'}
        className="inline-flex items-center gap-1 rounded border border-[#B18A45]/25 bg-[#171411]/75 px-2 py-1.5 text-[11px] text-[#8C8274] transition-colors hover:border-[#B18A45]/70 hover:text-[#CFA861] cursor-pointer"
      >
        <Feather className="h-3.5 w-3.5" />
        {clicks > 0 && <span className="text-[10px] text-[#CFA861]">{clicks}/3</span>}
      </button>

      {revealed && (
        <div
          role="dialog"
          aria-label="Three-Eyed Raven Developer Note"
          className="surface-leather fixed right-4 bottom-20 z-40 w-80 max-w-[calc(100vw-2rem)] rounded-lg p-4 text-xs shadow-2xl"
        >
          <div className="flex items-start justify-between gap-2 border-b border-[#B18A45]/30 pb-2">
            <p className="flex items-center gap-1.5 font-display text-[11px] font-semibold tracking-widest uppercase text-[#CFA861]">
              <Eye className="h-3.5 w-3.5" />
              <span>The Three-Eyed Raven</span>
            </p>
            <button
              type="button"
              onClick={() => setRevealed(false)}
              aria-label="Dismiss raven note"
              className="text-[#8C8274] hover:text-[#E5D5B9] cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-2.5 font-editorial text-sm italic text-[#E5D5B9]">
            “{PROFILE_DATA.quote}”
          </p>
          <p className="mt-2 leading-relaxed text-[#E5D5B9]/85">
            Developer Note: Every 3D throne spire, cartographic contour, and ambient note in this
            realm was built procedurally with Three.js, React Three Fiber, GSAP, and the Web Audio
            API—zero external show assets.
          </p>
        </div>
      )}
    </div>
  )
}
