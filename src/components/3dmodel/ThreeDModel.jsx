import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ThreeEnvironment } from './config/ThreeEnvironment'
import { ControlsOverlay } from './config/overlays/ControlsOverlay'
import LogoOverlay from './config/overlays/LogoOverlay'
import ModelSelector from './config/overlays/ModelSelector'
import './ThreeDModel.css'

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