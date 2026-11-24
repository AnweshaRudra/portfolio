import * as THREE from 'three'

export const MAP_WIDTH = 20
export const MAP_DEPTH = 17

/**
 * Deterministic 2D pseudo-noise for organic coastlines and highlands
 */
function hash2(x: number, z: number): number {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453123
  return s - Math.floor(s)
}

function valueNoise(x: number, z: number): number {
  const ix = Math.floor(x)
  const iz = Math.floor(z)
  const fx = x - ix
  const fz = z - iz
  const ux = fx * fx * (3 - 2 * fx)
  const uz = fz * fz * (3 - 2 * fz)

  const a = hash2(ix, iz)
  const b = hash2(ix + 1, iz)
  const c = hash2(ix, iz + 1)
  const d = hash2(ix + 1, iz + 1)

  return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz
}

function fbm(x: number, z: number): number {
  return (
    valueNoise(x, z) * 0.55 +
    valueNoise(x * 2.1, z * 2.1) * 0.3 +
    valueNoise(x * 4.3, z * 4.3) * 0.15
  )
}

function gaussian(dx: number, dz: number, sx: number, sz: number): number {
  return Math.exp(-((dx * dx) / (2 * sx * sx) + (dz * dz) / (2 * sz * sz)))
}

/**
 * Original fictional realm heightfield at world coordinates (x, z).
 * Returns elevation >= -0.45 (sea level is at y = 0).
 */
export function getRealmElevation(x: number, z: number): number {
  // Main western-to-central continent lobe
  const continent =
    gaussian(x + 1.1, z + 0.5, 5.2, 5.0) * 1.15 +
    gaussian(x - 1.2, z - 2.6, 4.4, 2.7) * 0.95 +
    gaussian(x + 3.6, z - 1.8, 2.8, 3.6) * 0.85

  // Eastern peninsula (Raven's Keep)
  const eastCoast = gaussian(x - 4.7, z + 2.8, 2.0, 2.2) * 1.1

  // Separate volcanic island across the narrow strait (Dragonstone)
  const dragonIsle = gaussian(x - 5.5, z - 1.9, 1.55, 1.55) * 1.32

  // Carve a narrow sea strait between mainland & Dragonstone
  const straitCarve = gaussian(x - 3.65, z - 1.7, 0.72, 2.7) * 0.92

  // Carve central royal bay south of King's Landing
  const royalBay = gaussian(x - 0.5, z - 4.9, 2.4, 1.5) * 0.85

  // Northern mountain spine near The Wall
  const northRidge = gaussian(x, z + 5.1, 5.6, 1.15) * 0.75

  const noise = (fbm(x * 0.35 + 12, z * 0.35 + 8) - 0.48) * 0.52

  const landSignal = continent + eastCoast + dragonIsle + northRidge - straitCarve - royalBay + noise

  if (landSignal < 0.42) {
    // Sea bed gently slopes down
    return Math.max(-0.42, (landSignal - 0.42) * 1.15)
  }

  // Land elevation above sea level (0.05 .. ~1.35)
  return 0.08 + Math.pow(landSignal - 0.42, 0.92) * 0.95
}

/**
 * Generates an original hand-crafted cartographic CanvasTexture matching getRealmElevation(x, z).
 */
export function createKingdomMapTexture(size = 1024): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const imageData = ctx.createImageData(size, size)
  const pixels = imageData.data

  for (let py = 0; py < size; py++) {
    const z = (py / (size - 1) - 0.5) * MAP_DEPTH
    for (let px = 0; px < size; px++) {
      const x = (px / (size - 1) - 0.5) * MAP_WIDTH
      const h = getRealmElevation(x, z)
      const grain = (hash2(px * 0.7, py * 0.7) - 0.5) * 14

      let r = 24
      let g = 33
      let b = 40

      if (h <= 0.0) {
        // Deep to coastal parchment-tinted sea
        const depthT = Math.min(1, Math.abs(h) / 0.42)
        r = 34 - depthT * 14
        g = 45 - depthT * 16
        b = 53 - depthT * 15
      } else if (h < 0.14) {
        // Shoreline sand / coastal border
        r = 126
        g = 106
        b = 76
      } else {
        // Biome shading: northern frost vs central warm parchment-olive vs eastern basalt
        const northFactor = THREE.MathUtils.clamp((-z - 2.0) / 5.5, 0, 1)
        const eastIsleFactor = gaussian(x - 5.5, z - 1.9, 1.8, 1.8)

        // Base warm cartographic ochre-olive
        r = 108 + h * 26
        g = 93 + h * 18
        b = 65 + h * 10

        // Blend frost tint in north
        r = r * (1 - northFactor * 0.42) + 158 * (northFactor * 0.42)
        g = g * (1 - northFactor * 0.42) + 162 * (northFactor * 0.42)
        b = b * (1 - northFactor * 0.42) + 164 * (northFactor * 0.42)

        // Blend dark volcanic slate on Dragonstone
        r = r * (1 - eastIsleFactor * 0.6) + 64 * (eastIsleFactor * 0.6)
        g = g * (1 - eastIsleFactor * 0.6) + 52 * (eastIsleFactor * 0.6)
        b = b * (1 - eastIsleFactor * 0.6) + 48 * (eastIsleFactor * 0.6)
      }

      const idx = (py * size + px) * 4
      pixels[idx] = THREE.MathUtils.clamp(Math.round(r + grain), 0, 255)
      pixels[idx + 1] = THREE.MathUtils.clamp(Math.round(g + grain), 0, 255)
      pixels[idx + 2] = THREE.MathUtils.clamp(Math.round(b + grain), 0, 255)
      pixels[idx + 3] = 255
    }
  }

  ctx.putImageData(imageData, 0, 0)

  // Draw cartographic rhumb lines, compass watermark & royal trade roads
  const toCanvas = (x: number, z: number): [number, number] => [
    ((x / MAP_WIDTH) + 0.5) * size,
    ((z / MAP_DEPTH) + 0.5) * size,
  ]

  // Subtle rhumb grid lines
  ctx.strokeStyle = 'rgba(207, 168, 97, 0.14)'
  ctx.lineWidth = 1
  for (let i = 1; i < 8; i++) {
    const pos = (i / 8) * size
    ctx.beginPath()
    ctx.moveTo(pos, 0)
    ctx.lineTo(pos, size)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, pos)
    ctx.lineTo(size, pos)
    ctx.stroke()
  }

  // Painted royal roads connecting mainland landmarks
  const roads: Array<[[number, number], [number, number], [number, number]]> = [
    [[-4.6, -3.4], [-2.2, -1.0], [0.4, 1.6]], // Winterfell -> King's Landing
    [[-5.1, 2.7], [-2.4, 2.3], [0.4, 1.6]], // Citadel -> King's Landing
    [[0.4, 1.6], [2.8, -0.8], [4.8, -2.9]], // King's Landing -> Raven's Keep
    [[-4.6, -3.4], [-2.2, -4.4], [0.2, -5.0]], // Winterfell -> The Wall
  ]

  ctx.save()
  ctx.strokeStyle = 'rgba(227, 210, 173, 0.48)'
  ctx.lineWidth = 3.2
  ctx.setLineDash([8, 6])
  for (const [start, ctrl, end] of roads) {
    const [x1, y1] = toCanvas(start[0], start[1])
    const [cx, cy] = toCanvas(ctrl[0], ctrl[1])
    const [x2, y2] = toCanvas(end[0], end[1])
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.quadraticCurveTo(cx, cy, x2, y2)
    ctx.stroke()
  }
  ctx.restore()

  // Painted cartographic compass rose in southwest sea
  const [rx, ry] = toCanvas(-7.4, 5.9)
  ctx.save()
  ctx.translate(rx, ry)
  ctx.strokeStyle = 'rgba(207, 168, 97, 0.42)'
  ctx.lineWidth = 1.8
  ctx.beginPath()
  ctx.arc(0, 0, size * 0.055, 0, Math.PI * 2)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, size * 0.042, 0, Math.PI * 2)
  ctx.stroke()
  for (let a = 0; a < 8; a++) {
    const rad = (a * Math.PI) / 4
    const len = a % 2 === 0 ? size * 0.062 : size * 0.036
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.cos(rad) * len, Math.sin(rad) * len)
    ctx.stroke()
  }
  ctx.restore()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  texture.needsUpdate = true
  return texture
}
