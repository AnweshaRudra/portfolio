import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import type { DestinationInfo } from '../data/types'

interface MapLandmarkProps {
  destination: DestinationInfo
  isActive: boolean
  isHighlighted: boolean
  reducedMotion: boolean
  isPanelOpen: boolean
  onSelect: (id: DestinationInfo['id']) => void
  onHoverChange: (id: DestinationInfo['id'] | null) => void
}

function LandmarkSilhouette({ kind, color }: { kind: DestinationInfo['landmarkKind']; color: string }) {
  switch (kind) {
    case 'keep':
      return (
        <group>
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.95, 0.9, 0.95]} />
            <meshStandardMaterial color={color} roughness={0.75} />
          </mesh>
          <mesh position={[-0.38, 0.65, -0.38]} castShadow>
            <cylinderGeometry args={[0.16, 0.2, 1.3, 8]} />
            <meshStandardMaterial color="#6e6559" roughness={0.7} />
          </mesh>
          <mesh position={[0.38, 0.72, 0.38]} castShadow>
            <cylinderGeometry args={[0.16, 0.2, 1.45, 8]} />
            <meshStandardMaterial color="#6e6559" roughness={0.7} />
          </mesh>
        </group>
      )
    case 'spire':
      return (
        <group>
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.45, 0.58, 0.8, 10]} />
            <meshStandardMaterial color={color} roughness={0.7} />
          </mesh>
          <mesh position={[0, 1.15, 0]} castShadow>
            <coneGeometry args={[0.38, 0.95, 10]} />
            <meshStandardMaterial color="#b18a45" metalness={0.55} roughness={0.35} />
          </mesh>
        </group>
      )
    case 'citadel':
      return (
        <group>
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.1, 1.0, 0.9]} />
            <meshStandardMaterial color={color} roughness={0.72} />
          </mesh>
          <mesh position={[0, 1.25, 0]} castShadow>
            <cylinderGeometry args={[0.28, 0.35, 0.7, 8]} />
            <meshStandardMaterial color="#b18a45" metalness={0.5} roughness={0.35} />
          </mesh>
          <mesh position={[0, 1.78, 0]} castShadow>
            <coneGeometry args={[0.34, 0.5, 8]} />
            <meshStandardMaterial color="#741f20" roughness={0.65} />
          </mesh>
        </group>
      )
    case 'fortress':
      return (
        <group>
          <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
            <coneGeometry args={[0.72, 1.1, 5]} />
            <meshStandardMaterial color="#3c2a27" roughness={0.82} />
          </mesh>
          <mesh position={[0, 1.05, 0]} castShadow>
            <octahedronGeometry args={[0.28, 0]} />
            <meshStandardMaterial color="#8f292a" metalness={0.45} roughness={0.35} />
          </mesh>
        </group>
      )
    case 'wall':
      return (
        <group>
          <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.85, 0.42]} />
            <meshStandardMaterial color="#7b8691" roughness={0.58} metalness={0.12} />
          </mesh>
          {[-0.75, 0, 0.75].map((x) => (
            <mesh key={x} position={[x, 0.95, 0]} castShadow>
              <boxGeometry args={[0.26, 0.3, 0.48]} />
              <meshStandardMaterial color="#919ca8" roughness={0.55} />
            </mesh>
          ))}
        </group>
      )
    case 'tower':
      return (
        <group>
          <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.26, 0.38, 1.3, 8]} />
            <meshStandardMaterial color={color} roughness={0.75} />
          </mesh>
          <mesh position={[0, 1.45, 0]} castShadow>
            <coneGeometry args={[0.36, 0.55, 8]} />
            <meshStandardMaterial color="#2c241e" roughness={0.75} />
          </mesh>
        </group>
      )
  }
}

export function MapLandmark({
  destination,
  isActive,
  isHighlighted,
  reducedMotion,
  isPanelOpen,
  onSelect,
  onHoverChange,
}: MapLandmarkProps) {
  const ringRef = useRef<THREE.Mesh>(null)
  const beaconRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (reducedMotion) return
    const t = clock.getElapsedTime()
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.45
    }
    if (beaconRef.current) {
      beaconRef.current.position.y = 1.9 + Math.sin(t * 2.2) * 0.08
    }
  })

  const emphasized = isActive || isHighlighted

  return (
    <group
      position={destination.mapPosition}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(destination.id)
      }}
      onPointerOver={(event) => {
        event.stopPropagation()
        document.body.style.cursor = 'pointer'
        onHoverChange(destination.id)
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto'
        onHoverChange(null)
      }}
    >
      {/* Pedestal ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <ringGeometry args={[0.85, 1.04, 32]} />
        <meshBasicMaterial
          color={emphasized ? '#cfa861' : '#8c8274'}
          transparent
          opacity={emphasized ? 0.95 : 0.42}
        />
      </mesh>

      {/* Landmark placeholder structure */}
      <LandmarkSilhouette
        kind={destination.landmarkKind}
        color={emphasized ? '#9b7b44' : '#584b3c'}
      />

      {/* Active / hover indicator beacon */}
      {emphasized && (
        <mesh ref={beaconRef} position={[0, 1.9, 0]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial
            color="#cfa861"
            emissive="#b18a45"
            emissiveIntensity={0.85}
          />
        </mesh>
      )}

      {/* Hide floating 3D HTML labels while a content panel is open so they never overlap text */}
      {!isPanelOpen && (
        <Html position={[0, 2.05, 0]} center distanceFactor={13} zIndexRange={[10, 0]}>
          <button
            type="button"
            onClick={() => onSelect(destination.id)}
            onMouseEnter={() => onHoverChange(destination.id)}
            onMouseLeave={() => onHoverChange(null)}
            onFocus={() => onHoverChange(destination.id)}
            onBlur={() => onHoverChange(null)}
            aria-label={`${destination.realmName}: ${destination.portfolioTitle}`}
            className={`group flex flex-col items-center rounded border px-2.5 py-1 text-center transition-colors whitespace-nowrap cursor-pointer ${
              emphasized
                ? 'border-[#CFA861] bg-[#171411]/95 text-[#E5D5B9] shadow-lg'
                : 'border-[#B18A45]/50 bg-[#171411]/85 text-[#E5D5B9]/90 hover:border-[#CFA861]'
            }`}
          >
            <span className="font-display text-[11px] font-semibold tracking-wider uppercase text-[#CFA861]">
              {destination.realmName}
            </span>
            <span className="font-ui text-[10px] text-[#E5D5B9]/85">
              {destination.portfolioTitle}
            </span>
          </button>
        </Html>
      )}
    </group>
  )
}
