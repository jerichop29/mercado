import { OrbitControls } from '@react-three/drei'

function Controls() {
  return <OrbitControls 
  autoRotate ={false}
  autoRotateSpeed={0.28}
  makeDefault
  enableDamping
  dampingFactor={0.05}
  minDistance={0}
  maxDistance={20}
  minPolarAngle={Math.PI / 4}
  maxPolarAngle={Math.PI / 2} 
  enablePan={true}
  enableZoom={true}
  rotateSpeed={0.3}
  touchAngularSpeed={0.3}
  enableRotate={true}
/>  
} 
export {Controls}