import { useGLTF, Html } from '@react-three/drei'
import { Controls } from './Controls'
import { useState, Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import PropTypes from 'prop-types'
import Loader from './overlays/LoadingScreen'


function Model({ url }) {
  const { nodes } = useGLTF(url)
  const [selectedMesh, setSelectedMesh] = useState(null)
  const [greenMeshes, setGreenMeshes] = useState(new Set())
  const [glowingMeshes, setGlowingMeshes] = useState(new Set()) // Track glowing state
  const [additionalInfo, setAdditionalInfo] = useState('') // State to hold additional information
  
  // Define which geometries should be black
  const vacantStalls = ['1','2','3','8','11','12','16','Stall_light_1'];
  
  // Create a glowing material
  const glowMaterial = new THREE.MeshStandardMaterial({ 
    color: '#231513',
    emissive: '#231513',
    emissiveIntensity: 5  ,
    toneMapped: false
  })
  
  // Create a regular material for non-glowing meshes
  const greenMaterial = new THREE.MeshStandardMaterial({ 
    color: '#88ff88',
    roughness: 2,
    metalness: 1.5,
    opacity: 0.5
  })

  // Effect to handle key press events
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && selectedMesh) {
        // Display additional information for the selected mesh
        //TODO: ADD MODAL FUNCTION
        alert(`Additional info for ${selectedMesh}: ${additionalInfo}`);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedMesh, additionalInfo]); // Dependencies include selectedMesh and additionalInfo

  return (
    <>
      <EffectComposer>
        <Bloom 
          intensity={.1}
          threshold={0.5}
          mipmapBlur
          luminanceSmoothing={0.9}
        />
      </EffectComposer>

      <group onClick={(e) => {
        if (e.object.type === 'Scene') {
          setGreenMeshes(new Set())
          setGlowingMeshes(new Set(vacantStalls))
          setSelectedMesh(null)
        }
      }}>
        {Object.keys(nodes).map((nodeName) => {
          const mesh = nodes[nodeName]
          if (mesh.isMesh) {
            const worldPosition = mesh.getWorldPosition(new THREE.Vector3())
            const commonShapes = ['Plane', 'Cube', 'Sphere', 'Cylinder', 'Cone', 'Torus', 'Circle','light','Text'];
            const isSelectable = nodeName.length <= 16 && 
                                nodeName != 'RoadMap' && 
                                nodeName != 'Stairs' &&
                                !commonShapes.some(shape => nodeName.includes(shape));
            
            // Check current state
            const isGlowing = glowingMeshes.has(nodeName);
            const isGreen = greenMeshes.has(nodeName);
            
            // Choose material based on current state
            const materialToUse = isGlowing ? glowMaterial : 
                                isGreen ? greenMaterial : 
                                mesh.material;

            return (
              <mesh
                key={nodeName}
                geometry={mesh.geometry}
                material={materialToUse}
                position={worldPosition}
                rotation={mesh.rotation}
                scale={mesh.scale}
                onClick={(e) => {
                  if (!isSelectable) return;
                  e.stopPropagation()
                  setSelectedMesh(nodeName)
                  
                  if (vacantStalls.includes(nodeName)) {
                    // Toggle between glow and green for special geometries
                    setGlowingMeshes(prev => {
                      const newSet = new Set(prev)
                      if (newSet.has(nodeName)) {
                        newSet.delete(nodeName)
                        // Add to green meshes when glow is turned off
                        setGreenMeshes(prev => new Set([...prev, nodeName]))
                      } else {
                        newSet.add(nodeName)
                        // Remove from green meshes when glow is turned on
                        setGreenMeshes(prev => {
                          const newGreenSet = new Set(prev)
                          newGreenSet.delete(nodeName)
                          return newGreenSet
                        })
                      }
                      return newSet
                    })
                  } else {
                    // Regular toggle for non-glowing meshes
                    setGreenMeshes(prev => {
                      const newSet = new Set(prev)
                      if (newSet.has(nodeName)) {
                        newSet.delete(nodeName)
                      } else {
                        newSet.add(nodeName)
                      }
                      return newSet
                    })
                  }
                  // Set additional information based on the selected mesh
                  setAdditionalInfo(`Details about ${nodeName}`);
                }}
            onDoubleClick={()=>{
              if (!isSelectable) return;
              {selectedMesh === nodeName && isSelectable && (
                //TODO: ADD MODAL FUNCTION
                alert(`Additional info for ${selectedMesh}: ${additionalInfo}`)
                )}
           
            }}
            
                onPointerMissed={() => {
                  setSelectedMesh(null)
                  setGreenMeshes(new Set())
                  setGlowingMeshes(new Set(vacantStalls))
                }}
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
                
              </mesh>
            )
          }
          return null
        })}
      </group>
    </>
  )
}

function Scene({modelName}) {
  const [loading, setLoading] = useState(false);

  const handleStartLoading = () => {
    setLoading(true);
  };

  if (!modelName) {
    console.warn('Scene: modelUrl is a required parameter')
    return null
  }

  const model = modelName
    ? `/models/${modelName}.glb`
    : '/models/B1_1-v1.glb'

  return (
    <>
      <Controls />
      <Suspense style={{ zIndex:-9999 }} fallback={<Loader loading={loading} />}>
        {loading ? <Model url={model} /> : <Loader loading={loading} onStartLoading={handleStartLoading} />}
      </Suspense>
    </>
  )
}
/*<mesh>
        <meshStandardMaterial map={textureUrl} />
      </mesh>*/ 
// Add PropTypes for better validation
Scene.propTypes = {
  modelName: PropTypes.string.isRequired
}
export {Scene};
