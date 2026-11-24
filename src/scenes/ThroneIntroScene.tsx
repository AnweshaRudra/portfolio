import { Sparkles, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useRealm } from '../context/realmContextCore'
import { useViewport } from '../hooks/useViewport'

const THRONE_MODEL_PATH = '/models/sovereign-throne.glb'

const PILLAR_X_POSITIONS = [-4.4, 4.4] as const
const PILLAR_Z_POSITIONS_DESKTOP = [-4.8, -1.8, 1.2, 4.2] as const
const PILLAR_Z_POSITIONS_MOBILE = [-4.4, 0.2] as const
const LANCET_WINDOWS = [-2.8, 0, 2.8] as const

function SovereignThroneModel({ castShadows }: { castShadows: boolean }) {
  const gltf = useGLTF(THRONE_MODEL_PATH)
  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true)
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = castShadows
        mesh.receiveShadow = true
      }
    })
    return clone
  }, [castShadows, gltf.scene])

  return <primitive object={clonedScene} position={[0, 0, -2.85]} />
}

function ThroneFallbackSilhouette() {
  return (
    <group position={[0, 0.4, -2.85]}>
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[1.3, 2.2, 1.0]} />
        <meshStandardMaterial color="#2a2420" roughness={0.7} metalness={0.5} />
      </mesh>
    </group>
  )
}

export function ThroneIntroScene() {
  const { reducedMotion, markSceneReady } = useRealm()
  const { tier } = useViewport()
  const isMobile = tier === 'mobile'

  const leftBrazierLightRef = useRef<THREE.PointLight>(null)
  const rightBrazierLightRef = useRef<THREE.PointLight>(null)
  const crestSpotRef = useRef<THREE.PointLight>(null)

  useEffect(() => {
    markSceneReady()
  }, [markSceneReady])

  useFrame(({ clock }) => {
    if (reducedMotion) return
    const t = clock.getElapsedTime()
    if (leftBrazierLightRef.current) {
      leftBrazierLightRef.current.intensity = 11 + Math.sin(t * 3.1) * 1.2 + Math.cos(t * 6.4) * 0.5
    }
    if (rightBrazierLightRef.current) {
      rightBrazierLightRef.current.intensity =
        11 + Math.cos(t * 2.9 + 1.1) * 1.2 + Math.sin(t * 5.7) * 0.5
    }
    if (crestSpotRef.current) {
      crestSpotRef.current.intensity = 10 + Math.sin(t * 1.4) * 0.6
    }
  })

  const pillarZs = isMobile ? PILLAR_Z_POSITIONS_MOBILE : PILLAR_Z_POSITIONS_DESKTOP

  return (
    <group name="throne-intro-cinematic">
      {/* Subtle cool ambient fill */}
      <ambientLight intensity={0.28} color="#8e9aad" />

      {/* High cool moonlight key from upper rear */}
      <directionalLight
        position={[-3.5, 9.5, -6.5]}
        intensity={1.15}
        color="#8aa8cc"
        castShadow={!isMobile}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={24}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* Warm throne crown accent light */}
      <pointLight
        ref={crestSpotRef}
        position={[0, 4.4, -1.6]}
        intensity={10}
        distance={14}
        decay={2}
        color="#d99a4e"
      />

      {/* Left & right brazier warm practical lights */}
      <pointLight
        ref={leftBrazierLightRef}
        position={[-1.95, 1.55, -2.1]}
        intensity={11}
        distance={12}
        decay={2}
        color="#e28436"
      />
      <pointLight
        ref={rightBrazierLightRef}
        position={[1.95, 1.55, -2.1]}
        intensity={11}
        distance={12}
        decay={2}
        color="#e28436"
      />

      {/* Great Hall flagstone floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#191512" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Subtle carved floor border inlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008, 1.2]} receiveShadow>
        <planeGeometry args={[2.55, 12.2]} />
        <meshStandardMaterial color="#705832" roughness={0.65} metalness={0.45} />
      </mesh>

      {/* Crimson royal aisle runner */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.014, 1.2]} receiveShadow>
        <planeGeometry args={[2.2, 12]} />
        <meshStandardMaterial color="#4e1718" roughness={0.88} />
      </mesh>

      {/* Rear Gothic Sanctuary Wall */}
      <mesh position={[0, 4.2, -6.5]} receiveShadow>
        <boxGeometry args={[18, 8.6, 0.9]} />
        <meshStandardMaterial color="#201a15" roughness={0.95} />
      </mesh>

      {/* Moonlit Lancet Windows & Affordable Light Shafts */}
      {LANCET_WINDOWS.map((xPos) => (
        <group key={xPos} position={[xPos, 4.2, -5.98]}>
          <mesh>
            <planeGeometry args={[0.72, 3.6]} />
            <meshBasicMaterial color="#617fa3" transparent opacity={0.35} />
          </mesh>
          <mesh position={[0, 1.8, 0]}>
            <circleGeometry args={[0.36, 16, 0, Math.PI]} />
            <meshBasicMaterial color="#617fa3" transparent opacity={0.35} />
          </mesh>
          {!isMobile && (
            <mesh position={[0, -1.6, 2.3]} rotation={[0.68, 0, 0]}>
              <coneGeometry args={[1.15, 5.4, 12, 1, true]} />
              <meshBasicMaterial
                color="#708eb3"
                transparent
                opacity={0.045}
                depthWrite={false}
                side={THREE.DoubleSide}
              />
            </mesh>
          )}
        </group>
      ))}

      {/* Custom Sculpted Sovereign Throne GLB */}
      <Suspense fallback={<ThroneFallbackSilhouette />}>
        <SovereignThroneModel castShadows={!isMobile} />
      </Suspense>

      {/* Fluted Stone Colonnade Pillars & Overhead Vault Beams */}
      {PILLAR_X_POSITIONS.map((x) =>
        pillarZs.map((z) => (
          <group key={`${x}-${z}`} position={[x, 0, z]}>
            <mesh position={[0, 0.22, 0]} receiveShadow>
              <boxGeometry args={[1.18, 0.44, 1.18]} />
              <meshStandardMaterial color="#2d251e" roughness={0.9} />
            </mesh>
            <mesh position={[0, 3.4, 0]} castShadow={!isMobile} receiveShadow>
              <cylinderGeometry args={[0.38, 0.44, 6.2, 10]} />
              <meshStandardMaterial color="#27201a" roughness={0.92} />
            </mesh>
            <mesh position={[0, 6.65, 0]}>
              <boxGeometry args={[1.15, 0.36, 1.15]} />
              <meshStandardMaterial color="#322921" roughness={0.88} />
            </mesh>
          </group>
        )),
      )}

      {!isMobile &&
        pillarZs.map((z) => (
          <mesh key={`beam-${z}`} position={[0, 6.9, z]}>
            <boxGeometry args={[9.8, 0.38, 0.55]} />
            <meshStandardMaterial color="#1f1914" roughness={0.94} />
          </mesh>
        ))}

      {/* Subtle embers and dust motes */}
      {!reducedMotion && (
        <>
          <Sparkles
            count={isMobile ? 16 : 44}
            scale={[9, 5.2, 9]}
            position={[0, 2.5, -1.2]}
            size={isMobile ? 1.8 : 2.3}
            speed={0.22}
            opacity={0.48}
            color="#d89b48"
          />
          {!isMobile && (
            <Sparkles
              count={22}
              scale={[5.5, 3.2, 3.2]}
              position={[0, 2.2, -2.2]}
              size={1.5}
              speed={0.45}
              opacity={0.62}
              color="#f28d35"
            />
          )}
        </>
      )}
    </group>
  )
}

useGLTF.preload(THRONE_MODEL_PATH)
