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
      dragonRef.current.position.set(1.3, 2.75, 1.5)
      dragonRef.current.rotation.set(0, -0.7, 0)
      return
    }

    const t = clock.getElapsedTime() * 0.5
    // Visible majestic figure-eight path directly over King's Landing & Dragonstone
    const x = 2.4 + Math.sin(t) * 2.8
    const z = 1.6 + Math.sin(t * 2) * 1.35
    const y = 2.55 + Math.sin(t * 2.4) * 0.28

    const dx = Math.cos(t) * 2.8
    const dz = Math.cos(t * 2) * 2.7
    const heading = Math.atan2(dx, dz)

    dragonRef.current.position.set(x, y, z)
    dragonRef.current.rotation.set(Math.sin(t * 2.4) * 0.1, heading, -dx * 0.08)

    const flap = Math.sin(clock.getElapsedTime() * 5.8) * 0.58
    if (leftWingRef.current) leftWingRef.current.rotation.z = flap + 0.18
    if (rightWingRef.current) rightWingRef.current.rotation.z = -flap - 0.18
    if (tailRef.current) tailRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 4.5) * 0.2
  })

  return (
    <group ref={dragonRef} position={[1.3, 2.75, 1.5]} scale={1.18}>
      {/* Warm fiery aura illuminating landmarks below as the dragon flies over */}
      <pointLight position={[0, -0.2, 0.2]} intensity={4.5} distance={6} color="#ff7f2e" />

      {/* Torso */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.2, 1.0, 6]} />
        <meshStandardMaterial
          color="#4f1c18"
          emissive="#2a0b08"
          emissiveIntensity={0.45}
          roughness={0.55}
          metalness={0.3}
        />
      </mesh>

      {/* Gold dorsal spine ridge */}
      <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.05, 0.85, 0.08]} />
        <meshStandardMaterial color="#cfa861" metalness={0.75} roughness={0.3} />
      </mesh>

      {/* Neck & Horned Head */}
      <mesh position={[0, 0.16, 0.58]} rotation={[Math.PI / 3, 0, 0]} castShadow>
        <coneGeometry args={[0.11, 0.58, 5]} />
        <meshStandardMaterial color="#66221c" roughness={0.52} />
      </mesh>
      <mesh position={[0, 0.3, 0.88]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.11, 0.34, 5]} />
        <meshStandardMaterial color="#7d2820" roughness={0.48} />
      </mesh>

      {/* Glowing ember eyes & fiery throat */}
      <mesh position={[0.048, 0.33, 0.9]}>
        <sphereGeometry args={[0.026, 6, 6]} />
        <meshStandardMaterial color="#ffb347" emissive="#ff6a1a" emissiveIntensity={2.0} />
      </mesh>
      <mesh position={[-0.048, 0.33, 0.9]}>
        <sphereGeometry args={[0.026, 6, 6]} />
        <meshStandardMaterial color="#ffb347" emissive="#ff6a1a" emissiveIntensity={2.0} />
      </mesh>

      {/* Tail */}
      <mesh ref={tailRef} position={[0, -0.02, -0.82]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.095, 1.0, 5]} />
        <meshStandardMaterial color="#421714" roughness={0.62} />
      </mesh>

      {/* Articulated Left Wing */}
      <group ref={leftWingRef} position={[0.14, 0.08, 0.12]}>
        <mesh position={[0.68, 0, -0.08]} rotation={[-Math.PI / 2, 0, -0.15]} castShadow>
          <boxGeometry args={[1.34, 0.64, 0.03]} />
          <meshStandardMaterial
            color="#8f2922"
            emissive="#47100b"
            emissiveIntensity={0.4}
            roughness={0.65}
          />
        </mesh>
      </group>

      {/* Articulated Right Wing */}
      <group ref={rightWingRef} position={[-0.14, 0.08, 0.12]}>
        <mesh position={[-0.68, 0, -0.08]} rotation={[-Math.PI / 2, 0, 0.15]} castShadow>
          <boxGeometry args={[1.34, 0.64, 0.03]} />
          <meshStandardMaterial
            color="#8f2922"
            emissive="#47100b"
            emissiveIntensity={0.4}
            roughness={0.65}
          />
        </mesh>
      </group>
    </group>
  )
}
