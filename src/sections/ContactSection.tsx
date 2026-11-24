import { Briefcase, Code2, Feather, FileText, Mail, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { PROFILE_DATA } from '../data/profile'

export function ContactSection() {
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setSubmittedNotice('Please fill in your name, email, and message before dispatching.')
      return
    }
    setSubmittedNotice(
      'Raven draft prepared locally. Live email delivery will be connected once the owner provides a preferred email address or form endpoint.',
    )
  }

  return (
    <div className="space-y-5">
      {/* Verified Professional Channels & Placeholders */}
      <div className="surface-parchment rounded-md p-5">
        <div className="flex items-center gap-2 border-b border-[#524234]/20 pb-3">
          <Feather className="h-4 w-4 text-[#741F20]" />
          <h3 className="font-display text-base font-bold text-[#241B14]">
            Direct Channels &amp; Credentials
          </h3>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-[#524234]">
          The resume header mentions Gmail, Mobile, LinkedIn, GitHub, and Resume download, but the
          raw text did not include the destination URLs or address. Each channel below uses a
          clearly labelled placeholder until verified links are provided.
        </p>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          <div className="flex items-start gap-2.5 rounded border border-[#524234]/30 bg-[#171411]/6 p-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#741F20]" />
            <div className="text-xs">
              <p className="font-semibold text-[#241B14]">Email</p>
              {PROFILE_DATA.emailHref ? (
                <a href={PROFILE_DATA.emailHref} className="underline">
                  {PROFILE_DATA.emailHref}
                </a>
              ) : (
                <p className="text-[#741F20]">{PROFILE_DATA.emailPlaceholder}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded border border-[#524234]/30 bg-[#171411]/6 p-3">
            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-[#741F20]" />
            <div className="text-xs">
              <p className="font-semibold text-[#241B14]">Resume PDF</p>
              {PROFILE_DATA.resumeUrl ? (
                <a
                  href={PROFILE_DATA.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Download Resume PDF
                </a>
              ) : (
                <p className="text-[#741F20]">{PROFILE_DATA.resumePlaceholder}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded border border-[#524234]/30 bg-[#171411]/6 p-3">
            <Code2 className="mt-0.5 h-4 w-4 shrink-0 text-[#741F20]" />
            <div className="text-xs">
              <p className="font-semibold text-[#241B14]">GitHub</p>
              {PROFILE_DATA.githubUrl ? (
                <a
                  href={PROFILE_DATA.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Open GitHub Profile
                </a>
              ) : (
                <p className="text-[#741F20]">{PROFILE_DATA.githubPlaceholder}</p>
              )}
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded border border-[#524234]/30 bg-[#171411]/6 p-3">
            <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-[#741F20]" />
            <div className="text-xs">
              <p className="font-semibold text-[#241B14]">LinkedIn</p>
              {PROFILE_DATA.linkedinUrl ? (
                <a
                  href={PROFILE_DATA.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Open LinkedIn Profile
                </a>
              ) : (
                <p className="text-[#741F20]">{PROFILE_DATA.linkedinPlaceholder}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Send a Raven Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-md border border-[#B18A45]/35 bg-[#171411]/80 p-5 space-y-4"
      >
        <div>
          <h3 className="font-display text-sm font-semibold tracking-[0.14em] uppercase text-[#CFA861]">
            Send a Raven
          </h3>
          <p className="mt-1 text-xs text-[#8C8274]">
            For internship opportunities, engineering collaborations, or project inquiries.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="raven-name" className="block text-xs font-medium text-[#E5D5B9]">
              Your Name
            </label>
            <input
              id="raven-name"
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Recruiter or Collaborator"
              className="mt-1 w-full rounded border border-[#B18A45]/40 bg-[#211C17] px-3 py-2 text-sm text-[#E5D5B9] placeholder:text-[#8C8274]"
            />
          </div>

          <div>
            <label htmlFor="raven-email" className="block text-xs font-medium text-[#E5D5B9]">
              Your Email
            </label>
            <input
              id="raven-email"
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded border border-[#B18A45]/40 bg-[#211C17] px-3 py-2 text-sm text-[#E5D5B9] placeholder:text-[#8C8274]"
            />
          </div>
        </div>

        <div>
          <label htmlFor="raven-message" className="block text-xs font-medium text-[#E5D5B9]">
            Dispatch Message
          </label>
          <textarea
            id="raven-message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share role details, project context, or inquiry…"
            className="mt-1 w-full rounded border border-[#B18A45]/40 bg-[#211C17] px-3 py-2 text-sm text-[#E5D5B9] placeholder:text-[#8C8274]"
          />
        </div>

        {submittedNotice && (
          <p
            role="status"
            className="rounded border border-[#B18A45]/40 bg-[#392C20]/60 px-3 py-2 text-xs text-[#E5D5B9]"
          >
            {submittedNotice}
          </p>
        )}

        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded border border-[#CFA861] bg-[#392C20] px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#E5D5B9] hover:bg-[#4b3a2b] cursor-pointer"
        >
          <Send className="h-3.5 w-3.5 text-[#CFA861]" />
          <span>Dispatch Raven</span>
        </button>
      </form>
    </div>
  )
}
