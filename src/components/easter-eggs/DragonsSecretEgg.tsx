import { Flame } from 'lucide-react'
import { useState } from 'react'
import { useRealm } from '../../context/realmContextCore'
import { realmAudioEngine } from '../../utils/audioEngine'

export function DragonsSecretEgg() {
  const { audioEnabled } = useRealm()
  const [open, setOpen] = useState(false)

  const handleToggle = () => {
    const next = !open
    setOpen(next)
    if (next && audioEnabled) {
      realmAudioEngine.playInteractionChime('easterEgg')
    }
  }

  return (
    <div className="mt-4 rounded-md border border-[#741F20]/45 bg-[#171411]/75 p-3 text-xs">
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 text-left text-[#E5D5B9]/85 hover:text-[#CFA861] cursor-pointer"
      >
        <span className="flex items-center gap-2 font-display text-[11px] tracking-[0.14em] uppercase text-[#CFA861]">
          <Flame className="h-3.5 w-3.5 text-[#b83728]" />
          <span>Dragon&apos;s Secret — Engineering Forge Note</span>
        </span>
        <span className="text-[11px] text-[#8C8274]">{open ? 'Conceal' : 'Reveal'}</span>
      </button>

      {open && (
        <p className="mt-2.5 border-t border-[#741F20]/30 pt-2.5 leading-relaxed text-[#E5D5B9]/85">
          Behind the builds: Across the hackathon prototypes, the recurring theme is pairing
          Python data/ML workflows (Isolation Forest + Z-scores, character TF-IDF + XGBoost, and
          FastAPI inference endpoints) with practical interfaces built for real-world constraints.
        </p>
      )}
    </div>
  )
}
