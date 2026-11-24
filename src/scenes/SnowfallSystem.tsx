import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
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

function createSnowflakeTexture(): THREE.CanvasTexture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const grad = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2)
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
  grad.addColorStop(0.45, 'rgba(225, 240, 252, 0.85)')
  grad.addColorStop(1, 'rgba(225, 240, 252, 0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

export function SnowfallSystem({
  center,
  spread,
  count,
  reducedMotion,
}: SnowfallSystemProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const flakeTexture = useMemo(() => createSnowflakeTexture(), [])

  useEffect(() => {
    return () => flakeTexture.dispose()
  }, [flakeTexture])

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (deterministicUnit(i * 3 + 1) - 0.5) * spread[0]
      pos[i * 3 + 1] = deterministicUnit(i * 3 + 2) * spread[1]
      pos[i * 3 + 2] = (deterministicUnit(i * 3 + 3) - 0.5) * spread[2]
      spd[i] = 0.85 + deterministicUnit(i * 3 + 4) * 0.9
    }
    return { positions: pos, speeds: spd }
  }, [count, spread])

  useFrame(({ clock }, delta) => {
    if (reducedMotion || !pointsRef.current) return
    const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const t = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      let y = attr.getY(i) - delta * speeds[i]
      let x = attr.getX(i) + Math.sin(t * 1.4 + i) * delta * 0.28
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
        map={flakeTexture}
        color="#eef7ff"
        size={0.26}
        sizeAttenuation
        transparent
        opacity={0.92}
        alphaTest={0.02}
        depthWrite={false}
        fog={false}
      />
    </points>
  )
}
