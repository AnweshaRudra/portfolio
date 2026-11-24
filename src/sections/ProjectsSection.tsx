import { Layers } from 'lucide-react'
import { useState } from 'react'
import { ManuscriptCard } from '../components/ui/ManuscriptCard'
import { ProjectCaseStudy } from '../components/ui/ProjectCaseStudy'
import { WaxSealBadge } from '../components/ui/WaxSealBadge'
import { PROJECTS } from '../data/projects'

type DomainFilter = 'All' | 'AI & ML' | 'Mobile & API'

export function ProjectsSection() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [domainFilter, setDomainFilter] = useState<DomainFilter>('All')

  const activeProject = PROJECTS.find((p) => p.id === activeProjectId) ?? null

  if (activeProject) {
    return (
      <ProjectCaseStudy project={activeProject} onBack={() => setActiveProjectId(null)} />
    )
  }

  const filteredProjects =
    domainFilter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.domain === domainFilter)

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-[#B18A45]/30 bg-[#171411]/70 p-4 text-xs text-[#E5D5B9]/85">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-display text-xs tracking-[0.14em] uppercase text-[#CFA861]">
            <Layers className="h-4 w-4" />
            <span>Royal Project Manuscripts</span>
          </p>

          <div role="group" aria-label="Filter projects by domain" className="flex gap-1.5">
            {(['All', 'AI & ML', 'Mobile & API'] as const).map((filter) => {
              const active = domainFilter === filter
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setDomainFilter(filter)}
                  className={`rounded border px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                    active
                      ? 'border-[#CFA861] bg-[#392C20] text-[#CFA861]'
                      : 'border-[#B18A45]/30 bg-[#211C17] text-[#E5D5B9]/80 hover:border-[#B18A45]'
                  }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </div>
        <p className="mt-2 leading-relaxed">
          Select any manuscript to inspect problem statement, personal role, architecture pipeline,
          technology stack, and verified outcome. Missing repository or demo links are clearly
          marked as placeholders.
        </p>
      </div>

      <div className="grid gap-4">
        {filteredProjects.map((project) => (
          <ManuscriptCard
            key={project.id}
            eyebrow={project.subtitle}
            title={project.title}
            badge={
              <WaxSealBadge
                label={project.status}
                tone={project.featured ? 'crimson' : 'stone'}
              />
            }
          >
            <p className="text-sm leading-relaxed text-[#241B14]/90">{project.summary}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded border border-[#524234]/25 bg-[#171411]/6 px-2 py-0.5 text-[11px] font-medium text-[#241B14]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#524234]/20 pt-3">
              <span className="text-[11px] text-[#524234]">
                {project.repoUrl ? 'Repository verified' : 'Repo URL pending verification'}
              </span>
              <button
                type="button"
                onClick={() => setActiveProjectId(project.id)}
                className="rounded border border-[#241B14] bg-[#241B14] px-3 py-1.5 text-xs font-medium text-[#E5D5B9] transition-colors hover:bg-[#392C20] cursor-pointer"
              >
                Inspect Case Study
              </button>
            </div>
          </ManuscriptCard>
        ))}
      </div>
    </div>
  )
}
