import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ThreeDModel } from './config/ThreeDModel'
import {ControlsOverlay} from './config/overlays/ControlsOverlay'
import LogoOverlay from './config/overlays/LogoOverlay'
import ModelSelector from './config/overlays/ModelSelector'
import './Model.css'

function Model({ models }) {
  const [currentModel, setCurrentModel] = useState(models[0].id)

  return (
    <center>
      <div className="model-container">
        <LogoOverlay/>
        <Canvas>
          <fog attach="fog" args={['#101020', .3, 30]} /> 
          <ThreeDModel modelName={currentModel} />
        </Canvas>
        
        {models.length > 1 && (
          <ModelSelector models={models} currentModel={currentModel} setCurrentModel={setCurrentModel} />
        )}
        <ControlsOverlay/>
      </div>
    </center>
  )
}

export default Model