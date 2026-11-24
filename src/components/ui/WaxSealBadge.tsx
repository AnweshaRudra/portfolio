import type { ReactNode } from 'react'

interface WaxSealBadgeProps {
  label: string
  tone?: 'crimson' | 'gold' | 'stone'
  icon?: ReactNode
}

export function WaxSealBadge({ label, tone = 'crimson', icon }: WaxSealBadgeProps) {
  const toneStyles =
    tone === 'crimson'
      ? 'border-[#741F20]/40 bg-[#741F20]/12 text-[#741F20]'
      : tone === 'gold'
        ? 'border-[#8f6823]/45 bg-[#B18A45]/18 text-[#5f4311]'
        : 'border-[#524234]/35 bg-[#171411]/8 text-[#241B14]'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${toneStyles}`}
    >
      {icon}
      <span>{label}</span>
    </span>
  )
}
