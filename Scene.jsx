import { useGLTF, useTexture, Html } from '@react-three/drei'
import { Controls } from './Controls'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import PropTypes from 'prop-types'
function Model({ url }) {
  const { nodes } = useGLTF(url)
  const [selectedMesh, setSelectedMesh] = useState(null)
  const [greenMeshes, setGreenMeshes] = useState(new Set())
  
  // Create a semi-transparent green overlay material
  const greenMaterial = new THREE.MeshStandardMaterial({ 
    color: '#10ff88',
    roughness: 2,
    metalness: 1.5,
    opacity: 0.5                                                ,
  })
  
  return (
    <group onClick={(e) => {
      // If clicking the background, reset all meshes
      if (e.object.type === 'Scene') {
        setGreenMeshes(new Set())
        setSelectedMesh(null)
      }
    }}>
      {Object.keys(nodes).map((nodeName) => {
        const mesh = nodes[nodeName]
        if (mesh.isMesh) {
          const worldPosition = mesh.getWorldPosition(new THREE.Vector3())
          const isSelectable = nodeName.length <= 16 && nodeName != 'RoadMap' && nodeName != 'Stairs';
          return (
            <mesh
              key={nodeName}
              geometry={mesh.geometry}
              material={greenMeshes.has(nodeName) ? greenMaterial : mesh.material}
              position={worldPosition}
              rotation={mesh.rotation}
              scale={mesh.scale}
              //Add Function Call here
              onClick={(e) => {
                if (!isSelectable) return;
                e.stopPropagation()
                setSelectedMesh(nodeName)
                setGreenMeshes(prev => {
                  const newSet = new Set(prev)
                  if (newSet.has(nodeName)) { 
                    newSet.delete(nodeName)
                  } else {
                    newSet.add(nodeName)
                  }
                  return newSet
                })
              }}
              onPointerMissed={() => {
                setSelectedMesh(null)
                setGreenMeshes(new Set())
              }}
              // Highlight on hover
              onPointerOver={(e) => {
                if (!isSelectable) return;
                e.stopPropagation()
                document.body.style.cursor = 'pointer'
              }}
              onPointerOut={() => {
                if (!isSelectable) return;
                document.body.style.cursor = 'default'
              }}
            >
              {selectedMesh === nodeName && isSelectable && (
                //insert Modal here to be displayed if click 
                <Html position={[0, 0, 0]} center>
                  <div style={{
                    background: 'rgba(255,255,255,0.8)',
                    color: 'black',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    transform: 'translate3d(-50%, -50%, 0)',
                    pointerEvents: 'none'
                  }}>
                    {nodeName}
                  </div>
                </Html>
              )}
            </mesh>
          )
        }
        return null
      })}
    </group>
  )
}

function Scene({modelName,texturesName}) {
  if (!modelName || !texturesName) {
    console.warn('Scene: modelUrl and texturesName are required parameters')
    return null
  }
   // Check for undefined or null values
  const model = modelName
    ? `/models/${modelName}.glb`
    : '/models/B4_4.glb'
  const texture = texturesName 
    ? `/textures/${texturesName}.png`
    : '/textures/B4_4.png'
  const textureUrl = useTexture(texture)
  return (
    <>
      <Controls />
      <Model url={model} />
      
    </>
  )
}
/*<mesh>
        <meshStandardMaterial map={textureUrl} />
      </mesh>*/ 
// Add PropTypes for better validation
Scene.propTypes = {
  modelName: PropTypes.string.isRequired,
  texturesName: PropTypes.string.isRequired
}
export {Scene};
