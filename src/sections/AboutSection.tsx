import { GraduationCap, MapPin, Quote, Snowflake } from 'lucide-react'
import { ManuscriptCard } from '../components/ui/ManuscriptCard'
import { WaxSealBadge } from '../components/ui/WaxSealBadge'
import { useRealm } from '../context/realmContextCore'
import { PROFILE_DATA } from '../data/profile'

const UI_SNOWFLAKES = [
  { left: '6%', delay: '0s', duration: '4.2s', size: 10 },
  { left: '16%', delay: '1.1s', duration: '5.1s', size: 12 },
  { left: '28%', delay: '0.4s', duration: '3.9s', size: 9 },
  { left: '41%', delay: '1.8s', duration: '4.7s', size: 11 },
  { left: '56%', delay: '0.7s', duration: '4.4s', size: 13 },
  { left: '68%', delay: '2.1s', duration: '5.3s', size: 10 },
  { left: '81%', delay: '0.2s', duration: '4.0s', size: 12 },
  { left: '92%', delay: '1.4s', duration: '4.8s', size: 10 },
]

export function AboutSection() {
  const { reducedMotion } = useRealm()

  return (
    <div className="space-y-6">
      {/* Winterfell Northern Motto Banner with animated falling snowfall */}
      <div className="relative overflow-hidden rounded-md border border-[#9fb3c2]/40 bg-gradient-to-r from-[#192128] via-[#211c17] to-[#192128] px-4 py-4 text-center">
        {!reducedMotion && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {UI_SNOWFLAKES.map((flake, idx) => (
              <span
                key={idx}
                className="winterfell-flake absolute -top-4 text-[#cfe6f5]/75"
                style={{
                  left: flake.left,
                  animationDelay: flake.delay,
                  animationDuration: flake.duration,
                  fontSize: `${flake.size}px`,
                }}
              >
                ❄
              </span>
            ))}
          </div>
        )}

        <div className="relative z-10 flex items-center justify-center gap-2 font-display text-xs font-semibold tracking-[0.26em] uppercase text-[#d8e8f2]">
          <Snowflake
            className={`h-3.5 w-3.5 text-[#9fd3eb] ${reducedMotion ? '' : 'animate-spin'}`}
            style={{ animationDuration: '9s' }}
          />
          <span>Winter Is Coming</span>
          <Snowflake
            className={`h-3.5 w-3.5 text-[#9fd3eb] ${reducedMotion ? '' : 'animate-spin'}`}
            style={{ animationDuration: '9s' }}
          />
        </div>
        <p className="relative z-10 mt-1 font-editorial text-xs italic text-[#b2c7d6]">
          Northern Keep of Discipline, Foundations &amp; Continuous Learning
        </p>
      </div>

      <ManuscriptCard
        eyebrow="Royal Biography"
        title={PROFILE_DATA.ownerName}
        badge={<WaxSealBadge label="CSE Undergraduate" tone="crimson" />}
      >
        <p className="flex items-center gap-1.5 text-xs font-medium text-[#524234]">
          <MapPin className="h-3.5 w-3.5 text-[#741F20]" />
          <span>{PROFILE_DATA.location}</span>
        </p>

        <blockquote className="mt-4 flex gap-2.5 border-l-2 border-[#B18A45] pl-3 font-editorial text-lg italic text-[#241B14]">
          <Quote className="mt-1 h-4 w-4 shrink-0 text-[#B18A45]" />
          <span>“{PROFILE_DATA.quote}”</span>
        </blockquote>

        <p className="mt-4 text-sm leading-relaxed text-[#241B14]/90">{PROFILE_DATA.summary}</p>

        <div className="mt-4 rounded border border-[#524234]/25 bg-[#171411]/5 p-3 text-xs font-medium text-[#241B14]">
          <span className="font-semibold text-[#741F20]">Current Objective: </span>
          {PROFILE_DATA.targetRoles}
        </div>
      </ManuscriptCard>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-[#CFA861]" />
          <h3 className="font-display text-sm font-semibold tracking-[0.15em] uppercase text-[#CFA861]">
            Academic Chronicle
          </h3>
        </div>

        <ol className="space-y-3">
          {PROFILE_DATA.education.map((edu) => (
            <li
              key={edu.id}
              className="rounded-md border border-[#B18A45]/35 bg-[#171411]/75 p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-display text-sm font-semibold text-[#E5D5B9]">
                  {edu.institution}
                </h4>
                <span className="text-xs font-medium text-[#CFA861]">{edu.period}</span>
              </div>
              <p className="mt-1 text-sm text-[#E5D5B9]/90">{edu.credential}</p>
              {edu.notes && <p className="mt-1 text-xs text-[#8C8274]">{edu.notes}</p>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
