import { useEffect, useRef } from 'react'
import { useRealm } from '../context/realmContextCore'
import { realmAudioEngine } from '../utils/audioEngine'

export function useRealmAudioSync() {
  const { audioEnabled, isPanelOpen, scene, selectedId } = useRealm()
  const prevSceneRef = useRef(scene)
  const prevSelectedRef = useRef(selectedId)

  useEffect(() => {
    void realmAudioEngine.setEnabled(audioEnabled, isPanelOpen)
  }, [audioEnabled, isPanelOpen])

  useEffect(() => {
    if (!audioEnabled) {
      prevSceneRef.current = scene
      prevSelectedRef.current = selectedId
      return
    }

    if (prevSceneRef.current === 'intro' && scene === 'map') {
      realmAudioEngine.playInteractionChime('enter')
    } else if (prevSelectedRef.current !== selectedId) {
      realmAudioEngine.playInteractionChime(selectedId ? 'select' : 'close')
    }

    prevSceneRef.current = scene
    prevSelectedRef.current = selectedId
  }, [audioEnabled, scene, selectedId])
}
