import { Award, Medal } from 'lucide-react'
import { ACHIEVEMENTS } from '../data/achievements'

export function AchievementsSection() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border border-[#B18A45]/30 bg-[#171411]/70 p-4 text-xs text-[#E5D5B9]/85">
        <p className="flex items-center gap-2 font-display text-xs tracking-[0.14em] uppercase text-[#CFA861]">
          <Award className="h-4 w-4" />
          <span>Honours, Hackathons &amp; Credentials</span>
        </p>
        <p className="mt-1 leading-relaxed">
          All placements and certifications below are taken directly from Anwesha&apos;s verified
          resume. Event dates are marked as placeholders until confirmed.
        </p>
      </div>

      <ul className="space-y-3">
        {ACHIEVEMENTS.map((item) => (
          <li key={item.id} className="surface-parchment rounded-md p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <Medal className="mt-0.5 h-4 w-4 shrink-0 text-[#741F20]" />
                <div>
                  <h3 className="font-display text-base font-bold text-[#241B14]">{item.title}</h3>
                  <p className="text-sm font-medium text-[#524234]">{item.eventOrIssuer}</p>
                </div>
              </div>
              <span className="rounded border border-[#741F20]/30 bg-[#741F20]/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#741F20]">
                {item.type}
              </span>
            </div>

            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#524234]">
              {item.relatedProject && (
                <span>
                  <strong className="text-[#241B14]">Project:</strong> {item.relatedProject}
                </span>
              )}
              <span>
                <strong className="text-[#241B14]">Date:</strong> {item.datePlaceholder}
              </span>
            </div>

            {item.verificationNote && (
              <p className="mt-2 text-[11px] italic text-[#741F20]/85">{item.verificationNote}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
