import { Html } from '@react-three/drei'
import { useState } from 'react'

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
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000
        }}>
          {!loading ? (
            <div>
              <button 
                onClick={() => handleLoadModel(true)}
                style={{
                  padding: '10px 20px',
                  fontSize: '18px',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: 'transparent',
                  border: 'solid',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginBottom: '20px',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#009e70'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Load Map
              </button>
              <div style={{
                fontSize: '18px',
                fontWeight: '500',
                textAlign: 'center',
                color: 'white',
                marginTop: '10px',
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '1px'
              }}>
              </div>
            </div>
          ) : (
            <div>
              <div style={{
                width: '100%',
                height: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '5px',
                overflow: 'hidden',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#00ff88',
                  animation: 'loadingAnimation 3s linear forwards',
                }} id="loading-bar" />
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: '500',
                textAlign: 'center',
                color: 'white',
                marginTop: '10px',
                fontFamily: 'Arial, sans-serif',
                letterSpacing: '1px'
              }}>
                Loading Model...
              </div>
            </div>
          )}
          <style>
            {`
              @keyframes loadingAnimation {
                0% { width: 0%; }
                100% { width: 98%; }
              }
            `}
          </style>
        </div>
      </Html>
    )
  }
  
  export default Loader;