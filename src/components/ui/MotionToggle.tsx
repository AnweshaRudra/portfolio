import { PauseCircle, Sparkles } from 'lucide-react'
import { useRealm } from '../../context/realmContextCore'

export function MotionToggle() {
  const { reducedMotion, toggleReducedMotion } = useRealm()

  return (
    <button
      type="button"
      onClick={toggleReducedMotion}
      aria-pressed={reducedMotion}
      aria-label={reducedMotion ? 'Enable full motion' : 'Enable reduced motion mode'}
      title={reducedMotion ? 'Reduced motion active' : 'Full motion active'}
      className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
        reducedMotion
          ? 'border-[#CFA861] bg-[#392C20] text-[#CFA861]'
          : 'border-[#B18A45]/40 bg-[#171411]/85 text-[#8C8274] hover:border-[#B18A45] hover:text-[#E5D5B9]'
      }`}
    >
      {reducedMotion ? (
        <PauseCircle className="h-3.5 w-3.5" />
      ) : (
        <Sparkles className="h-3.5 w-3.5" />
      )}
      <span className="hidden sm:inline">{reducedMotion ? 'Low Motion' : 'Motion'}</span>
    </button>
  )
}
