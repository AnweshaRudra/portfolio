import { DESTINATIONS } from '../data/destinations'
import { useRealm } from '../context/realmContextCore'
import { MapLandmark } from './MapLandmark'

const MOUNTAIN_PEAKS: Array<{ pos: [number, number, number]; radius: number; height: number }> = [
  { pos: [-5.8, 0.8, -5.4], radius: 1.4, height: 2.2 },
  { pos: [-4.2, 0.7, -5.8], radius: 1.1, height: 1.8 },
  { pos: [-2.4, 0.9, -5.6], radius: 1.5, height: 2.4 },
  { pos: [2.5, 0.85, -5.5], radius: 1.4, height: 2.1 },
  { pos: [4.3, 0.7, -5.3], radius: 1.15, height: 1.75 },
  { pos: [-6.4, 0.65, -0.8], radius: 1.0, height: 1.5 },
]

const FOREST_CLUSTERS: Array<[number, number, number]> = [
  [-3.1, 0.28, -2.0],
  [-2.6, 0.28, -2.4],
  [-2.9, 0.28, -1.5],
  [-3.3, 0.28, 1.3],
  [-2.8, 0.28, 1.7],
  [2.5, 0.28, -1.2],
  [2.9, 0.28, -0.7],
  [2.3, 0.28, 3.2],
  [2.8, 0.28, 2.8],
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
  } = useRealm()

  return (
    <group name="kingdom-map-greybox">
      <ambientLight intensity={0.55} color="#cab89c" />
      <directionalLight
        position={[8, 14, 7]}
        intensity={1.35}
        color="#f1d7a8"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-7, 6, -6]} intensity={0.45} color="#6b8096" />

      {/* Outer dark sea plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.18, 0]} receiveShadow>
        <planeGeometry args={[42, 42]} />
        <meshStandardMaterial color="#161b20" roughness={0.85} metalness={0.18} />
      </mesh>

      {/* Main original kingdom landmass plateau */}
      <mesh position={[0, 0.02, -0.3]} receiveShadow castShadow>
        <boxGeometry args={[15.5, 0.4, 13.5]} />
        <meshStandardMaterial color="#31271d" roughness={0.94} />
      </mesh>

      {/* Inner highland contour step */}
      <mesh position={[-0.6, 0.14, -1.8]} receiveShadow>
        <boxGeometry args={[11.2, 0.2, 8.4]} />
        <meshStandardMaterial color="#3c3024" roughness={0.92} />
      </mesh>

      {/* Subtle parchment/cartographic grid lines on terrain */}
      <gridHelper args={[15, 15, '#6a5638', '#423526']} position={[0, 0.23, -0.3]} />

      {/* Eastern strait separating Dragonstone isle visually */}
      <mesh position={[4.1, 0.22, 1.8]} receiveShadow>
        <boxGeometry args={[0.9, 0.06, 4.4]} />
        <meshStandardMaterial color="#1a2229" roughness={0.7} />
      </mesh>

      {/* Greybox northern mountain range silhouettes */}
      {MOUNTAIN_PEAKS.map((peak, index) => (
        <mesh key={index} position={peak.pos} castShadow receiveShadow>
          <coneGeometry args={[peak.radius, peak.height, 5]} />
          <meshStandardMaterial color="#48413a" roughness={0.92} />
        </mesh>
      ))}

      {/* Greybox forest silhouettes */}
      {FOREST_CLUSTERS.map((pos, index) => (
        <mesh key={index} position={pos} castShadow>
          <coneGeometry args={[0.28, 0.68, 6]} />
          <meshStandardMaterial color="#273628" roughness={0.9} />
        </mesh>
      ))}

      {/* Six clickable portfolio landmarks */}
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
