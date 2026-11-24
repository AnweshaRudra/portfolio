import { GraduationCap, MapPin, Quote } from 'lucide-react'
import { PROFILE_DATA } from '../data/profile'

export function AboutSection() {
  return (
    <div className="space-y-6">
      {/* Royal Biography Parchment */}
      <div className="surface-parchment rounded-md p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#524234]/20 pb-3">
          <div>
            <h3 className="font-display text-lg font-bold tracking-wide text-[#241B14] sm:text-xl">
              {PROFILE_DATA.ownerName}
            </h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-[#524234]">
              <MapPin className="h-3.5 w-3.5 text-[#741F20]" />
              <span>{PROFILE_DATA.location}</span>
            </p>
          </div>
          <span className="rounded border border-[#741F20]/30 bg-[#741F20]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#741F20]">
            CSE Undergraduate
          </span>
        </div>

        <blockquote className="mt-4 flex gap-2.5 border-l-2 border-[#B18A45] pl-3 font-editorial text-lg italic text-[#241B14]">
          <Quote className="mt-1 h-4 w-4 shrink-0 text-[#B18A45]" />
          <span>“{PROFILE_DATA.quote}”</span>
        </blockquote>

        <p className="mt-4 text-sm leading-relaxed text-[#241B14]/90">{PROFILE_DATA.summary}</p>

        <div className="mt-4 rounded border border-[#524234]/25 bg-[#171411]/5 p-3 text-xs font-medium text-[#241B14]">
          <span className="font-semibold text-[#741F20]">Current Objective: </span>
          {PROFILE_DATA.targetRoles}
        </div>
      </div>

      {/* Education Chronicle */}
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
