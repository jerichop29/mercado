import { useState, useEffect } from 'react'
import '../../styles/ControlsOverlay.css' // Import the CSS file

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
    }, 3000)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <>
      {/* Main controls overlay */}
      {isVisible && (
        <div className='controls-overlay' >
          <div className="controls-header">
            <h4>Controls</h4>
            <button className='controls-button' onClick={() => setIsVisible(false)}>
              ×
            </button>
          </div>
          <ul className="controls-list">
            {isMobile ? (
              <>
                <li>👆 Swipe: Rotate model</li>
                <li>🤏 Pinch: Zoom in/out</li>
                <li>👆 Double Tap object: View details</li>
              </>
            ) : (
              <>
                <li>🖱️ Left Click + Drag: Rotate </li>
                <li>🔍 Scroll: Zoom in/Zoom out </li>
                <li>👆 Double Click object: View details</li>
              </>
            )}
          </ul>
          {/* Legend for lights */}
          <div className="controls-legend">
            <h4>Legend:</h4>
            <ul>
              <li style={{ color: 'yellow' }}>💡 Light On: Owner Present</li>
              <li style={{ color: '#898' }}>💡 Light Off: Vacant</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Always-visible help button */}
      {!isVisible && (
        <button className="help-button" onClick={() => setIsVisible(true)}>
          ?
        </button>
      )}
    </>
  )
}
