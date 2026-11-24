import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ChevronRight, ScrollText, SkipForward } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useRealm } from '../../context/realmContextCore'
import { PROFILE_DATA } from '../../data/profile'
import { RealmButton } from '../ui/RealmButton'

gsap.registerPlugin(useGSAP)

export function IntroOverlay() {
  const { scene, isSceneReady, reducedMotion, enterRealm, skipIntro, openChronicle } =
    useRealm()
  const [showSlowSkip, setShowSlowSkip] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSceneReady) return
    const timer = window.setTimeout(() => setShowSlowSkip(true), 800)
    return () => window.clearTimeout(timer)
  }, [isSceneReady])

  useGSAP(
    () => {
      if (scene !== 'intro' || !containerRef.current) return

      if (reducedMotion) {
        gsap.set('[data-intro-reveal]', { opacity: 1, y: 0, scaleX: 1 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        '[data-intro-eyebrow]',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45 },
      )
        .fromTo(
          '[data-intro-title]',
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.22',
        )
        .fromTo(
          '[data-intro-tagline]',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45 },
          '-=0.3',
        )
        .fromTo(
          '[data-intro-divider]',
          { opacity: 0, scaleX: 0.25 },
          { opacity: 1, scaleX: 1, duration: 0.45 },
          '-=0.25',
        )
        .fromTo(
          '[data-intro-body]',
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.45 },
          '-=0.2',
        )
        .fromTo(
          '[data-intro-actions]',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45 },
          '-=0.22',
        )
    },
    { scope: containerRef, dependencies: [scene, reducedMotion] },
  )

  if (scene !== 'intro') return null

  return (
    <section
      aria-label="The Sovereign Throne Introduction"
      className="pointer-events-none fixed inset-0 z-20 flex flex-col items-center justify-end px-4 pb-6 sm:pb-12"
    >
      <div
        ref={containerRef}
        className="pointer-events-auto w-full max-w-2xl rounded-lg border border-[#B18A45]/45 bg-[#171411]/82 p-5 text-center shadow-2xl backdrop-blur-sm sm:p-7"
      >
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

        <p
          data-intro-reveal=""
          data-intro-eyebrow=""
          className="font-display text-[11px] tracking-[0.26em] uppercase text-[#B18A45] sm:text-xs"
        >
          {PROFILE_DATA.ownerName} • {PROFILE_DATA.location}
        </p>

        <h1
          data-intro-reveal=""
          data-intro-title=""
          className="mt-2 font-display text-2xl font-bold tracking-[0.12em] uppercase text-[#E5D5B9] sm:text-4xl"
        >
          {PROFILE_DATA.realmTitle}
        </h1>

        <p
          data-intro-reveal=""
          data-intro-tagline=""
          className="mt-1.5 font-editorial text-lg italic text-[#CFA861] sm:text-xl"
        >
          {PROFILE_DATA.tagline}
        </p>

        <div
          data-intro-reveal=""
          data-intro-divider=""
          className="ornate-divider mx-auto my-3.5 max-w-xs"
        />

        <p
          data-intro-reveal=""
          data-intro-body=""
          className="mx-auto max-w-xl text-xs leading-relaxed text-[#E5D5B9]/90 sm:text-sm"
        >
          {PROFILE_DATA.summary}
        </p>

        <div
          data-intro-reveal=""
          data-intro-actions=""
          className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        >
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

          <RealmButton variant="ghost" onClick={openChronicle} className="text-xs">
            <ScrollText className="h-3.5 w-3.5 text-[#B18A45]" />
            <span>Read Full Chronicle (No 3D)</span>
          </RealmButton>
        </div>
      </div>
    </section>
  )
}
