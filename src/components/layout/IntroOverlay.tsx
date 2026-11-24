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
      className="pointer-events-none fixed inset-0 z-20 flex flex-col items-center justify-end px-4 pb-4 md:items-start md:justify-center md:px-10 lg:px-16 md:pt-14"
    >
      <div
        ref={containerRef}
        className="pointer-events-auto w-full max-w-md rounded-lg border border-[#B18A45]/45 bg-[#171411]/78 p-4 text-center shadow-2xl backdrop-blur-sm sm:p-6 md:text-left"
      >
        {!isSceneReady && (
          <div className="mb-2.5 flex items-center justify-center gap-3 text-xs text-[#CFA861] md:justify-start">
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

        <div
          data-intro-reveal=""
          data-intro-eyebrow=""
          className="flex flex-col items-center gap-3 md:flex-row md:items-center"
        >
          <img
            src="/sovereign-portrait.jpg"
            alt="Anwesha Rudra — Sovereign Portrait"
            className="h-20 w-16 shrink-0 rounded border border-[#CFA861]/75 object-cover object-top shadow-lg"
          />
          <div>
            <p className="font-display text-[10px] tracking-[0.24em] uppercase text-[#B18A45] sm:text-xs">
              {PROFILE_DATA.ownerName} • {PROFILE_DATA.location}
            </p>

            <h1
              data-intro-reveal=""
              data-intro-title=""
              className="mt-1 font-display text-xl font-bold tracking-[0.11em] uppercase text-[#E5D5B9] sm:text-3xl"
            >
              {PROFILE_DATA.realmTitle}
            </h1>

            <p
              data-intro-reveal=""
              data-intro-tagline=""
              className="mt-1 font-editorial text-base italic text-[#CFA861] sm:text-lg"
            >
              {PROFILE_DATA.tagline}
            </p>
          </div>
        </div>

        <div
          data-intro-reveal=""
          data-intro-divider=""
          className="ornate-divider mx-auto my-3 max-w-xs md:mx-0"
        />

        <p
          data-intro-reveal=""
          data-intro-body=""
          className="hidden text-xs leading-relaxed text-[#E5D5B9]/90 sm:block sm:text-sm"
        >
          {PROFILE_DATA.summary}
        </p>
        <p
          data-intro-reveal=""
          data-intro-body=""
          className="text-xs leading-relaxed text-[#E5D5B9]/90 sm:hidden"
        >
          {PROFILE_DATA.targetRoles}
        </p>

        <div
          data-intro-reveal=""
          data-intro-actions=""
          className="mt-4 flex flex-wrap items-center justify-center gap-2 md:justify-start"
        >
          <RealmButton
            variant="primary"
            onClick={enterRealm}
            className="px-5 py-2 font-display text-xs tracking-[0.14em] uppercase sm:text-sm"
          >
            <span>Enter the Realm</span>
            <ChevronRight className="h-4 w-4 text-[#CFA861]" />
          </RealmButton>

          <RealmButton variant="secondary" onClick={skipIntro} className="text-xs">
            <SkipForward className="h-3.5 w-3.5 text-[#B18A45]" />
            <span>Skip Intro</span>
          </RealmButton>

          <RealmButton variant="ghost" onClick={openChronicle} className="text-xs">
            <ScrollText className="h-3.5 w-3.5 text-[#B18A45]" />
            <span>Reader View</span>
          </RealmButton>
        </div>
      </div>
    </section>
  )
}
