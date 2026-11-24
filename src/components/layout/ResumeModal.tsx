import { Download, ExternalLink, FileText, Printer, X } from 'lucide-react'
import { useRealm } from '../../context/realmContextCore'
import { ACHIEVEMENTS } from '../../data/achievements'
import { PROFILE_DATA } from '../../data/profile'
import { PROJECTS } from '../../data/projects'
import { SKILL_CATEGORIES } from '../../data/skills'

export function ResumeModal() {
  const { isResumeOpen, setResumeOpen } = useRealm()

  if (!isResumeOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
      onClick={() => setResumeOpen(false)}
    >
      <div
        className="surface-leather realm-scroll flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#B18A45]/35 px-5 py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-[#CFA861]" />
            <h2
              id="resume-modal-title"
              className="font-display text-base font-bold tracking-wider uppercase text-[#E5D5B9]"
            >
              Royal Curriculum Vitae — {PROFILE_DATA.ownerName}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {PROFILE_DATA.resumeUrl ? (
              <a
                href={PROFILE_DATA.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-flex items-center gap-1.5 rounded border border-[#CFA861] bg-[#392C20] px-3 py-1.5 text-xs font-medium text-[#E5D5B9] hover:bg-[#4b3a2b]"
              >
                <Download className="h-3.5 w-3.5 text-[#CFA861]" />
                <span>Download PDF</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded border border-[#B18A45]/50 bg-[#211C17] px-3 py-1.5 text-xs font-medium text-[#E5D5B9] hover:border-[#CFA861] cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5 text-[#CFA861]" />
                <span>Print Summary</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setResumeOpen(false)}
              aria-label="Close resume view"
              className="rounded border border-[#B18A45]/45 bg-[#171411]/80 p-1.5 text-[#E5D5B9] hover:border-[#CFA861] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="realm-scroll overflow-y-auto p-5 sm:p-6">
          {!PROFILE_DATA.resumeUrl && (
            <div className="mb-4 rounded border border-dashed border-[#B18A45]/60 bg-[#392C20]/45 px-4 py-2.5 text-xs text-[#E5D5B9]">
              <strong>PDF Pending:</strong> {PROFILE_DATA.resumePlaceholder}. Below is the complete
              verified resume summary from your submitted profile.
            </div>
          )}

          <div className="surface-parchment space-y-5 rounded-md p-5 sm:p-6 text-sm text-[#241B14]">
            <div className="border-b border-[#524234]/25 pb-3">
              <h3 className="font-display text-xl font-bold">{PROFILE_DATA.ownerName}</h3>
              <p className="text-xs text-[#524234]">
                {PROFILE_DATA.location} •{' '}
                {PROFILE_DATA.githubUrl && (
                  <a
                    href={PROFILE_DATA.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[#741F20] underline"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}{' '}
                • {PROFILE_DATA.emailPlaceholder}
              </p>
              <p className="mt-2 font-editorial italic text-base">“{PROFILE_DATA.quote}”</p>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[#741F20]">
                Professional Summary
              </h4>
              <p className="mt-1 leading-relaxed">{PROFILE_DATA.summary}</p>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[#741F20]">
                Technical Skills
              </h4>
              <ul className="mt-1.5 space-y-1 text-xs">
                {SKILL_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <strong>{cat.categoryName}:</strong> {cat.skills.join(', ')}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[#741F20]">
                Projects
              </h4>
              <ul className="mt-1.5 space-y-2 text-xs">
                {PROJECTS.map((proj) => (
                  <li key={proj.id}>
                    <strong>
                      {proj.title} ({proj.subtitle}):
                    </strong>{' '}
                    {proj.summary}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[#741F20]">
                Education
              </h4>
              <ul className="mt-1.5 space-y-1 text-xs">
                {PROFILE_DATA.education.map((edu) => (
                  <li key={edu.id}>
                    <strong>{edu.institution}</strong> — {edu.credential} ({edu.period})
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold tracking-wider uppercase text-[#741F20]">
                Achievements &amp; Certification
              </h4>
              <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-xs">
                {ACHIEVEMENTS.map((item) => (
                  <li key={item.id}>
                    <strong>{item.title}</strong> — {item.eventOrIssuer}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
