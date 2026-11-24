import gsap from 'gsap'
import * as THREE from 'three'

export interface CameraPose {
  position: [number, number, number]
  target: [number, number, number]
}

export const INTRO_CAMERA_POSE: CameraPose = {
  position: [0, 2.55, 8.6],
  target: [0, 1.7, -2.85],
}

export function animateCameraToPose(
  camera: THREE.Camera,
  lookAtTarget: THREE.Vector3,
  destination: CameraPose,
  reducedMotion: boolean,
  duration = 1.05,
  onFrameInvalidate?: () => void,
): gsap.core.Tween[] {
  gsap.killTweensOf(camera.position)
  gsap.killTweensOf(lookAtTarget)

  if (reducedMotion) {
    camera.position.set(...destination.position)
    lookAtTarget.set(...destination.target)
    camera.lookAt(lookAtTarget)
    onFrameInvalidate?.()
    return []
  }

  const posTween = gsap.to(camera.position, {
    x: destination.position[0],
    y: destination.position[1],
    z: destination.position[2],
    duration,
    ease: 'power2.inOut',
    onUpdate: () => {
      onFrameInvalidate?.()
    },
  })

  const targetTween = gsap.to(lookAtTarget, {
    x: destination.target[0],
    y: destination.target[1],
    z: destination.target[2],
    duration,
    ease: 'power2.inOut',
    onUpdate: () => {
      camera.lookAt(lookAtTarget)
      onFrameInvalidate?.()
    },
  })

  return [posTween, targetTween]
}
