import gsap from 'gsap'
import * as THREE from 'three'

export interface CameraPose {
  position: [number, number, number]
  target: [number, number, number]
}

export const INTRO_CAMERA_POSE: CameraPose = {
  position: [0, 2.3, 9.2],
  target: [0, 1.8, -2.5],
}

export function animateCameraToPose(
  camera: THREE.Camera,
  lookAtTarget: THREE.Vector3,
  destination: CameraPose,
  reducedMotion: boolean,
  duration = 1.05,
): gsap.core.Tween[] {
  gsap.killTweensOf(camera.position)
  gsap.killTweensOf(lookAtTarget)

  if (reducedMotion) {
    camera.position.set(...destination.position)
    lookAtTarget.set(...destination.target)
    camera.lookAt(lookAtTarget)
    return []
  }

  const posTween = gsap.to(camera.position, {
    x: destination.position[0],
    y: destination.position[1],
    z: destination.position[2],
    duration,
    ease: 'power2.inOut',
  })

  const targetTween = gsap.to(lookAtTarget, {
    x: destination.target[0],
    y: destination.target[1],
    z: destination.target[2],
    duration,
    ease: 'power2.inOut',
    onUpdate: () => {
      camera.lookAt(lookAtTarget)
    },
  })

  return [posTween, targetTween]
}
