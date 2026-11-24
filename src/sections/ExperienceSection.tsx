import { Shield } from 'lucide-react'
import { ManuscriptCard } from '../components/ui/ManuscriptCard'
import { WaxSealBadge } from '../components/ui/WaxSealBadge'
import { EXPERIENCE_ITEMS } from '../data/experience'

export function ExperienceSection() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border border-[#B18A45]/30 bg-[#171411]/70 p-4 text-xs text-[#E5D5B9]/85">
        <p className="flex items-center gap-2 font-display text-xs tracking-[0.14em] uppercase text-[#CFA861]">
          <Shield className="h-4 w-4" />
          <span>Watch Records &amp; Engineering Experience</span>
        </p>
        <p className="mt-1 leading-relaxed">
          Documents verified engineering responsibilities, hackathon delivery, and current
          internship readiness without fabricating employment history.
        </p>
      </div>

      <ol className="space-y-4">
        {EXPERIENCE_ITEMS.map((item) => (
          <li key={item.id}>
            <ManuscriptCard
              eyebrow={item.context}
              title={item.title}
              badge={<WaxSealBadge label={item.period} tone="stone" />}
            >
              <p className="text-xs italic text-[#524234]">{item.statusNote}</p>

              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-[#241B14]/90">
                {item.responsibilities.map((resp) => (
                  <li key={resp}>{resp}</li>
                ))}
              </ul>

              <div className="mt-3 rounded border border-[#524234]/25 bg-[#171411]/6 p-3 text-xs text-[#241B14]">
                <strong className="font-semibold text-[#741F20]">Technical Challenges: </strong>
                {item.challenges}
              </div>
            </ManuscriptCard>
          </li>
        ))}
      </ol>
    </div>
  )
}
