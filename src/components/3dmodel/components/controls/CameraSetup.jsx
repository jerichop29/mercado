import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { Controls } from './Controls'

function CameraSetup({ scale = 1}) {
    const { camera } = useThree()
    
    useEffect(() => {
      // Set initial camera position based on scale
      camera.position.set(0 * scale, 5 * scale, 10 * scale)
      camera.lookAt(0, 5 * scale, 5 * scale)
      camera.updateProjectionMatrix()
      
      // Optional: Set camera FOV (Field of View)
      camera.fov = 45
      camera.updateProjectionMatrix()
    }, [camera, scale])

    return (
      <Controls />
    )
}

export { CameraSetup }