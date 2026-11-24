import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import type { DestinationInfo } from '../data/types'
import { getRealmElevation } from '../utils/kingdomGeography'

interface MapLandmarkProps {
  destination: DestinationInfo
  isActive: boolean
  isHighlighted: boolean
  reducedMotion: boolean
  isPanelOpen: boolean
  onSelect: (id: DestinationInfo['id']) => void
  onHoverChange: (id: DestinationInfo['id'] | null) => void
}

function WinterfellKeep({ stoneColor }: { stoneColor: string }) {
  return (
    <group>
      {/* Curtain wall perimeter */}
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.48, 1.15]} />
        <meshStandardMaterial color={stoneColor} roughness={0.82} />
      </mesh>
      {/* Central Great Keep */}
      <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.68, 0.85, 0.65]} />
        <meshStandardMaterial color="#6e685f" roughness={0.78} />
      </mesh>
      <mesh position={[0, 1.22, 0]} castShadow>
        <coneGeometry args={[0.52, 0.42, 4]} />
        <meshStandardMaterial color="#37434d" roughness={0.65} />
      </mesh>
      {/* Twin flanking slate towers */}
      {[
        [-0.56, -0.5],
        [0.56, 0.5],
        [-0.56, 0.5],
        [0.56, -0.5],
      ].map(([tx, tz], idx) => (
        <group key={idx} position={[tx, 0, tz]}>
          <mesh position={[0, 0.48, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.19, 0.96, 8]} />
            <meshStandardMaterial color="#7b756c" roughness={0.78} />
          </mesh>
          <mesh position={[0, 1.06, 0]} castShadow>
            <coneGeometry args={[0.21, 0.34, 8]} />
            <meshStandardMaterial color="#3c4954" roughness={0.62} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function CitadelObservatory({
  stoneColor,
  reducedMotion,
}: {
  stoneColor: string
  reducedMotion: boolean
}) {
  const ringRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (reducedMotion || !ringRef.current) return
    ringRef.current.rotation.y = clock.getElapsedTime() * 0.6
  })

  return (
    <group>
      {/* Archive library rotunda */}
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.68, 0.78, 0.56, 12]} />
        <meshStandardMaterial color={stoneColor} roughness={0.72} />
      </mesh>
      {/* Scholarly side wings */}
      {[-0.65, 0.65].map((x) => (
        <mesh key={x} position={[x, 0.22, 0]} castShadow>
          <boxGeometry args={[0.42, 0.44, 0.55]} />
          <meshStandardMaterial color="#8c7a5b" roughness={0.75} />
        </mesh>
      ))}
      {/* High observatory tower */}
      <mesh position={[0, 0.88, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.36, 0.95, 10]} />
        <meshStandardMaterial color="#a6906a" roughness={0.65} />
      </mesh>
      {/* Brass astronomical dome + rotating astrolabe ring */}
      <mesh position={[0, 1.4, 0]} castShadow>
        <sphereGeometry args={[0.3, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#b18a45" metalness={0.72} roughness={0.3} />
      </mesh>
      <mesh ref={ringRef} position={[0, 1.56, 0]} rotation={[0.45, 0, 0]}>
        <torusGeometry args={[0.38, 0.025, 8, 24]} />
        <meshStandardMaterial color="#cfa861" metalness={0.85} roughness={0.25} />
      </mesh>
    </group>
  )
}

function KingsLandingCapital({ stoneColor }: { stoneColor: string }) {
  return (
    <group>
      {/* Outer royal bastion */}
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.92, 1.05, 0.48, 8]} />
        <meshStandardMaterial color={stoneColor} roughness={0.75} />
      </mesh>
      {/* Red Keep central citadel */}
      <mesh position={[0, 0.68, -0.08]} castShadow>
        <boxGeometry args={[0.88, 0.78, 0.78]} />
        <meshStandardMaterial color="#854038" roughness={0.72} />
      </mesh>
      {/* Royal Pavilion Dome */}
      <mesh position={[0, 1.16, 0.08]} castShadow>
        <cylinderGeometry args={[0.32, 0.38, 0.45, 10]} />
        <meshStandardMaterial color="#b18a45" metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.48, 0.08]} castShadow>
        <coneGeometry args={[0.38, 0.48, 10]} />
        <meshStandardMaterial color="#741f20" roughness={0.62} />
      </mesh>
      {/* Flanking crown turrets */}
      {[-0.48, 0.48].map((x) => (
        <group key={x} position={[x, 0, -0.32]}>
          <mesh position={[0, 0.78, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.16, 0.92, 8]} />
            <meshStandardMaterial color="#8e4a40" roughness={0.72} />
          </mesh>
          <mesh position={[0, 1.32, 0]} castShadow>
            <coneGeometry args={[0.17, 0.3, 8]} />
            <meshStandardMaterial color="#cfa861" metalness={0.65} roughness={0.32} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function DragonstoneVolcano({ reducedMotion }: { reducedMotion: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (reducedMotion || !coreRef.current) return
    const mat = coreRef.current.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = 0.85 + Math.sin(clock.getElapsedTime() * 2.4) * 0.25
  })

  return (
    <group>
      {/* Volcanic basalt caldera */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.88, 0.95, 6]} />
        <meshStandardMaterial color="#2b2321" roughness={0.88} />
      </mesh>
      {/* Jagged obsidian citadel spires */}
      {[
        { pos: [0, 0.98, 0] as [number, number, number], r: 0.22, h: 0.95, rot: 0 },
        { pos: [-0.36, 0.78, 0.16] as [number, number, number], r: 0.16, h: 0.78, rot: 0.24 },
        { pos: [0.36, 0.78, -0.14] as [number, number, number], r: 0.16, h: 0.78, rot: -0.24 },
      ].map((spire, idx) => (
        <mesh
          key={idx}
          position={spire.pos}
          rotation={[0, 0, spire.rot]}
          castShadow
        >
          <coneGeometry args={[spire.r, spire.h, 5]} />
          <meshStandardMaterial color="#352a29" metalness={0.35} roughness={0.55} />
        </mesh>
      ))}
      {/* Glowing dragon-glass / forge heart */}
      <mesh ref={coreRef} position={[0, 1.54, 0]}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial
          color="#b83728"
          emissive="#a62c1e"
          emissiveIntensity={0.9}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}

function TheWallFortress() {
  return (
    <group>
      {/* Massive glacial-slate barrier */}
      <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.9, 0.92, 0.46]} />
        <meshStandardMaterial color="#788b99" roughness={0.42} metalness={0.18} />
      </mesh>
      {/* Crenellations & frost ridge */}
      {[-1.1, -0.55, 0, 0.55, 1.1].map((x) => (
        <mesh key={x} position={[x, 1.0, 0]} castShadow>
          <boxGeometry args={[0.28, 0.24, 0.52]} />
          <meshStandardMaterial color="#9fb3c2" roughness={0.38} metalness={0.2} />
        </mesh>
      ))}
      {/* Central Watch Gatehouse */}
      <mesh position={[0, 0.58, 0.22]} castShadow>
        <boxGeometry args={[0.62, 1.15, 0.36]} />
        <meshStandardMaterial color="#44484d" roughness={0.82} />
      </mesh>
      {/* Signal brazier flame along top */}
      <mesh position={[0, 1.24, 0.2]}>
        <sphereGeometry args={[0.11, 8, 8]} />
        <meshStandardMaterial color="#e08938" emissive="#d4681c" emissiveIntensity={1.2} />
      </mesh>
    </group>
  )
}

function RavensKeepTower({
  stoneColor,
  reducedMotion,
}: {
  stoneColor: string
  reducedMotion: boolean
}) {
  const flockRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (reducedMotion || !flockRef.current) return
    flockRef.current.rotation.y = clock.getElapsedTime() * 0.75
  })

  return (
    <group>
      {/* Stepped coastal rock plinth */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.56, 0.68, 0.36, 8]} />
        <meshStandardMaterial color="#463d34" roughness={0.88} />
      </mesh>
      {/* Tall signal tower */}
      <mesh position={[0, 0.78, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.36, 1.1, 8]} />
        <meshStandardMaterial color={stoneColor} roughness={0.78} />
      </mesh>
      {/* Rookery timber gallery */}
      <mesh position={[0, 1.32, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.32, 0.16, 8]} />
        <meshStandardMaterial color="#59412b" roughness={0.82} />
      </mesh>
      {/* Lantern beacon & pointed slate roof */}
      <mesh position={[0, 1.48, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.22, 6]} />
        <meshStandardMaterial color="#e2aa4b" emissive="#cfa861" emissiveIntensity={0.95} />
      </mesh>
      <mesh position={[0, 1.78, 0]} castShadow>
        <coneGeometry args={[0.38, 0.46, 8]} />
        <meshStandardMaterial color="#2a241f" roughness={0.75} />
      </mesh>
      {/* Circling raven silhouettes */}
      <group ref={flockRef} position={[0, 1.88, 0]}>
        {[0, 2.1, 4.2].map((angle, idx) => (
          <mesh
            key={idx}
            position={[Math.cos(angle) * 0.56, (idx % 2) * 0.12, Math.sin(angle) * 0.56]}
            rotation={[0, -angle, 0]}
          >
            <coneGeometry args={[0.045, 0.16, 3]} />
            <meshStandardMaterial color="#171411" roughness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  )
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

  const [wx, , wz] = destination.mapPosition
  const groundY = Math.max(0.08, getRealmElevation(wx, wz))

  useFrame(({ clock }) => {
    if (reducedMotion) return
    const t = clock.getElapsedTime()
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.45
    }
    if (beaconRef.current) {
      beaconRef.current.position.y = 2.15 + Math.sin(t * 2.2) * 0.08
    }
  })

  const emphasized = isActive || isHighlighted
  const stoneColor = emphasized ? '#9c7e49' : '#65594b'

  return (
    <group
      position={[wx, groundY, wz]}
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
      {/* Carved pedestal ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[0.92, 1.12, 32]} />
        <meshBasicMaterial
          color={emphasized ? '#cfa861' : '#8c8274'}
          transparent
          opacity={emphasized ? 0.95 : 0.45}
        />
      </mesh>

      {/* Distinct architectural model per realm */}
      {destination.id === 'winterfell' && <WinterfellKeep stoneColor={stoneColor} />}
      {destination.id === 'citadel' && (
        <CitadelObservatory stoneColor={stoneColor} reducedMotion={reducedMotion} />
      )}
      {destination.id === 'kings-landing' && <KingsLandingCapital stoneColor={stoneColor} />}
      {destination.id === 'dragonstone' && <DragonstoneVolcano reducedMotion={reducedMotion} />}
      {destination.id === 'the-wall' && <TheWallFortress />}
      {destination.id === 'ravens-keep' && (
        <RavensKeepTower stoneColor={stoneColor} reducedMotion={reducedMotion} />
      )}

      {/* Active / hover golden beacon diamond */}
      {emphasized && (
        <mesh ref={beaconRef} position={[0, 2.15, 0]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial
            color="#cfa861"
            emissive="#b18a45"
            emissiveIntensity={0.9}
          />
        </mesh>
      )}

      {/* Legible floating label & concise hover tooltip (hidden when content panel is open) */}
      {!isPanelOpen && (
        <Html position={[0, 2.28, 0]} center distanceFactor={13.5} zIndexRange={[10, 0]}>
          <button
            type="button"
            onClick={() => onSelect(destination.id)}
            onMouseEnter={() => onHoverChange(destination.id)}
            onMouseLeave={() => onHoverChange(null)}
            onFocus={() => onHoverChange(destination.id)}
            onBlur={() => onHoverChange(null)}
            aria-label={`${destination.realmName}: ${destination.portfolioTitle}`}
            className={`group flex flex-col items-center rounded border px-2.5 py-1 text-center transition-all whitespace-nowrap cursor-pointer ${
              emphasized
                ? 'border-[#CFA861] bg-[#171411]/95 text-[#E5D5B9] shadow-2xl scale-105'
                : 'border-[#B18A45]/55 bg-[#171411]/88 text-[#E5D5B9]/92 hover:border-[#CFA861]'
            }`}
          >
            <span className="font-display text-[11px] font-semibold tracking-wider uppercase text-[#CFA861]">
              {destination.realmName}
            </span>
            <span className="font-ui text-[10px] text-[#E5D5B9]/85">
              {destination.portfolioTitle}
            </span>
            {emphasized && (
              <span className="mt-0.5 border-t border-[#B18A45]/35 pt-0.5 text-[9px] tracking-wide uppercase text-[#B18A45]">
                Open Manuscript
              </span>
            )}
          </button>
        </Html>
      )}
    </group>
  )
}
