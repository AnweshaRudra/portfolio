import { ArrowLeft, ArrowRight, ExternalLink, FolderGit2, ShieldAlert } from 'lucide-react'
import type { ProjectItem } from '../../data/types'
import { ManuscriptCard } from './ManuscriptCard'
import { WaxSealBadge } from './WaxSealBadge'

interface ProjectCaseStudyProps {
  project: ProjectItem
  onBack?: () => void
  backLabel?: string
}

export function ProjectCaseStudy({
  project,
  onBack,
  backLabel = 'All Royal Archive Projects',
}: ProjectCaseStudyProps) {
  const architectureSteps = project.architecture
    .split('->')
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <article className="space-y-4">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded border border-[#B18A45]/45 bg-[#171411]/80 px-3 py-1.5 text-xs font-medium text-[#CFA861] hover:border-[#CFA861] cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{backLabel}</span>
        </button>
      )}

      <ManuscriptCard
        eyebrow={project.subtitle}
        title={project.title}
        badge={
          <WaxSealBadge
            label={project.status}
            tone={project.featured ? 'crimson' : 'stone'}
          />
        }
      >
        <p className="text-sm leading-relaxed text-[#241B14]">{project.summary}</p>

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
              System Architecture Pipeline
            </dt>
            <dd className="mt-2 flex flex-wrap items-center gap-1.5 rounded border border-[#524234]/25 bg-[#171411]/6 p-3">
              {architectureSteps.map((step, idx) => (
                <div key={step} className="flex items-center gap-1.5">
                  <span className="rounded border border-[#524234]/30 bg-[#EFE3C8] px-2 py-1 text-xs font-medium text-[#241B14]">
                    {step}
                  </span>
                  {idx < architectureSteps.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#741F20]" />
                  )}
                </div>
              ))}
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
                  className="rounded border border-[#524234]/30 bg-[#171411]/8 px-2.5 py-0.5 text-xs font-medium text-[#241B14]"
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

        {/* Repository & Demo links or explicit placeholders */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-[#524234]/20 pt-4 text-xs">
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
      </ManuscriptCard>
    </article>
  )
}
