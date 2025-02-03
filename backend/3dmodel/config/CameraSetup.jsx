import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { Controls } from './Controls'

function CameraSetup() {
    const { camera } = useThree()
    
    useEffect(() => {
      // Set initial camera position
      camera.position.set(0,8,10)
      camera.lookAt(0,10,0)
      camera.updateProjectionMatrix()
      
        // Optional: Set camera FOV (Field of View)
        camera.fov = 7
        camera.updateProjectionMatrix()
    }, [camera])

    return (
      <Controls />
    )
  }
export {CameraSetup}