import { Volume2, VolumeX } from 'lucide-react'
import { useRealm } from '../../context/realmContextCore'

export function AudioToggle() {
  const { audioEnabled, toggleAudio } = useRealm()

  return (
    <button
      type="button"
      onClick={toggleAudio}
      aria-pressed={audioEnabled}
      aria-label={audioEnabled ? 'Mute realm audio' : 'Enable realm audio (off by default)'}
      title={audioEnabled ? 'Audio enabled (ambient synthesis arrives in Milestone 5)' : 'Audio off'}
      className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
        audioEnabled
          ? 'border-[#CFA861] bg-[#392C20] text-[#CFA861]'
          : 'border-[#B18A45]/40 bg-[#171411]/85 text-[#8C8274] hover:border-[#B18A45] hover:text-[#E5D5B9]'
      }`}
    >
      {audioEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
      <span className="hidden sm:inline">{audioEnabled ? 'Sound On' : 'Sound Off'}</span>
    </button>
  )
}
