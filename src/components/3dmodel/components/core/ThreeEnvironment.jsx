import { Environment} from '@react-three/drei'
import { Scene } from './Scene'
import { CameraSetup } from '../controls/CameraSetup'
import { Suspense } from 'react'
import PropTypes from 'prop-types'

function ThreeEnvironment ( {modelName}){
    if (!modelName ) {
        console.warn('Scene: modelUrl are required parameters')
        return null
      }
    return (

    <Suspense fallback={null}>
      
        <Scene modelName={modelName} />

        {/* Environment lighting */}
        <Environment
          // Try: 'sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'
          background ={true} // Shows the environment map as a background
          // Blur factor between 0 and 1
        >
          <color attach="background" args={['#668']} /> {/* Set custom background color */}
        </Environment>
        {/* Supplementary lights */}
        <ambientLight intensity={1.0} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={2}
          castShadow

        />
        <directionalLight 
          position={[20, 20, 10]} 
          intensity={2}
          castShadow

        />
      </Suspense>
      )
}
ThreeEnvironment.propTypes = {
    modelName: PropTypes.string.isRequired,
  }
export { ThreeEnvironment }