import { useEffect, useState } from 'react'

export type ViewportTier = 'mobile' | 'tablet' | 'desktop'

function getTier(width: number): ViewportTier {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

export function useViewport(): { width: number; tier: ViewportTier } {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1280,
  )

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { width, tier: getTier(width) }
}
