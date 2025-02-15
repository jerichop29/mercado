import React, { useState} from 'react'
import { Canvas } from '@react-three/fiber'
import { ThreeEnvironment } from '../components/core/ThreeEnvironment'
import { ControlsOverlay } from '../components/overlays/ControlsOverlay'
import LogoOverlay from '../components/overlays/LogoOverlay'
import ModelSelector from '../components/controls/ModelSelector'
import '../styles/ThreeDModel.css'

function ThreeDModel({ models }) {
  const [currentModel, setCurrentModel] = useState(models[0].id)

  return ( 
    <center>
      <div className="model-container">
        <LogoOverlay />
        <Canvas>
          <fog attach="fog" args={['#101020', .3, 30]} />
          <ThreeEnvironment modelName={currentModel} />
        </Canvas>
        {models.length > 1 && (
          <ModelSelector models={models} currentModel={currentModel} setCurrentModel={setCurrentModel} />
        )}
        <ControlsOverlay />
      </div>
    </center>
  )
}

export default ThreeDModel