import { Moon } from 'lucide-react'
import { useState } from 'react'

export function NightsWatchWhisper() {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="border-t border-[#B18A45]/20 pt-3 text-center">
      <button
        type="button"
        onClick={() => setRevealed((prev) => !prev)}
        className="inline-flex items-center gap-1.5 text-[11px] text-[#8C8274] transition-colors hover:text-[#CFA861] cursor-pointer"
      >
        <Moon className="h-3 w-3" />
        <span>
          {revealed
            ? '“I am the compiler in the darkness, the debugger on the wall.” — Always building.'
            : 'Night gathers, and now my watch begins…'}
        </span>
      </button>
    </div>
  )
}
