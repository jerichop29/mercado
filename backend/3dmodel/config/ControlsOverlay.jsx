import { useState, useEffect } from 'react'

// Add styles for the animation
const styles = {
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
}

// Create a style tag for the keyframes
const styleSheet = document.createElement('style')
styleSheet.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
document.head.appendChild(styleSheet)

export function ControlsOverlay() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <>
      {/* Main controls overlay */}
      {isVisible && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          fontFamily: 'Poppins, sans-serif',
          zIndex: 1000,
          userSelect: 'none',
          maxWidth: '40vh',
          fontSize: isMobile ?'16px' :'24px',
          animation: 'fadeIn 0.5s ease-in-out'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '8px' 
          }}>
            <h4 style={{ margin: 0, fontSize: '14px' }}>Controls</h4>
            <button 
              onClick={() => setIsVisible(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize:  isMobile ?'16px' :'24px',
                padding: '0 4px'
              }}
            >
              ×
            </button>
          </div>
          
          <ul style={{ 
            margin: 0, 
            padding: '0 0 0 16px',
            lineHeight: '1.4'
          }}>
            {isMobile ? (
              <>
                <li>👆 Swipe: Rotate model</li>
                <li>🤏 Pinch: Zoom in/out</li>
                <li>👆 Tap object: View details</li>
              </>
            ) : (
              <>
                <li>🖱️ Left Click + Drag: Rotate</li>
                <li>🔍 Scroll: Zoom in/out</li>
                <li>👆 Click object: View details</li>
              </>
            )}
          </ul>
        </div>
      )}
      
      {/* Always-visible help button */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '52px',
            height: '52px',
            cursor: 'pointer',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize:  isMobile ?'16px' :'24px'
          }}
        >
          ?
        </button>
      )}
    </>
  )
}