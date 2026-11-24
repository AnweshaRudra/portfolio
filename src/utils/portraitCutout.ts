import * as THREE from 'three'

/**
 * Loads an image and removes the uniform dark studio backdrop via a perimeter flood-fill
 * so inner dark clothing stays completely opaque while the 3D throne shows behind the figure.
 */
export function loadSovereignCutoutTexture(url: string): Promise<THREE.CanvasTexture> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const maxDim = 900
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
      const w = Math.max(1, Math.round(img.width * scale))
      const h = Math.max(1, Math.round(img.height * scale))

      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, w, h)

      const imageData = ctx.getImageData(0, 0, w, h)
      const data = imageData.data

      // Sample top-left corner background color
      const bgR = data[0]
      const bgG = data[1]
      const bgB = data[2]

      const visited = new Uint8Array(w * h)
      const isBackground = new Uint8Array(w * h)
      const queue = new Int32Array(w * h)
      let head = 0
      let tail = 0

      const pushIfBg = (px: number, py: number) => {
        const idx = py * w + px
        if (visited[idx]) return
        visited[idx] = 1
        const o = idx * 4
        const dr = data[o] - bgR
        const dg = data[o + 1] - bgG
        const db = data[o + 2] - bgB
        const distSq = dr * dr + dg * dg + db * db
        if (distSq < 34 * 34) {
          isBackground[idx] = 1
          queue[tail++] = idx
        }
      }

      // Seed flood-fill from top, left, and right perimeter (leave bottom gown untouched)
      for (let x = 0; x < w; x++) {
        pushIfBg(x, 0)
      }
      for (let y = 0; y < h; y++) {
        pushIfBg(0, y)
        pushIfBg(w - 1, y)
      }

      while (head < tail) {
        const curr = queue[head++]
        const cx = curr % w
        const cy = (curr - cx) / w
        if (cx > 0) pushIfBg(cx - 1, cy)
        if (cx + 1 < w) pushIfBg(cx + 1, cy)
        if (cy > 0) pushIfBg(cx, cy - 1)
        if (cy + 1 < h) pushIfBg(cx, cy + 1)
      }

      // Apply transparency and 1-pixel edge feathering
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = y * w + x
          if (isBackground[idx]) {
            data[idx * 4 + 3] = 0
            continue
          }

          // Check if adjacent to background for smooth feather
          const nearBg =
            (x > 0 && isBackground[idx - 1]) ||
            (x + 1 < w && isBackground[idx + 1]) ||
            (y > 0 && isBackground[idx - w]) ||
            (y + 1 < h && isBackground[idx + w])

          if (nearBg) {
            data[idx * 4 + 3] = 155
          }
        }
      }

      // Fade bottom 6% gently so gown blends into crimson dais/seat
      const fadeStart = Math.floor(h * 0.93)
      for (let y = fadeStart; y < h; y++) {
        const factor = 1 - (y - fadeStart) / (h - fadeStart)
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4 + 3
          data[idx] = Math.round(data[idx] * factor)
        }
      }

      ctx.putImageData(imageData, 0, 0)
      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.needsUpdate = true
      resolve(tex)
    }
    img.onerror = (err) => reject(err)
    img.src = url
  })
}
