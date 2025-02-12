import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ThreeEnvironment } from './config/ThreeEnvironment'
import { ControlsOverlay } from './config/overlays/ControlsOverlay'
import LogoOverlay from './config/overlays/LogoOverlay'
import ModelSelector from './config/overlays/ModelSelector'
import './ThreeDModel.css'
import { ModalOpen, stallName, setModalOpen, setStallName ,handleCloseModal} from './config/Model'
import Modal from '../main/Modal/Modal'

function ThreeDModel({ models }) {
  const [currentModel, setCurrentModel] = useState(models[0].id)

  useEffect(() => {
    console.log(ModalOpen, stallName)
  }, [ModalOpen, stallName])

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
      {ModalOpen &&  (
        <Modal isOpen={ModalOpen} stallName={stallName} onClose={this.handleCloseModal} />
      )}
    </center>
  )
}

export default ThreeDModel