import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export function KingdomDragon({ reducedMotion }: { reducedMotion: boolean }) {
  const dragonRef = useRef<THREE.Group>(null)
  const leftWingRef = useRef<THREE.Group>(null)
  const rightWingRef = useRef<THREE.Group>(null)
  const tailRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!dragonRef.current) return
    if (reducedMotion) {
      dragonRef.current.position.set(1.6, 3.25, 1.8)
      dragonRef.current.rotation.set(0, -0.7, 0)
      return
    }

    const t = clock.getElapsedTime() * 0.42
    // Graceful figure-eight flight circling King's Landing & Dragonstone
    const x = 2.6 + Math.sin(t) * 3.1
    const z = 1.6 + Math.sin(t * 2) * 1.45
    const y = 3.15 + Math.sin(t * 2.4) * 0.35

    const dx = Math.cos(t) * 3.1
    const dz = Math.cos(t * 2) * 2.9
    const heading = Math.atan2(dx, dz)

    dragonRef.current.position.set(x, y, z)
    dragonRef.current.rotation.set(Math.sin(t * 2.4) * 0.12, heading, -dx * 0.08)

    const flap = Math.sin(clock.getElapsedTime() * 5.2) * 0.52
    if (leftWingRef.current) leftWingRef.current.rotation.z = flap + 0.15
    if (rightWingRef.current) rightWingRef.current.rotation.z = -flap - 0.15
    if (tailRef.current) tailRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 4.5) * 0.18
  })

  return (
    <group ref={dragonRef} position={[1.6, 3.25, 1.8]} scale={0.72}>
      {/* Torso */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.19, 0.95, 6]} />
        <meshStandardMaterial color="#2a1b1a" roughness={0.65} metalness={0.25} />
      </mesh>

      {/* Neck & Horned Head */}
      <mesh position={[0, 0.14, 0.56]} rotation={[Math.PI / 3, 0, 0]} castShadow>
        <coneGeometry args={[0.1, 0.55, 5]} />
        <meshStandardMaterial color="#361f1d" roughness={0.62} />
      </mesh>
      <mesh position={[0, 0.28, 0.84]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.1, 0.3, 5]} />
        <meshStandardMaterial color="#42221f" roughness={0.58} />
      </mesh>
      {/* Glowing ember eyes */}
      <mesh position={[0.045, 0.31, 0.86]}>
        <sphereGeometry args={[0.022, 6, 6]} />
        <meshStandardMaterial color="#ff9d42" emissive="#e8641c" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[-0.045, 0.31, 0.86]}>
        <sphereGeometry args={[0.022, 6, 6]} />
        <meshStandardMaterial color="#ff9d42" emissive="#e8641c" emissiveIntensity={1.5} />
      </mesh>

      {/* Tail */}
      <mesh ref={tailRef} position={[0, -0.02, -0.78]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.09, 0.95, 5]} />
        <meshStandardMaterial color="#241716" roughness={0.7} />
      </mesh>

      {/* Articulated Left Wing */}
      <group ref={leftWingRef} position={[0.14, 0.08, 0.12]}>
        <mesh position={[0.62, 0, -0.08]} rotation={[-Math.PI / 2, 0, -0.15]} castShadow>
          <boxGeometry args={[1.22, 0.58, 0.025]} />
          <meshStandardMaterial
            color="#5c211e"
            roughness={0.75}
            transparent
            opacity={0.92}
          />
        </mesh>
      </group>

      {/* Articulated Right Wing */}
      <group ref={rightWingRef} position={[-0.14, 0.08, 0.12]}>
        <mesh position={[-0.62, 0, -0.08]} rotation={[-Math.PI / 2, 0, 0.15]} castShadow>
          <boxGeometry args={[1.22, 0.58, 0.025]} />
          <meshStandardMaterial
            color="#5c211e"
            roughness={0.75}
            transparent
            opacity={0.92}
          />
        </mesh>
      </group>
    </group>
  )
}
