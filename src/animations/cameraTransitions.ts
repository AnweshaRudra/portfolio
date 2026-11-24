import gsap from 'gsap'
import * as THREE from 'three'

export interface CameraPose {
  position: [number, number, number]
  target: [number, number, number]
}

export const INTRO_CAMERA_POSE_DESKTOP: CameraPose = {
  position: [-1.2, 2.45, 8.9],
  target: [-1.35, 1.68, -2.85],
}

export const INTRO_CAMERA_POSE_MOBILE: CameraPose = {
  position: [0, 2.35, 10.4],
  target: [0, 0.65, -2.85],
}

export const INTRO_CAMERA_POSE = INTRO_CAMERA_POSE_DESKTOP

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
