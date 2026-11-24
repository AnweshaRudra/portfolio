import { ChevronRight, SkipForward } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRealm } from '../../context/realmContextCore'
import { PROFILE_DATA } from '../../data/profile'
import { RealmButton } from '../ui/RealmButton'

export function IntroOverlay() {
  const { scene, isSceneReady, enterRealm, skipIntro, selectDestination } = useRealm()
  const [showSlowSkip, setShowSlowSkip] = useState(false)

  useEffect(() => {
    if (isSceneReady) return
    const timer = window.setTimeout(() => setShowSlowSkip(true), 800)
    return () => window.clearTimeout(timer)
  }, [isSceneReady])

  if (scene !== 'intro') return null

  return (
    <section
      aria-label="The Iron Throne Introduction"
      className="pointer-events-none fixed inset-0 z-20 flex flex-col items-center justify-end px-4 pb-10 sm:pb-16"
    >
      <div className="pointer-events-auto w-full max-w-2xl rounded-lg border border-[#B18A45]/45 bg-[#171411]/82 p-6 text-center shadow-2xl backdrop-blur-sm sm:p-8">
        {!isSceneReady && (
          <div className="mb-3 flex items-center justify-center gap-3 text-xs text-[#CFA861]">
            <span className="font-display tracking-widest uppercase">
              Forging the Throne Room…
            </span>
            {showSlowSkip && (
              <button
                type="button"
                onClick={skipIntro}
                className="underline underline-offset-4 hover:text-[#E5D5B9] cursor-pointer"
              >
                Skip to map
              </button>
            )}
          </div>
        )}

        <p className="font-display text-xs tracking-[0.28em] uppercase text-[#B18A45]">
          {PROFILE_DATA.ownerName} • {PROFILE_DATA.location}
        </p>

        <h1 className="mt-2 font-display text-2xl font-bold tracking-[0.12em] uppercase text-[#E5D5B9] sm:text-4xl">
          {PROFILE_DATA.realmTitle}
        </h1>

        <p className="mt-2 font-editorial text-lg italic text-[#CFA861] sm:text-xl">
          {PROFILE_DATA.tagline}
        </p>

        <div className="ornate-divider mx-auto my-4 max-w-xs" />

        <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#E5D5B9]/90">
          {PROFILE_DATA.summary}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <RealmButton
            variant="primary"
            onClick={enterRealm}
            className="px-6 py-2.5 font-display tracking-[0.14em] uppercase"
          >
            <span>Enter the Realm</span>
            <ChevronRight className="h-4 w-4 text-[#CFA861]" />
          </RealmButton>

          <RealmButton variant="secondary" onClick={skipIntro}>
            <SkipForward className="h-4 w-4 text-[#B18A45]" />
            <span>Skip Intro</span>
          </RealmButton>

          <RealmButton
            variant="ghost"
            onClick={() => selectDestination('kings-landing')}
            className="text-xs"
          >
            Explore Projects Directly
          </RealmButton>
        </div>
      </div>
    </section>
  )
}
