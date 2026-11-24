import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { animateCameraToPose, INTRO_CAMERA_POSE } from '../animations/cameraTransitions'
import { useRealm } from '../context/realmContextCore'
import { MAP_OVERVIEW_CAMERA } from '../data/destinations'
import { useViewport } from '../hooks/useViewport'
import { isWebGLAvailable } from '../utils/webgl'
import { KingdomMapScene } from './KingdomMapScene'
import { RealmFallback2D } from './RealmFallback2D'
import { SceneErrorBoundary } from './SceneErrorBoundary'
import { ThroneIntroScene } from './ThroneIntroScene'

function CameraRig({ isMobile }: { isMobile: boolean }) {
  const { camera, invalidate } = useThree()
  const {
    scene,
    selectedDestination,
    reducedMotion,
    mapResetNonce,
    mapZoomCommand,
    setCompassAngleDeg,
    markSceneReady,
  } = useRealm()

  const lookAtTarget = useRef(new THREE.Vector3(...INTRO_CAMERA_POSE.target))
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const introOffsetRef = useRef(0)
  const lastCompassDegRef = useRef(0)

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
        invalidate,
      )
      return () => {
        tweens.forEach((t) => t.kill())
      }
    }

    const overviewPose = isMobile
      ? {
          position: [0, 13.6, 14.6] as [number, number, number],
          target: MAP_OVERVIEW_CAMERA.target,
        }
      : MAP_OVERVIEW_CAMERA

    const pose = selectedDestination
      ? {
          position: selectedDestination.cameraPosition,
          target: selectedDestination.cameraTarget,
        }
      : overviewPose

    const tweens = animateCameraToPose(
      camera,
      lookAtTarget.current,
      pose,
      reducedMotion,
      1.05,
      invalidate,
    )
    if (controlsRef.current) {
      controlsRef.current.target.set(...pose.target)
      controlsRef.current.update()
    }
    return () => {
      tweens.forEach((t) => t.kill())
    }
  }, [camera, invalidate, isMobile, mapResetNonce, reducedMotion, scene, selectedDestination])

  // Handle explicit +/- zoom buttons from Map HUD
  useEffect(() => {
    if (!mapZoomCommand || scene !== 'map' || selectedDestination) return
    const target = controlsRef.current?.target ?? lookAtTarget.current
    const offset = camera.position.clone().sub(target)
    const currentDist = offset.length()
    const nextDist = THREE.MathUtils.clamp(
      mapZoomCommand.direction === 'in' ? currentDist * 0.82 : currentDist * 1.22,
      7.5,
      20,
    )
    offset.setLength(nextDist)
    const nextPos = target.clone().add(offset)
    animateCameraToPose(
      camera,
      lookAtTarget.current,
      {
        position: [nextPos.x, nextPos.y, nextPos.z],
        target: [target.x, target.y, target.z],
      },
      reducedMotion,
      0.35,
      invalidate,
    )
  }, [camera, invalidate, mapZoomCommand, reducedMotion, scene, selectedDestination])

  // Gentle restrained intro push-in & live compass azimuth sync
  useFrame((state, delta) => {
    if (scene === 'intro' && !reducedMotion && introOffsetRef.current < 1.2) {
      introOffsetRef.current = Math.min(1.2, introOffsetRef.current + delta * 0.16)
      state.camera.position.z = INTRO_CAMERA_POSE.position[2] - introOffsetRef.current
      state.camera.lookAt(lookAtTarget.current)
    }

    if (scene === 'map' && controlsRef.current) {
      const deg = Math.round(THREE.MathUtils.radToDeg(controlsRef.current.getAzimuthalAngle()))
      if (Math.abs(deg - lastCompassDegRef.current) >= 1) {
        lastCompassDegRef.current = deg
        setCompassAngleDeg(deg)
      }
    }
  })

  return scene === 'map' && !selectedDestination ? (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping={!reducedMotion}
      dampingFactor={0.07}
      enableZoom={!reducedMotion}
      minDistance={7.5}
      maxDistance={20}
      minPolarAngle={Math.PI / 5.5}
      maxPolarAngle={Math.PI / 2.45}
      minAzimuthAngle={-Math.PI / 3}
      maxAzimuthAngle={Math.PI / 3}
      target={MAP_OVERVIEW_CAMERA.target}
    />
  ) : null
}

export function RealmWorldCanvas() {
  const { scene, reducedMotion } = useRealm()
  const { tier } = useViewport()
  const isMobile = tier === 'mobile'
  const webglSupported = useMemo(() => isWebGLAvailable(), [])

  if (scene === 'chronicle') {
    return null
  }

  if (!webglSupported) {
    return (
      <RealmFallback2D reason="WebGL is unavailable in this browser; displaying the 2D tactical map." />
    )
  }

  const dpr: [number, number] = isMobile ? [1, 1.35] : [1, 2]

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
            frameloop={reducedMotion ? 'demand' : 'always'}
            shadows={!isMobile}
            dpr={dpr}
            camera={{ position: INTRO_CAMERA_POSE.position, fov: 46, near: 0.1, far: 100 }}
            gl={{ antialias: !isMobile, powerPreference: 'high-performance' }}
          >
            <color attach="background" args={['#171411']} />
            <fog attach="fog" args={['#171411', 15, 36]} />
            <CameraRig isMobile={isMobile} />
            {scene === 'intro' ? <ThroneIntroScene /> : <KingdomMapScene />}
          </Canvas>
        </Suspense>
      </div>
    </SceneErrorBoundary>
  )
}

export default RealmWorldCanvas
