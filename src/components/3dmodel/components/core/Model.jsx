import { useGLTF, Html } from '@react-three/drei'
import { useState, useEffect } from 'react'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import stallHandler from '../../../../../backend/src/controllers/js/stallHandler'
import Modal from '../../../main/Modal/Modal'
import { CameraSetup } from '../controls/CameraSetup'
let ModalOpen = false;
let stallName = '';
let MeshScale = 1;
function setModalOpen(open) {
  ModalOpen = open;
}
function handleCloseModal(){
  setModalOpen(false)
}
function setStallName(name) {
  stallName = name;
}

function isOpen({ Open } = { Open: false }) {
  setModalOpen(Open);
  return Open; 
}

function setData({ data }) {
  setStallName(data);
  return data;
}

function Model({ url }) {
  const { nodes } = useGLTF(url)
  const [selectedMesh, setSelectedMesh] = useState(null)
  const [greenMeshes, setGreenMeshes] = useState(new Set())
  const [glowingMeshes, setGlowingMeshes] = useState(new Set()) // Track glowing state
  const [vacantStalls, setVacantStalls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const Close = () => {
    setIsModalOpen(false);
  }

  // Define which geometries should be black
  // Create a glowing material
  const glowMaterial = new THREE.MeshStandardMaterial({
    color: '#231513',
    emissive: '#231513',
    emissiveIntensity: 5,
    toneMapped: false
  })

  // Create a regular material for non-glowing meshes
  const greenMaterial = new THREE.MeshStandardMaterial({
    color: '#88ff88',
    roughness: 2,
    metalness: 1.7,
    opacity: 0.5
  })

  // Function to fetch stall data from the server
  const handleFetchData = async () => {
    try {
      const stall = await stallHandler.getStalls();

      // Filter stalls where Owner_Id is null
      const vacantStalls = stall.data.filter(stall =>
        stall.Status !== "Occupied"); // Fallback to an empty array if stall.data is undefined
      let vacantStallNames = ([]);
      if (url && url === '/models/B4_4-v1.glb') {
        vacantStallNames = vacantStalls.map(stall => stall.StallCode);
      }
      else {// Create an array of StallNames for vacant stalls
        vacantStallNames = vacantStalls.map(stall => stall.StallCode + "_Light");
      }
      // Set the state with the array of vacant stall names
      setVacantStalls(vacantStallNames);
      setGlowingMeshes(new Set(vacantStallNames));

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Effect to handle key press events
  useEffect(() => {
    handleFetchData();
  }, [])

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && selectedMesh) {
        // Display additional information for the selected mesh
        //TODO: ADD MODAL FUNCTION
        setIsModalOpen(true);
        setModalOpen(true);
        setData({ data: selectedMesh });
        isOpen({ Open: true });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedMesh]); // Dependencies include selectedMesh and additionalInfo
  let totalScale = 0;
  let meshCount = 0;
  
  Object.keys(nodes).forEach((nodeName) => {
    const mesh = nodes[nodeName];
    if (mesh.isMesh) {
      totalScale += (mesh.scale.x + mesh.scale.y + mesh.scale.z) / 3;
      meshCount++;
    }
  });
  
  const averageScale = meshCount > 0 ? totalScale / meshCount +.3 : 1;
  MeshScale = averageScale;
  console.log(MeshScale);
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
          setSelectedMesh(null)
        }
      }}>
        {Object.keys(nodes).map((nodeName) => {
          const mesh = nodes[nodeName]
          if (mesh.isMesh) {
            const worldPosition = mesh.getWorldPosition(new THREE.Vector3())
            const commonShapes = ['Plane', 'Cube', 'Sphere', 'Cylinder', 'Cone', 'Torus', 'Circle', 'Light', 'light', 'Text'];
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
                }}
                onDoubleClick={() => {
                  if (!isSelectable) return;
                  setIsModalOpen(true);
                  setModalOpen(true);
                  setData({ data: selectedMesh });
                 
                }}

                onPointerDown={innerWidth < 789 ? (e) => {
                  if (!isSelectable || e.pointerType !== 'touch') return; // Only proceed if it's a touch event
                  // Handle touch event for double-tap
                  if (selectedMesh === nodeName) {
                    setIsModalOpen(true);
                    setModalOpen(true);
                    setData({ data: selectedMesh });
                    // If the time between taps is less than 300ms, consider it a double-tap
                   
                  }
                } : undefined}

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
        <CameraSetup scale={MeshScale}/>
      {ModalOpen && (
        <Html>
          <div>
            <Modal isOpen={isModalOpen} onClose={Close} stallName={stallName} />
          </div>
        </Html>
      )}
    </>
  )
}

export { Model };
