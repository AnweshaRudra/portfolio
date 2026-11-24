import * as THREE from 'three'

/**
 * Generates a soft elliptical alpha mask texture so the portrait's center figure
 * remains 100% solid and opaque while only the outer studio edges fade smoothly.
 */
export function createEllipticalVignetteAlphaMap(size = 512): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, size, size)

  const cx = size * 0.5
  const cy = size * 0.52

  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(0.88, 1.0)
  const grad = ctx.createRadialGradient(0, 0, size * 0.24, 0, 0, size * 0.5)
  grad.addColorStop(0, '#ffffff')
  grad.addColorStop(0.68, '#ffffff')
  grad.addColorStop(0.88, '#888888')
  grad.addColorStop(1, '#000000')
  ctx.fillStyle = grad
  ctx.beginPath()
  ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}
