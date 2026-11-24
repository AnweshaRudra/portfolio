import { createContext, useContext } from 'react'
import type { DestinationId, DestinationInfo, SceneMode } from '../data/types'

export interface RealmContextValue {
  scene: SceneMode
  selectedId: DestinationId | null
  selectedDestination: DestinationInfo | null
  hoveredId: DestinationId | null
  focusedId: DestinationId | null
  isPanelOpen: boolean
  isNavDrawerOpen: boolean
  audioEnabled: boolean
  reducedMotion: boolean
  isSceneReady: boolean
  enterRealm: () => void
  skipIntro: () => void
  replayIntro: () => void
  selectDestination: (id: DestinationId) => void
  closePanel: () => void
  returnToMap: () => void
  setHoveredId: (id: DestinationId | null) => void
  setFocusedId: (id: DestinationId | null) => void
  setNavDrawerOpen: (open: boolean) => void
  toggleAudio: () => void
  toggleReducedMotion: () => void
  markSceneReady: () => void
}

export const RealmContext = createContext<RealmContextValue | null>(null)

export function useRealm(): RealmContextValue {
  const ctx = useContext(RealmContext)
  if (!ctx) {
    throw new Error('useRealm must be used inside RealmProvider')
  }
  return ctx
}
