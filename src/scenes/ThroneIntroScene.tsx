import { Sparkles, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useRealm } from '../context/realmContextCore'
import { useViewport } from '../hooks/useViewport'
import { createEllipticalVignetteAlphaMap } from '../utils/portraitCutout'

const THRONE_MODEL_PATH = '/models/sovereign-throne.glb'
const SOVEREIGN_PORTRAIT_PATH = '/sovereign-portrait.jpg'

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

function SeatedSovereignFigure() {
  const { invalidate } = useThree()
  const [textures, setTextures] = useState<{
    map: THREE.Texture
    alphaMap: THREE.CanvasTexture
  } | null>(null)

  useEffect(() => {
    let active = true
    const loader = new THREE.TextureLoader()
    let loadedTex: THREE.Texture | null = null
    let alphaTex: THREE.CanvasTexture | null = null

    loader.load(
      SOVEREIGN_PORTRAIT_PATH,
      (tex) => {
        if (!active) {
          tex.dispose()
          return
        }
        tex.colorSpace = THREE.SRGBColorSpace
        tex.needsUpdate = true
        alphaTex = createEllipticalVignetteAlphaMap(512)
        loadedTex = tex
        setTextures({ map: tex, alphaMap: alphaTex })
        invalidate()
      },
      undefined,
      () => {
        // Fallback to empty throne if portrait is missing
      },
    )

    return () => {
      active = false
      loadedTex?.dispose()
      alphaTex?.dispose()
    }
  }, [invalidate])

  if (!textures) return null

  return (
    <group position={[0, 2.08, -2.22]}>
      {/* Warm dedicated fill light illuminating the seated portrait */}
      <pointLight position={[0, 0.3, 1.4]} intensity={4} distance={5} color="#ffdba8" />
      <mesh>
        <planeGeometry args={[1.76, 2.34]} />
        <meshBasicMaterial
          map={textures.map}
          alphaMap={textures.alphaMap}
          transparent
          depthWrite={false}
          color="#f7ebd8"
          side={THREE.DoubleSide}
        />
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
  const leftFlameRef = useRef<THREE.Mesh>(null)
  const rightFlameRef = useRef<THREE.Mesh>(null)
  const crestSpotRef = useRef<THREE.PointLight>(null)
  const leftBannerRef = useRef<THREE.Mesh>(null)
  const rightBannerRef = useRef<THREE.Mesh>(null)

  useEffect(() => {
    markSceneReady()
  }, [markSceneReady])

  useFrame(({ clock }) => {
    if (reducedMotion) return
    const t = clock.getElapsedTime()
    if (leftBrazierLightRef.current) {
      leftBrazierLightRef.current.intensity = 13 + Math.sin(t * 3.1) * 1.4 + Math.cos(t * 6.4) * 0.6
    }
    if (rightBrazierLightRef.current) {
      rightBrazierLightRef.current.intensity =
        13 + Math.cos(t * 2.9 + 1.1) * 1.4 + Math.sin(t * 5.7) * 0.6
    }
    if (leftFlameRef.current) {
      leftFlameRef.current.scale.set(
        1 + Math.sin(t * 7.2) * 0.09,
        1 + Math.cos(t * 9.5) * 0.16,
        1 + Math.sin(t * 6.4) * 0.09,
      )
    }
    if (rightFlameRef.current) {
      rightFlameRef.current.scale.set(
        1 + Math.cos(t * 6.8) * 0.09,
        1 + Math.sin(t * 9.1) * 0.16,
        1 + Math.cos(t * 6.1) * 0.09,
      )
    }
    if (crestSpotRef.current) {
      crestSpotRef.current.intensity = 12 + Math.sin(t * 1.4) * 0.7
    }
    if (leftBannerRef.current) {
      leftBannerRef.current.rotation.x = Math.sin(t * 1.1) * 0.04
    }
    if (rightBannerRef.current) {
      rightBannerRef.current.rotation.x = Math.cos(t * 1.05 + 0.6) * 0.04
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

      {/* Subtle Swaying Royal Banners Flanking the Throne */}
      {!isMobile && (
        <>
          <mesh ref={leftBannerRef} position={[-3.9, 3.6, -5.95]} castShadow>
            <boxGeometry args={[0.72, 3.3, 0.05]} />
            <meshStandardMaterial color="#581a1b" roughness={0.85} />
          </mesh>
          <mesh ref={rightBannerRef} position={[3.9, 3.6, -5.95]} castShadow>
            <boxGeometry args={[0.72, 3.3, 0.05]} />
            <meshStandardMaterial color="#581a1b" roughness={0.85} />
          </mesh>
        </>
      )}

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

      {/* Custom Sculpted Sovereign Throne GLB + Seated Sovereign Portrait */}
      <Suspense fallback={<ThroneFallbackSilhouette />}>
        <SovereignThroneModel castShadows={!isMobile} />
      </Suspense>
      <SeatedSovereignFigure />

      {/* Animated Brazier Flame Cones */}
      <mesh ref={leftFlameRef} position={[-1.95, 1.52, -2.1]}>
        <coneGeometry args={[0.16, 0.42, 7]} />
        <meshBasicMaterial color="#e88a31" transparent opacity={0.85} />
      </mesh>
      <mesh ref={rightFlameRef} position={[1.95, 1.52, -2.1]}>
        <coneGeometry args={[0.16, 0.42, 7]} />
        <meshBasicMaterial color="#e88a31" transparent opacity={0.85} />
      </mesh>

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
