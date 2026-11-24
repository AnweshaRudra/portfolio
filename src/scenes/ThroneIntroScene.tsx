import { Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { useRealm } from '../context/realmContextCore'

const PILLAR_X_POSITIONS = [-4.2, 4.2] as const
const PILLAR_Z_POSITIONS = [-4.5, -1.5, 1.5, 4.5] as const

export function ThroneIntroScene() {
  const { reducedMotion } = useRealm()
  const keyLightRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    if (reducedMotion || !keyLightRef.current) return
    const t = clock.getElapsedTime()
    keyLightRef.current.intensity = 16 + Math.sin(t * 2.7) * 1.4 + Math.cos(t * 5.3) * 0.6
  })

  return (
    <group name="throne-intro-greybox">
      <ambientLight intensity={0.35} color="#a49279" />
      <directionalLight
        position={[3, 8, 5]}
        intensity={1.1}
        color="#d7c29f"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Warm practical torch/brazier key light behind/above throne */}
      <pointLight
        ref={keyLightRef}
        position={[0, 3.6, -1.4]}
        intensity={16}
        distance={18}
        decay={2}
        color="#d98b3e"
      />
      {/* Cool moonlit rim light from high rear */}
      <pointLight position={[-4, 5.5, -5.5]} intensity={6} distance={16} color="#58708c" />

      {/* Great hall stone floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#1d1814" roughness={0.92} metalness={0.08} />
      </mesh>

      {/* Central runner carpet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 1.2]} receiveShadow>
        <planeGeometry args={[2.2, 11]} />
        <meshStandardMaterial color="#4b1919" roughness={0.85} />
      </mesh>

      {/* Rear stone arch wall */}
      <mesh position={[0, 3.8, -6.2]} receiveShadow>
        <boxGeometry args={[16, 7.6, 0.8]} />
        <meshStandardMaterial color="#231d18" roughness={0.95} />
      </mesh>

      {/* Stepped stone dais */}
      <mesh position={[0, 0.2, -2.5]} receiveShadow castShadow>
        <boxGeometry args={[5.4, 0.4, 3.6]} />
        <meshStandardMaterial color="#2b241e" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.5, -2.7]} receiveShadow castShadow>
        <boxGeometry args={[3.8, 0.35, 2.5]} />
        <meshStandardMaterial color="#342b23" roughness={0.88} />
      </mesh>

      {/* Placeholder Throne Silhouette (Original angular forged-iron geometry) */}
      <group position={[0, 0.7, -2.85]}>
        {/* Seat base */}
        <mesh position={[0, 0.38, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[1.35, 0.76, 1.1]} />
          <meshStandardMaterial color="#2c2927" metalness={0.65} roughness={0.42} />
        </mesh>
        {/* High forged backrest */}
        <mesh position={[0, 1.65, -0.35]} castShadow>
          <boxGeometry args={[1.28, 2.5, 0.24]} />
          <meshStandardMaterial color="#24211f" metalness={0.72} roughness={0.38} />
        </mesh>
        {/* Crown spire */}
        <mesh position={[0, 3.15, -0.35]} castShadow>
          <coneGeometry args={[0.42, 0.9, 4]} />
          <meshStandardMaterial color="#8b6b35" metalness={0.75} roughness={0.32} />
        </mesh>
        {/* Side sword-inspired vertical fins */}
        {[-0.55, -0.28, 0.28, 0.55].map((xOffset, idx) => (
          <mesh
            key={xOffset}
            position={[xOffset, 2.4 + (idx % 2) * 0.25, -0.32]}
            rotation={[0, 0, xOffset * -0.14]}
            castShadow
          >
            <boxGeometry args={[0.1, 1.35, 0.08]} />
            <meshStandardMaterial color="#46413d" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Armrests */}
        {[-0.68, 0.68].map((xSide) => (
          <mesh key={xSide} position={[xSide, 0.85, 0.15]} castShadow>
            <boxGeometry args={[0.18, 0.24, 1.1]} />
            <meshStandardMaterial color="#37322e" metalness={0.7} roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Colonnade pillars */}
      {PILLAR_X_POSITIONS.map((x) =>
        PILLAR_Z_POSITIONS.map((z) => (
          <group key={`${x}-${z}`} position={[x, 0, z]}>
            <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.75, 6.4, 0.75]} />
              <meshStandardMaterial color="#2a231c" roughness={0.92} />
            </mesh>
            <mesh position={[0, 0.2, 0]} receiveShadow>
              <boxGeometry args={[1.05, 0.4, 1.05]} />
              <meshStandardMaterial color="#342b23" roughness={0.9} />
            </mesh>
          </group>
        )),
      )}

      {/* Subtle embers / dust motes */}
      {!reducedMotion && (
        <Sparkles
          count={38}
          scale={[10, 5, 10]}
          position={[0, 2.4, -1]}
          size={2.2}
          speed={0.28}
          opacity={0.55}
          color="#d59a47"
        />
      )}
    </group>
  )
}
