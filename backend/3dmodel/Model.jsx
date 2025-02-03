import { Canvas } from '@react-three/fiber'
import { ThreeDModel } from './config/TheeDModel'
import { ControlsOverlay } from './config/ControlsOverlay'
import { useState } from 'react'
import { ModelSelector } from './config/ModelSelector'

function Model() {
  const [currentModel, setCurrentModel] = useState('B4_4-v1')

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute',
      overflow: 'hidden'}}>
      <Canvas>
        <color attach="background" args={['#101020']} />
        <fog attach="fog" args={['#101020', 1, 80]} /> 
        <ThreeDModel modelName={currentModel} texturesName={currentModel}/>
      </Canvas>
      <ControlsOverlay/>
      <ModelSelector onModelChange={setCurrentModel} />
    </div>
  )
}

export default Model