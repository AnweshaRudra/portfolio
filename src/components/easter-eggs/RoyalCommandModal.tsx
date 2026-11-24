import { Terminal, X } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { useRealm } from '../../context/realmContextCore'
import { DESTINATIONS } from '../../data/destinations'
import { PROFILE_DATA } from '../../data/profile'
import { realmAudioEngine } from '../../utils/audioEngine'

const INITIAL_LOG = [
  'ROYAL COMMAND CONSOLE — THE REALM OF ANWESHA',
  'Type a command: whoami | realms | stack | shortcuts | clear',
]

export function RoyalCommandModal() {
  const { audioEnabled, selectDestination, openChronicle, resetMapView } = useRealm()
  const [isOpen, setIsOpen] = useState(false)
  const [commandInput, setCommandInput] = useState('')
  const [logs, setLogs] = useState<string[]>(INITIAL_LOG)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const isTypingField =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsOpen((prev) => {
          const next = !prev
          if (next && audioEnabled) {
            realmAudioEngine.playInteractionChime('easterEgg')
          }
          return next
        })
        return
      }

      if (!isTypingField && event.key === '?' && event.shiftKey) {
        event.preventDefault()
        setIsOpen(true)
        if (audioEnabled) {
          realmAudioEngine.playInteractionChime('easterEgg')
        }
        return
      }

      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [audioEnabled, isOpen])

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    if (cmd === 'clear') {
      setLogs(INITIAL_LOG)
      return
    }

    if (cmd === 'close' || cmd === 'exit') {
      setIsOpen(false)
      return
    }

    let response = `Unknown decree "${cmd}". Try: whoami, realms, stack, shortcuts, clear`

    if (cmd === 'whoami') {
      response = `${PROFILE_DATA.ownerName} — ${PROFILE_DATA.location}. ${PROFILE_DATA.targetRoles}`
    } else if (cmd === 'realms') {
      response = DESTINATIONS.map((d) => `${d.realmName} (${d.portfolioTitle})`).join(' • ')
    } else if (cmd === 'stack') {
      response =
        'Frontend/3D: React 19, Vite, TypeScript, Three.js, R3F, Drei, GSAP, Motion, Tailwind CSS • Resume Core: Python, Java, SQL, pandas, scikit-learn, FastAPI, React Native.'
    } else if (cmd === 'shortcuts') {
      response =
        'Ctrl/Cmd+K or ?: Royal Command • Esc: Close active panel • Tab/Enter: Navigate landmarks.'
    }

    setLogs((prev) => [...prev, `> ${cmd}`, response])
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    runCommand(commandInput)
    setCommandInput('')
  }

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Royal Command Terminal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-xl rounded-lg border border-[#CFA861]/70 bg-[#171411] p-4 font-mono text-xs text-[#E5D5B9] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#B18A45]/30 pb-2.5">
          <div className="flex items-center gap-2 text-[#CFA861]">
            <Terminal className="h-4 w-4" />
            <span className="font-display text-xs tracking-[0.16em] uppercase">
              Royal Command (Ctrl+K)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close Royal Command terminal"
            className="rounded border border-[#B18A45]/35 p-1 text-[#8C8274] hover:text-[#E5D5B9] cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="realm-scroll mt-3 max-h-48 space-y-1.5 overflow-y-auto rounded border border-[#B18A45]/20 bg-[#0f0d0b] p-3 leading-relaxed">
          {logs.map((line, index) => (
            <p
              key={index}
              className={line.startsWith('>') ? 'text-[#CFA861]' : 'text-[#E5D5B9]/90'}
            >
              {line}
            </p>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Enter command (whoami, stack, realms, shortcuts)..."
            autoFocus
            aria-label="Royal Command input"
            className="flex-1 rounded border border-[#B18A45]/40 bg-[#211C17] px-3 py-1.5 text-xs text-[#E5D5B9] placeholder:text-[#8C8274]"
          />
          <button
            type="submit"
            className="rounded border border-[#CFA861] bg-[#392C20] px-3 py-1.5 text-xs font-medium text-[#CFA861] hover:bg-[#4b3a2b] cursor-pointer"
          >
            Run
          </button>
        </form>

        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-[#B18A45]/20 pt-2.5">
          <span className="text-[10px] uppercase tracking-wider text-[#8C8274]">Quick Jump:</span>
          {DESTINATIONS.map((dest) => (
            <button
              key={dest.id}
              type="button"
              onClick={() => {
                selectDestination(dest.id)
                setIsOpen(false)
              }}
              className="rounded border border-[#B18A45]/30 px-2 py-0.5 text-[10px] text-[#E5D5B9] hover:border-[#CFA861] hover:text-[#CFA861] cursor-pointer"
            >
              {dest.realmName}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              openChronicle()
              setIsOpen(false)
            }}
            className="rounded border border-[#B18A45]/30 px-2 py-0.5 text-[10px] text-[#CFA861] hover:border-[#CFA861] cursor-pointer"
          >
            Reader View
          </button>
          <button
            type="button"
            onClick={() => {
              resetMapView()
              setIsOpen(false)
            }}
            className="rounded border border-[#B18A45]/30 px-2 py-0.5 text-[10px] text-[#8C8274] hover:text-[#E5D5B9] cursor-pointer"
          >
            Reset Map
          </button>
        </div>
      </div>
    </div>
  )
}
