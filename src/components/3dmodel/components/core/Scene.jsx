import { Controls } from '../controls/Controls'
import { useState, Suspense } from 'react'
import PropTypes from 'prop-types'
import Loader from '../overlays/LoadingScreen'
import { Model} from './Model'
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
      <Suspense >
        {loading ? <Model url={model} /> : <Loader onStartLoading={handleStartLoading} />}
      </Suspense>
      
    </>
    
  )
}

Scene.propTypes = {
  modelName: PropTypes.string.isRequired
}
export {Scene};
