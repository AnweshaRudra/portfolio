import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DESTINATIONS } from '../data/destinations'
import type { DestinationId, SceneMode } from '../data/types'
import { useSystemReducedMotion } from '../hooks/useReducedMotion'
import { RealmContext, type RealmContextValue } from './realmContextCore'

export function RealmProvider({ children }: { children: ReactNode }) {
  const systemReducedMotion = useSystemReducedMotion()

  const [scene, setScene] = useState<SceneMode>('intro')
  const [selectedId, setSelectedId] = useState<DestinationId | null>(null)
  const [hoveredId, setHoveredId] = useState<DestinationId | null>(null)
  const [focusedId, setFocusedId] = useState<DestinationId | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isNavDrawerOpen, setNavDrawerOpen] = useState(false)
  // Sound is strictly off by default until explicit user consent
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [manualReducedMotion, setManualReducedMotion] = useState<boolean | null>(null)
  const [isSceneReady, setIsSceneReady] = useState(false)

  const reducedMotion = manualReducedMotion ?? systemReducedMotion

  const enterRealm = useCallback(() => {
    setScene('map')
    setIsPanelOpen(false)
    setSelectedId(null)
  }, [])

  const skipIntro = useCallback(() => {
    setScene('map')
    setIsPanelOpen(false)
    setSelectedId(null)
  }, [])

  const replayIntro = useCallback(() => {
    setIsPanelOpen(false)
    setSelectedId(null)
    setNavDrawerOpen(false)
    setScene('intro')
  }, [])

  const selectDestination = useCallback((id: DestinationId) => {
    setScene('map')
    setSelectedId(id)
    setIsPanelOpen(true)
    setNavDrawerOpen(false)
  }, [])

  const closePanel = useCallback(() => {
    setIsPanelOpen(false)
    setSelectedId(null)
  }, [])

  const returnToMap = useCallback(() => {
    setScene('map')
    setIsPanelOpen(false)
    setSelectedId(null)
    setNavDrawerOpen(false)
  }, [])

  const toggleAudio = useCallback(() => {
    setAudioEnabled((prev) => !prev)
  }, [])

  const toggleReducedMotion = useCallback(() => {
    setManualReducedMotion((prev) => !(prev ?? systemReducedMotion))
  }, [systemReducedMotion])

  const markSceneReady = useCallback(() => {
    setIsSceneReady(true)
  }, [])

  // Support Escape key to close active content panels or nav drawer
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isPanelOpen) {
          closePanel()
        } else if (isNavDrawerOpen) {
          setNavDrawerOpen(false)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closePanel, isNavDrawerOpen, isPanelOpen])

  const selectedDestination = useMemo(
    () => DESTINATIONS.find((item) => item.id === selectedId) ?? null,
    [selectedId],
  )

  const value = useMemo<RealmContextValue>(
    () => ({
      scene,
      selectedId,
      selectedDestination,
      hoveredId,
      focusedId,
      isPanelOpen,
      isNavDrawerOpen,
      audioEnabled,
      reducedMotion,
      isSceneReady,
      enterRealm,
      skipIntro,
      replayIntro,
      selectDestination,
      closePanel,
      returnToMap,
      setHoveredId,
      setFocusedId,
      setNavDrawerOpen,
      toggleAudio,
      toggleReducedMotion,
      markSceneReady,
    }),
    [
      scene,
      selectedId,
      selectedDestination,
      hoveredId,
      focusedId,
      isPanelOpen,
      isNavDrawerOpen,
      audioEnabled,
      reducedMotion,
      isSceneReady,
      enterRealm,
      skipIntro,
      replayIntro,
      selectDestination,
      closePanel,
      returnToMap,
      toggleAudio,
      toggleReducedMotion,
      markSceneReady,
    ],
  )

  return <RealmContext.Provider value={value}>{children}</RealmContext.Provider>
}
