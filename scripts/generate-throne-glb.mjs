import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import * as THREE from 'three'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'

// Minimal FileReader polyfill for Node when GLTFExporter converts Blob -> ArrayBuffer
if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = class FileReader {
    result = null
    onloadend = null
    onerror = null
    readAsArrayBuffer(blob) {
      blob
        .arrayBuffer()
        .then((buf) => {
          this.result = buf
          this.onloadend?.({ target: this })
        })
        .catch((err) => {
          this.onerror?.(err)
        })
    }
  }
}

function buildSovereignThrone() {
  const root = new THREE.Group()
  root.name = 'SovereignThrone'

  const darkStoneMat = new THREE.MeshStandardMaterial({
    name: 'BasaltStone',
    color: 0x26211c,
    roughness: 0.9,
    metalness: 0.08,
  })

  const carvedStoneMat = new THREE.MeshStandardMaterial({
    name: 'CarvedStone',
    color: 0x332b23,
    roughness: 0.85,
    metalness: 0.12,
  })

  const forgedIronMat = new THREE.MeshStandardMaterial({
    name: 'ForgedIron',
    color: 0x35312e,
    roughness: 0.34,
    metalness: 0.84,
  })

  const darkSteelMat = new THREE.MeshStandardMaterial({
    name: 'DarkSteel',
    color: 0x23201e,
    roughness: 0.38,
    metalness: 0.88,
  })

  const royalGoldMat = new THREE.MeshStandardMaterial({
    name: 'RoyalGold',
    color: 0xb18a45,
    roughness: 0.28,
    metalness: 0.86,
  })

  const crimsonVelvetMat = new THREE.MeshStandardMaterial({
    name: 'CrimsonVelvet',
    color: 0x5c1819,
    roughness: 0.88,
    metalness: 0.04,
  })

  const emberGlowMat = new THREE.MeshStandardMaterial({
    name: 'EmberBed',
    color: 0xd96b27,
    emissive: 0xc84b14,
    emissiveIntensity: 1.4,
    roughness: 0.7,
  })

  // 1. Stepped octagonal dais plinth
  const tiers = [
    { rTop: 2.75, rBot: 2.95, h: 0.22, y: 0.11, mat: darkStoneMat },
    { rTop: 2.15, rBot: 2.32, h: 0.22, y: 0.33, mat: carvedStoneMat },
    { rTop: 1.55, rBot: 1.7, h: 0.2, y: 0.54, mat: darkStoneMat },
  ]
  for (const tier of tiers) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(tier.rTop, tier.rBot, tier.h, 8),
      tier.mat,
    )
    mesh.position.y = tier.y
    mesh.rotation.y = Math.PI / 8
    mesh.castShadow = true
    mesh.receiveShadow = true
    root.add(mesh)
  }

  // Gold inlay trim around upper dais
  const daisTrim = new THREE.Mesh(
    new THREE.TorusGeometry(1.56, 0.03, 8, 8),
    royalGoldMat,
  )
  daisTrim.rotation.x = Math.PI / 2
  daisTrim.rotation.z = Math.PI / 8
  daisTrim.position.y = 0.64
  root.add(daisTrim)

  // 2. Throne Seat Base & Crimson Cushion
  const seatGroup = new THREE.Group()
  seatGroup.position.set(0, 0.64, -0.05)

  const thronePedestal = new THREE.Mesh(
    new THREE.BoxGeometry(1.38, 0.56, 1.18),
    darkSteelMat,
  )
  thronePedestal.position.y = 0.28
  thronePedestal.castShadow = true
  thronePedestal.receiveShadow = true
  seatGroup.add(thronePedestal)

  // Chamfered front step under feet
  const footRest = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 0.14, 0.42),
    carvedStoneMat,
  )
  footRest.position.set(0, 0.07, 0.75)
  footRest.castShadow = true
  footRest.receiveShadow = true
  seatGroup.add(footRest)

  // Velvet cushion
  const cushion = new THREE.Mesh(
    new THREE.BoxGeometry(1.06, 0.14, 0.92),
    crimsonVelvetMat,
  )
  cushion.position.set(0, 0.61, 0.04)
  cushion.castShadow = true
  seatGroup.add(cushion)

  // Armrests with sculpted gold finials
  for (const side of [-1, 1]) {
    const armSupport = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.42, 1.05),
      forgedIronMat,
    )
    armSupport.position.set(side * 0.68, 0.74, 0.02)
    armSupport.castShadow = true
    seatGroup.add(armSupport)

    const armTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.1, 1.12),
      darkSteelMat,
    )
    armTop.position.set(side * 0.68, 0.96, 0.04)
    armTop.castShadow = true
    seatGroup.add(armTop)

    const finial = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.11, 0),
      royalGoldMat,
    )
    finial.position.set(side * 0.68, 1.02, 0.6)
    finial.castShadow = true
    seatGroup.add(finial)
  }

  // 3. High Gothic Backrest & Forged-Iron Crown Fan
  const backrest = new THREE.Mesh(
    new THREE.BoxGeometry(1.24, 2.15, 0.22),
    darkSteelMat,
  )
  backrest.position.set(0, 1.65, -0.44)
  backrest.castShadow = true
  backrest.receiveShadow = true
  seatGroup.add(backrest)

  const innerPanel = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 1.72, 0.06),
    crimsonVelvetMat,
  )
  innerPanel.position.set(0, 1.56, -0.32)
  seatGroup.add(innerPanel)

  // Flanking gothic side columns on backrest
  for (const side of [-1, 1]) {
    const pillar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.085, 0.11, 2.48, 8),
      forgedIronMat,
    )
    pillar.position.set(side * 0.64, 1.76, -0.44)
    pillar.castShadow = true
    seatGroup.add(pillar)

    const cap = new THREE.Mesh(
      new THREE.ConeGeometry(0.13, 0.34, 6),
      royalGoldMat,
    )
    cap.position.set(side * 0.64, 3.16, -0.44)
    cap.castShadow = true
    seatGroup.add(cap)
  }

  // Radial forged-iron blade spires behind backrest (13 original angular spires)
  const bladeCount = 13
  for (let i = 0; i < bladeCount; i++) {
    const norm = (i / (bladeCount - 1)) * 2 - 1 // -1 .. 1
    const angle = -norm * 0.42
    const height = 1.65 + (1 - Math.abs(norm)) * 1.15 + (i % 2 === 0 ? 0.16 : 0)
    const blade = new THREE.Mesh(
      new THREE.ConeGeometry(0.055, height, 4),
      i % 3 === 0 ? darkSteelMat : forgedIronMat,
    )
    blade.position.set(norm * 0.72, 2.25 + (1 - Math.abs(norm)) * 0.38, -0.58)
    blade.rotation.z = angle
    blade.rotation.x = -0.08
    blade.castShadow = true
    seatGroup.add(blade)
  }

  // Signature Royal Crest Astrolabe Ring above throne backrest
  const crestRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.42, 0.04, 10, 28),
    royalGoldMat,
  )
  crestRing.position.set(0, 2.95, -0.34)
  crestRing.castShadow = true
  seatGroup.add(crestRing)

  const crestCore = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.16, 0),
    royalGoldMat,
  )
  crestCore.position.set(0, 2.95, -0.34)
  crestCore.scale.set(0.75, 1.35, 0.5)
  seatGroup.add(crestCore)

  root.add(seatGroup)

  // 4. Flanking Wrought-Iron Braziers on outer plinth
  for (const side of [-1, 1]) {
    const brazier = new THREE.Group()
    brazier.position.set(side * 1.95, 0.22, 0.75)

    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.18, 0.95, 8),
      forgedIronMat,
    )
    stem.position.y = 0.48
    stem.castShadow = true
    brazier.add(stem)

    const bowl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.16, 0.24, 10),
      darkSteelMat,
    )
    bowl.position.y = 1.02
    bowl.castShadow = true
    brazier.add(bowl)

    const embers = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 10, 8),
      emberGlowMat,
    )
    embers.scale.set(1, 0.45, 1)
    embers.position.y = 1.12
    brazier.add(embers)

    root.add(brazier)
  }

  return root
}

async function main() {
  const scene = new THREE.Scene()
  const throne = buildSovereignThrone()
  scene.add(throne)

  const exporter = new GLTFExporter()
  const glbBuffer = await new Promise((resolveExport, rejectExport) => {
    exporter.parse(
      scene,
      (result) => resolveExport(result),
      (error) => rejectExport(error),
      { binary: true },
    )
  })

  const outputPath = resolve('public/models/sovereign-throne.glb')
  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, Buffer.from(glbBuffer))
  console.log(`Exported ${outputPath} (${glbBuffer.byteLength} bytes)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
