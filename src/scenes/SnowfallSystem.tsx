import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface SnowfallSystemProps {
  center: [number, number, number]
  spread: [number, number, number]
  count: number
  reducedMotion: boolean
}

function deterministicUnit(seed: number): number {
  const s = Math.sin(seed * 91.3458) * 47453.5453
  return s - Math.floor(s)
}

export function SnowfallSystem({
  center,
  spread,
  count,
  reducedMotion,
}: SnowfallSystemProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (deterministicUnit(i * 3 + 1) - 0.5) * spread[0]
      pos[i * 3 + 1] = deterministicUnit(i * 3 + 2) * spread[1]
      pos[i * 3 + 2] = (deterministicUnit(i * 3 + 3) - 0.5) * spread[2]
      spd[i] = 0.45 + deterministicUnit(i * 3 + 4) * 0.55
    }
    return { positions: pos, speeds: spd }
  }, [count, spread])

  useFrame(({ clock }, delta) => {
    if (reducedMotion || !pointsRef.current) return
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const t = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      let y = attr.getY(i) - delta * speeds[i]
      let x = attr.getX(i) + Math.sin(t * 1.1 + i) * delta * 0.14
      if (y < 0) {
        y = spread[1]
        x = (deterministicUnit(i + Math.floor(t * 10)) - 0.5) * spread[0]
      }
      attr.setXY(i, x, y)
    }
    attr.needsUpdate = true
  })

  if (reducedMotion) return null

  return (
    <points ref={pointsRef} position={center}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#e6eff5"
        size={0.075}
        transparent
        opacity={0.78}
        depthWrite={false}
      />
    </points>
  )
}
