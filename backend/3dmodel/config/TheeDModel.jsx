import { Environment, Stars} from '@react-three/drei'
import { Scene } from './Scene'
import { CameraSetup } from './CameraSetup'
import { Suspense } from 'react'
import PropTypes from 'prop-types'
function ThreeDModel ( {modelName}){
    if (!modelName ) {
        console.warn('Scene: modelUrl and texturesName are required parameters')
        return null
      }
    return (<Suspense fallback={null}>
        <CameraSetup />
        <Scene modelName={modelName} />
        
        {/* Environment lighting */}
        <Environment
          preset="lobby" // Try: 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'
          background // Shows the environment map as a background
          blur={0.8} // Blur factor between 0 and 1
        />
        
        {/* Supplementary lights */}
        <ambientLight intensity={1.0} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
        />
      </Suspense>)
}
ThreeDModel.propTypes = {
    modelName: PropTypes.string.isRequired,
  }
export { ThreeDModel }