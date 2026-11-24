import { Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useRealm } from '../context/realmContextCore'
import { DESTINATIONS } from '../data/destinations'
import { useViewport } from '../hooks/useViewport'
import {
  createKingdomMapTexture,
  getRealmElevation,
  MAP_DEPTH,
  MAP_WIDTH,
} from '../utils/kingdomGeography'
import { KingdomDragon } from './KingdomDragon'
import { MapLandmark } from './MapLandmark'
import { SnowfallSystem } from './SnowfallSystem'

const MOUNTAIN_PEAKS: Array<{ x: number; z: number; radius: number; height: number; snow: boolean }> = [
  { x: -5.8, z: -5.4, radius: 1.15, height: 1.9, snow: true },
  { x: -4.2, z: -5.8, radius: 0.95, height: 1.55, snow: true },
  { x: -2.4, z: -5.6, radius: 1.25, height: 2.1, snow: true },
  { x: 2.5, z: -5.5, radius: 1.15, height: 1.85, snow: true },
  { x: 4.3, z: -5.3, radius: 0.95, height: 1.5, snow: true },
  { x: -6.5, z: -1.1, radius: 0.85, height: 1.25, snow: false },
  { x: -3.2, z: -0.4, radius: 0.72, height: 1.05, snow: false },
]

const FOREST_CLUSTERS: Array<[number, number]> = [
  [-3.1, -2.1],
  [-2.6, -2.5],
  [-2.9, -1.6],
  [-3.4, 1.3],
  [-2.8, 1.7],
  [-3.1, 2.2],
  [2.5, -1.2],
  [2.9, -0.7],
  [2.3, 3.1],
  [2.8, 2.7],
]

export function KingdomMapScene() {
  const {
    selectedId,
    hoveredId,
    focusedId,
    reducedMotion,
    isPanelOpen,
    selectDestination,
    setHoveredId,
    markSceneReady,
  } = useRealm()

  const { tier } = useViewport()
  const isMobile = tier === 'mobile'
  const seaRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (reducedMotion || !seaRef.current) return
    seaRef.current.position.y = 0.02 + Math.sin(clock.getElapsedTime() * 0.9) * 0.012
  })

  const mapTexture = useMemo(
    () => createKingdomMapTexture(isMobile ? 512 : 1024),
    [isMobile],
  )

  const terrainGeometry = useMemo(() => {
    const segX = isMobile ? 42 : 76
    const segZ = isMobile ? 36 : 64
    const geo = new THREE.PlaneGeometry(MAP_WIDTH, MAP_DEPTH, segX, segZ)
    geo.rotateX(-Math.PI / 2)

    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      pos.setY(i, getRealmElevation(x, z))
    }
    geo.computeVertexNormals()
    return geo
  }, [isMobile])

  useEffect(() => {
    markSceneReady()
  }, [markSceneReady])

  useEffect(() => {
    return () => {
      mapTexture.dispose()
      terrainGeometry.dispose()
    }
  }, [mapTexture, terrainGeometry])

  return (
    <group name="kingdom-map-25d">
      <ambientLight intensity={0.62} color="#ccb99a" />
      <directionalLight
        position={[9, 14, 8]}
        intensity={1.4}
        color="#f5dbb0"
        castShadow={!isMobile}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      <directionalLight position={[-8, 7, -6]} intensity={0.5} color="#6d86a1" />

      {/* Tactical War-Table Outer Obsidian & Brass Frame */}
      <mesh position={[0, -0.35, 0]} receiveShadow>
        <boxGeometry args={[MAP_WIDTH + 1.2, 0.55, MAP_DEPTH + 1.2]} />
        <meshStandardMaterial color="#241c15" roughness={0.86} metalness={0.18} />
      </mesh>
      <mesh position={[0, -0.06, 0]}>
        <boxGeometry args={[MAP_WIDTH + 0.35, 0.08, MAP_DEPTH + 0.35]} />
        <meshStandardMaterial color="#8f6f39" roughness={0.42} metalness={0.68} />
      </mesh>

      {/* Reflective Coastal Sea Plane with subtle tide shimmer */}
      <mesh ref={seaRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[MAP_WIDTH, MAP_DEPTH]} />
        <meshStandardMaterial color="#1a2630" roughness={0.34} metalness={0.32} />
      </mesh>

      {/* Flying 3D Dragon soaring over King's Landing & Dragonstone */}
      <KingdomDragon reducedMotion={reducedMotion} />

      {/* Falling Snow over Winterfell & The Wall */}
      <SnowfallSystem
        center={[-4.6, 0.3, -3.4]}
        spread={[4.8, 3.6, 4.4]}
        count={isMobile ? 45 : 95}
        reducedMotion={reducedMotion}
      />
      <SnowfallSystem
        center={[0.2, 0.5, -5.0]}
        spread={[5.6, 3.4, 3.0]}
        count={isMobile ? 35 : 75}
        reducedMotion={reducedMotion}
      />

      {/* Atmospheric Northern Frost Motes & Warm Map Dust */}
      {!reducedMotion && (
        <>
          <Sparkles
            count={isMobile ? 12 : 28}
            scale={[14, 1.5, 4]}
            position={[0, 1.4, -4.5]}
            size={isMobile ? 1.4 : 1.9}
            speed={0.18}
            opacity={0.38}
            color="#d8e3ec"
          />
          {!isMobile && (
            <Sparkles
              count={22}
              scale={[16, 2.2, 12]}
              position={[0, 1.6, 0.5]}
              size={1.6}
              speed={0.14}
              opacity={0.3}
              color="#cfa861"
            />
          )}
        </>
      )}

      {/* Sculpted 2.5D Textured Kingdom Terrain */}
      <mesh geometry={terrainGeometry} receiveShadow castShadow={!isMobile}>
        <meshStandardMaterial map={mapTexture} roughness={0.88} metalness={0.05} />
      </mesh>

      {/* Mountain Ridges with Snow Caps */}
      {MOUNTAIN_PEAKS.map((peak, index) => {
        const baseY = Math.max(0.1, getRealmElevation(peak.x, peak.z))
        return (
          <group key={index} position={[peak.x, baseY, peak.z]}>
            <mesh position={[0, peak.height * 0.45, 0]} castShadow={!isMobile} receiveShadow>
              <coneGeometry args={[peak.radius, peak.height, 5]} />
              <meshStandardMaterial color="#4e4740" roughness={0.92} />
            </mesh>
            {peak.snow && (
              <mesh position={[0, peak.height * 0.78, 0]}>
                <coneGeometry args={[peak.radius * 0.42, peak.height * 0.4, 5]} />
                <meshStandardMaterial color="#cfd5d8" roughness={0.8} />
              </mesh>
            )}
          </group>
        )
      })}

      {/* Pine Forest Clusters */}
      {FOREST_CLUSTERS.map(([fx, fz], index) => {
        const baseY = Math.max(0.08, getRealmElevation(fx, fz))
        return (
          <mesh key={index} position={[fx, baseY + 0.3, fz]} castShadow={!isMobile}>
            <coneGeometry args={[0.24, 0.65, 6]} />
            <meshStandardMaterial color="#2d3f2e" roughness={0.9} />
          </mesh>
        )
      })}

      {/* Six Clickable Portfolio Landmarks */}
      {DESTINATIONS.map((destination) => (
        <MapLandmark
          key={destination.id}
          destination={destination}
          isActive={selectedId === destination.id}
          isHighlighted={hoveredId === destination.id || focusedId === destination.id}
          reducedMotion={reducedMotion}
          isPanelOpen={isPanelOpen}
          onSelect={selectDestination}
          onHoverChange={setHoveredId}
        />
      ))}
    </group>
  )
}
