import { ArrowLeft, ExternalLink, FolderGit2, Layers, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { PROJECTS } from '../data/projects'
import type { ProjectItem } from '../data/types'

function ProjectDetailView({
  project,
  onBack,
}: {
  project: ProjectItem
  onBack: () => void
}) {
  return (
    <article className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 rounded border border-[#B18A45]/45 bg-[#171411]/80 px-3 py-1.5 text-xs font-medium text-[#CFA861] hover:border-[#CFA861] cursor-pointer"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>All Royal Archive Projects</span>
      </button>

      <div className="surface-parchment rounded-md p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#524234]/20 pb-3">
          <div>
            <p className="font-display text-[11px] tracking-[0.16em] uppercase text-[#741F20]">
              {project.subtitle}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-[#241B14]">{project.title}</h3>
          </div>
          <span className="rounded border border-[#524234]/30 bg-[#171411]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#241B14]">
            {project.status}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#241B14]">{project.summary}</p>

        <dl className="mt-5 space-y-4 text-sm">
          <div>
            <dt className="font-display text-xs font-bold tracking-wider uppercase text-[#741F20]">
              Problem Statement
            </dt>
            <dd className="mt-1 leading-relaxed text-[#241B14]/90">{project.problem}</dd>
          </div>

          <div>
            <dt className="font-display text-xs font-bold tracking-wider uppercase text-[#741F20]">
              Role &amp; Personal Contribution
            </dt>
            <dd className="mt-1 leading-relaxed text-[#241B14]/90">{project.role}</dd>
          </div>

          <div>
            <dt className="font-display text-xs font-bold tracking-wider uppercase text-[#741F20]">
              Engineering Approach
            </dt>
            <dd className="mt-1">
              <ul className="list-disc space-y-1 pl-5 text-[#241B14]/90">
                {project.approach.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </dd>
          </div>

          <div>
            <dt className="font-display text-xs font-bold tracking-wider uppercase text-[#741F20]">
              Architecture Flow
            </dt>
            <dd className="mt-1 rounded border border-[#524234]/25 bg-[#171411]/6 p-3 font-mono text-xs text-[#241B14]">
              {project.architecture}
            </dd>
          </div>

          <div>
            <dt className="font-display text-xs font-bold tracking-wider uppercase text-[#741F20]">
              Technology Stack
            </dt>
            <dd className="mt-1.5 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-[#524234]/30 bg-[#171411]/8 px-2 py-0.5 text-xs font-medium text-[#241B14]"
                >
                  {tech}
                </span>
              ))}
            </dd>
          </div>

          <div>
            <dt className="font-display text-xs font-bold tracking-wider uppercase text-[#741F20]">
              Verified Outcome
            </dt>
            <dd className="mt-1 leading-relaxed text-[#241B14]/90">{project.outcome}</dd>
          </div>
        </dl>

        {/* Repository & Demo links or transparent placeholders */}
        <div className="mt-6 space-y-2 border-t border-[#524234]/20 pt-4 text-xs">
          <div className="flex flex-wrap gap-2">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-[#241B14] bg-[#241B14] px-3 py-1.5 font-medium text-[#E5D5B9] hover:bg-[#392C20]"
              >
                <FolderGit2 className="h-3.5 w-3.5" />
                <span>View Repository</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded border border-dashed border-[#741F20]/45 bg-[#741F20]/8 px-3 py-1.5 text-[#741F20]">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>{project.repoPlaceholder}</span>
              </span>
            )}

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded border border-[#524234] px-3 py-1.5 font-medium text-[#241B14] hover:bg-[#171411]/10"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Live Demo</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded border border-dashed border-[#524234]/40 px-3 py-1.5 text-[#524234]">
                <span>{project.demoPlaceholder}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export function ProjectsSection() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const activeProject = PROJECTS.find((p) => p.id === activeProjectId) ?? null

  if (activeProject) {
    return (
      <ProjectDetailView project={activeProject} onBack={() => setActiveProjectId(null)} />
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-[#B18A45]/30 bg-[#171411]/70 p-4 text-xs text-[#E5D5B9]/85">
        <p className="flex items-center gap-2 font-display text-xs tracking-[0.14em] uppercase text-[#CFA861]">
          <Layers className="h-4 w-4" />
          <span>Royal Project Manuscripts</span>
        </p>
        <p className="mt-1 leading-relaxed">
          Select any manuscript to inspect problem statement, personal role, architecture flow,
          technology stack, and verified outcome. Missing repository/demo links are explicitly
          marked as placeholders.
        </p>
      </div>

      <div className="grid gap-4">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="surface-parchment rounded-md p-4 transition-transform sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-display text-[11px] tracking-[0.16em] uppercase text-[#741F20]">
                  {project.subtitle}
                </p>
                <h3 className="mt-0.5 font-display text-lg font-bold text-[#241B14]">
                  {project.title}
                </h3>
              </div>
              <span className="rounded border border-[#524234]/35 bg-[#171411]/8 px-2 py-0.5 text-[11px] font-semibold text-[#241B14]">
                {project.status}
              </span>
            </div>

            <p className="mt-2.5 text-sm leading-relaxed text-[#241B14]/90">{project.summary}</p>

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
          </article>
        ))}
      </div>
    </div>
  )
}
