import {
  Briefcase,
  Check,
  Code2,
  Copy,
  Download,
  ExternalLink,
  Feather,
  FileText,
  Mail,
  Phone,
  Send,
} from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { NightsWatchWhisper } from '../components/easter-eggs/NightsWatchWhisper'
import { ManuscriptCard } from '../components/ui/ManuscriptCard'
import { PROFILE_DATA } from '../data/profile'

export function ContactSection() {
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [message, setMessage] = useState('')
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_DATA.emailPlaceholder)
      setCopiedEmail(true)
      window.setTimeout(() => setCopiedEmail(false), 2000)
    } catch {
      setSubmittedNotice(`Copy manually: ${PROFILE_DATA.emailPlaceholder}`)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setSubmittedNotice('Please fill in your name, email, and message before dispatching.')
      return
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${senderName.trim()}`)
    const body = encodeURIComponent(
      `From: ${senderName.trim()} (${senderEmail.trim()})\n\n${message.trim()}`,
    )
    window.location.href = `mailto:${PROFILE_DATA.emailPlaceholder}?subject=${subject}&body=${body}`
    setSubmittedNotice(
      `Opening your email client to send directly to ${PROFILE_DATA.emailPlaceholder}.`,
    )
  }

  return (
    <div className="space-y-5">
      <ManuscriptCard
        eyebrow="Correspondence & Credentials"
        title="Direct Channels"
        badge={<Feather className="h-4 w-4 text-[#741F20]" />}
      >
        <p className="text-xs leading-relaxed text-[#524234]">
          Reach out for technical internships in Software Development, AI/ML, or Data Analytics, or
          download the latest resume PDF directly.
        </p>

        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          <div className="flex items-start justify-between gap-2 rounded border border-[#524234]/30 bg-[#171411]/6 p-3">
            <div className="flex items-start gap-2.5 text-xs min-w-0">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#741F20]" />
              <div className="min-w-0">
                <p className="font-semibold text-[#241B14]">Email</p>
                <a
                  href={PROFILE_DATA.emailHref}
                  className="block truncate font-medium text-[#241B14] underline hover:text-[#741F20]"
                >
                  {PROFILE_DATA.emailPlaceholder}
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              title="Copy email"
              className="shrink-0 rounded border border-[#524234]/30 p-1 text-[#524234] hover:border-[#741F20] hover:text-[#741F20] cursor-pointer"
            >
              {copiedEmail ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>

          <div className="flex items-start gap-2.5 rounded border border-[#524234]/30 bg-[#171411]/6 p-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#741F20]" />
            <div className="text-xs">
              <p className="font-semibold text-[#241B14]">Phone</p>
              <a
                href={PROFILE_DATA.phoneHref}
                className="font-medium text-[#241B14] underline hover:text-[#741F20]"
              >
                {PROFILE_DATA.phonePlaceholder}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded border border-[#524234]/30 bg-[#171411]/6 p-3">
            <Code2 className="mt-0.5 h-4 w-4 shrink-0 text-[#741F20]" />
            <div className="text-xs">
              <p className="font-semibold text-[#241B14]">GitHub</p>
              <a
                href={PROFILE_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-[#241B14] underline hover:text-[#741F20]"
              >
                <span>{PROFILE_DATA.githubPlaceholder}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded border border-[#524234]/30 bg-[#171411]/6 p-3">
            <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-[#741F20]" />
            <div className="text-xs min-w-0">
              <p className="font-semibold text-[#241B14]">LinkedIn</p>
              <a
                href={PROFILE_DATA.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-[#241B14] underline hover:text-[#741F20]"
              >
                <span className="truncate">{PROFILE_DATA.linkedinPlaceholder}</span>
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#524234]/20 pt-3">
          <div className="flex items-center gap-2 text-xs text-[#524234]">
            <FileText className="h-4 w-4 text-[#741F20]" />
            <span>Download full resume ({PROFILE_DATA.resumePlaceholder})</span>
          </div>
          <a
            href={PROFILE_DATA.resumeUrl}
            download="Anwesha_Rudra_Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded border border-[#241B14] bg-[#241B14] px-3 py-1.5 text-xs font-medium text-[#E5D5B9] hover:bg-[#392C20]"
          >
            <Download className="h-3.5 w-3.5 text-[#CFA861]" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </ManuscriptCard>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-md border border-[#B18A45]/35 bg-[#171411]/80 p-5"
      >
        <div>
          <h3 className="font-display text-sm font-semibold tracking-[0.14em] uppercase text-[#CFA861]">
            Send a Raven
          </h3>
          <p className="mt-1 text-xs text-[#8C8274]">
            Compose a dispatch to open directly in your mail client addressed to{' '}
            {PROFILE_DATA.emailPlaceholder}.
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

      <NightsWatchWhisper />
    </div>
  )
}
