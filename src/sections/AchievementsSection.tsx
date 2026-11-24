import { Award, Medal } from 'lucide-react'
import { ManuscriptCard } from '../components/ui/ManuscriptCard'
import { WaxSealBadge } from '../components/ui/WaxSealBadge'
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
          <li key={item.id}>
            <ManuscriptCard
              eyebrow={item.eventOrIssuer}
              title={item.title}
              badge={
                <WaxSealBadge
                  label={item.type}
                  tone={item.type === 'Hackathon Award' ? 'crimson' : 'gold'}
                  icon={<Medal className="h-3 w-3" />}
                />
              }
            >
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#524234]">
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
            </ManuscriptCard>
          </li>
        ))}
      </ul>
    </div>
  )
}
