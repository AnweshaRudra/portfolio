import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { animateCameraToPose, INTRO_CAMERA_POSE } from '../animations/cameraTransitions'
import { useRealm } from '../context/realmContextCore'
import { MAP_OVERVIEW_CAMERA } from '../data/destinations'
import { useViewport } from '../hooks/useViewport'
import { isWebGLAvailable } from '../utils/webgl'
import { KingdomMapScene } from './KingdomMapScene'
import { RealmFallback2D } from './RealmFallback2D'
import { SceneErrorBoundary } from './SceneErrorBoundary'
import { ThroneIntroScene } from './ThroneIntroScene'

function CameraRig() {
  const { camera } = useThree()
  const { scene, selectedDestination, reducedMotion, markSceneReady } = useRealm()
  const lookAtTarget = useRef(new THREE.Vector3(...INTRO_CAMERA_POSE.target))
  const introOffsetRef = useRef(0)

  useEffect(() => {
    markSceneReady()
  }, [markSceneReady])

  useEffect(() => {
    if (scene === 'intro') {
      introOffsetRef.current = 0
      const tweens = animateCameraToPose(
        camera,
        lookAtTarget.current,
        INTRO_CAMERA_POSE,
        reducedMotion,
        0.9,
      )
      return () => {
        tweens.forEach((t) => t.kill())
      }
    }

    const pose = selectedDestination
      ? {
          position: selectedDestination.cameraPosition,
          target: selectedDestination.cameraTarget,
        }
      : MAP_OVERVIEW_CAMERA

    const tweens = animateCameraToPose(camera, lookAtTarget.current, pose, reducedMotion, 1.05)
    return () => {
      tweens.forEach((t) => t.kill())
    }
  }, [camera, reducedMotion, scene, selectedDestination])

  // Gentle restrained push-in during intro only when not reducedMotion
  useFrame((state, delta) => {
    if (scene !== 'intro' || reducedMotion) return
    if (introOffsetRef.current < 1.35) {
      introOffsetRef.current = Math.min(1.35, introOffsetRef.current + delta * 0.2)
      state.camera.position.z = INTRO_CAMERA_POSE.position[2] - introOffsetRef.current
      state.camera.lookAt(lookAtTarget.current)
    }
  })

  return scene === 'map' && !selectedDestination ? (
    <OrbitControls
      enablePan={false}
      enableZoom={!reducedMotion}
      minDistance={7}
      maxDistance={17}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.4}
      target={MAP_OVERVIEW_CAMERA.target}
    />
  ) : null
}

export function RealmWorldCanvas() {
  const { scene } = useRealm()
  const { tier } = useViewport()
  const webglSupported = useMemo(() => isWebGLAvailable(), [])

  if (!webglSupported) {
    return <RealmFallback2D reason="WebGL is unavailable in this browser; displaying the 2D tactical map." />
  }

  const dpr: [number, number] = tier === 'mobile' ? [1, 1.35] : [1, 2]

  return (
    <SceneErrorBoundary
      fallback={
        <RealmFallback2D reason="3D rendering encountered an error; displaying the accessible 2D realm map." />
      }
    >
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-[#171411] text-[#E5D5B9]">
              <p className="font-display text-sm tracking-[0.2em] uppercase text-[#B18A45]">
                Preparing the Realm…
              </p>
            </div>
          }
        >
          <Canvas
            shadows={tier !== 'mobile'}
            dpr={dpr}
            camera={{ position: INTRO_CAMERA_POSE.position, fov: 46, near: 0.1, far: 100 }}
            gl={{ antialias: tier !== 'mobile', powerPreference: 'high-performance' }}
          >
            <color attach="background" args={['#171411']} />
            <fog attach="fog" args={['#171411', 14, 34]} />
            <CameraRig />
            {scene === 'intro' ? <ThroneIntroScene /> : <KingdomMapScene />}
          </Canvas>
        </Suspense>
      </div>
    </SceneErrorBoundary>
  )
}
