import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DESTINATIONS } from '../data/destinations'
import type { DestinationId, SceneMode } from '../data/types'
import { useSystemReducedMotion } from '../hooks/useReducedMotion'
import { RealmContext, type MapZoomCommand, type RealmContextValue } from './realmContextCore'

export function RealmProvider({ children }: { children: ReactNode }) {
  const systemReducedMotion = useSystemReducedMotion()

  const [scene, setScene] = useState<SceneMode>('intro')
  const [selectedId, setSelectedId] = useState<DestinationId | null>(null)
  const [hoveredId, setHoveredId] = useState<DestinationId | null>(null)
  const [focusedId, setFocusedId] = useState<DestinationId | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isNavDrawerOpen, setNavDrawerOpen] = useState(false)
  const [isResumeOpen, setResumeOpen] = useState(false)
  // Sound is strictly off by default until explicit user consent
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [manualReducedMotion, setManualReducedMotion] = useState<boolean | null>(null)
  const [isSceneReady, setIsSceneReady] = useState(false)
  const [compassAngleDeg, setCompassAngleDeg] = useState(0)
  const [mapResetNonce, setMapResetNonce] = useState(0)
  const [mapZoomCommand, setMapZoomCommand] = useState<MapZoomCommand | null>(null)

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
    setResumeOpen(false)
    setScene('intro')
  }, [])

  const openChronicle = useCallback(() => {
    setIsPanelOpen(false)
    setSelectedId(null)
    setNavDrawerOpen(false)
    setScene('chronicle')
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

  const resetMapView = useCallback(() => {
    setIsPanelOpen(false)
    setSelectedId(null)
    setMapResetNonce((n) => n + 1)
  }, [])

  const zoomMap = useCallback((direction: 'in' | 'out') => {
    setMapZoomCommand((prev) => ({
      direction,
      nonce: (prev?.nonce ?? 0) + 1,
    }))
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

  // Support Escape key to close active modals, content panels, or nav drawer
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isResumeOpen) {
          setResumeOpen(false)
        } else if (isPanelOpen) {
          closePanel()
        } else if (isNavDrawerOpen) {
          setNavDrawerOpen(false)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closePanel, isNavDrawerOpen, isPanelOpen, isResumeOpen])

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
      isResumeOpen,
      audioEnabled,
      reducedMotion,
      isSceneReady,
      compassAngleDeg,
      mapResetNonce,
      mapZoomCommand,
      enterRealm,
      skipIntro,
      replayIntro,
      openChronicle,
      selectDestination,
      closePanel,
      returnToMap,
      resetMapView,
      zoomMap,
      setCompassAngleDeg,
      setHoveredId,
      setFocusedId,
      setNavDrawerOpen,
      setResumeOpen,
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
      isResumeOpen,
      audioEnabled,
      reducedMotion,
      isSceneReady,
      compassAngleDeg,
      mapResetNonce,
      mapZoomCommand,
      enterRealm,
      skipIntro,
      replayIntro,
      openChronicle,
      selectDestination,
      closePanel,
      returnToMap,
      resetMapView,
      zoomMap,
      toggleAudio,
      toggleReducedMotion,
      markSceneReady,
    ],
  )

  return <RealmContext.Provider value={value}>{children}</RealmContext.Provider>
}
