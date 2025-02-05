import { Html } from '@react-three/drei'
import { useState } from 'react'
import './css/LoadingScreen.css'; // Import the new CSS file

function Loader({ onStartLoading }) {
    const [loading, setLoading] = useState(false)
    const handleLoadModel = (shouldLoad) =>{
        setLoading(shouldLoad);
        setTimeout(() => {
            onStartLoading();
          }, 1000); // Delay before loading starts
         
    }

    return (
      <Html center>
        <div className="loader-container">
          {!loading ? (
            <div>
              <button 
                onClick={() => handleLoadModel(true)}
                className="loader-button"
              >
                Load Map
              </button>
              <div className="loading-text">
              </div>
            </div>
          ) : (
            <div>
              <div className="loading-bar-container">
                <div className="loading-bar" id="loading-bar" />
              </div>
              <div className="loading-text">
                Loading Map ...
              </div>
            </div>
          )}
        </div>
      </Html>
    )
  }
  
  export default Loader;