import { BookOpen } from 'lucide-react'
import { ManuscriptCard } from '../components/ui/ManuscriptCard'
import { WaxSealBadge } from '../components/ui/WaxSealBadge'
import { SKILL_CATEGORIES } from '../data/skills'

export function SkillsSection() {
  return (
    <div className="space-y-5">
      <div className="rounded-md border border-[#B18A45]/30 bg-[#171411]/70 p-4 text-sm text-[#E5D5B9]/90">
        <p className="flex items-center gap-2 font-display text-xs tracking-[0.15em] uppercase text-[#CFA861]">
          <BookOpen className="h-4 w-4" />
          <span>Verified Technical Arsenal</span>
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-[#E5D5B9]/80">
          Organised into functional houses from Anwesha&apos;s verified resume rather than arbitrary
          proficiency percentages.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SKILL_CATEGORIES.map((category) => (
          <ManuscriptCard
            key={category.id}
            eyebrow={category.houseTitle}
            title={category.categoryName}
            badge={<WaxSealBadge label={`${category.skills.length} Skills`} tone="gold" />}
          >
            <p className="text-xs leading-relaxed text-[#524234]">{category.description}</p>

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded border border-[#524234]/30 bg-[#171411]/8 px-2.5 py-1 text-xs font-medium text-[#241B14]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </ManuscriptCard>
        ))}
      </div>
    </div>
  )
}
