import { useEffect, useRef } from 'react'
import { useRealm } from '../context/realmContextCore'
import { realmAudioEngine } from '../utils/audioEngine'

export function useRealmAudioSync() {
  const { audioEnabled, isPanelOpen, scene, selectedId, hoveredId } = useRealm()
  const prevSceneRef = useRef(scene)
  const prevSelectedRef = useRef(selectedId)
  const prevHoveredRef = useRef(hoveredId)

  useEffect(() => {
    void realmAudioEngine.setEnabled(audioEnabled, isPanelOpen || scene === 'chronicle')
    realmAudioEngine.setSceneAtmosphere(scene)
  }, [audioEnabled, isPanelOpen, scene])

  useEffect(() => {
    if (!audioEnabled) {
      prevSceneRef.current = scene
      prevSelectedRef.current = selectedId
      prevHoveredRef.current = hoveredId
      return
    }

    if (prevSceneRef.current === 'intro' && scene === 'map') {
      realmAudioEngine.playInteractionChime('enter')
    } else if (prevSelectedRef.current !== selectedId) {
      realmAudioEngine.playInteractionChime(selectedId ? 'select' : 'close')
    } else if (hoveredId && prevHoveredRef.current !== hoveredId) {
      realmAudioEngine.playInteractionChime('hover')
    }

    prevSceneRef.current = scene
    prevSelectedRef.current = selectedId
    prevHoveredRef.current = hoveredId
  }, [audioEnabled, hoveredId, scene, selectedId])
}
