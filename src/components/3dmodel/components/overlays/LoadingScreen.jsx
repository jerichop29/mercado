import { Html } from '@react-three/drei';
import { useState } from 'react';
import '../../styles/LoadingScreen.css'; // Import the CSS file

function Loader({ onStartLoading }) {
    const [loading, setLoading] = useState(false);

    const handleLoadModel = () => {
        setLoading(true); // Set loading state
        setTimeout(() => {
            onStartLoading();
        }, 500); // Simulate a slight delay before loading
    };

    return (
        <Html center>
            <div className="loader-container">
                {!loading ? (
                    <div>
                        <button 
                            onClick={handleLoadModel} 
                            className="loader-button"
                        >
                            Load Map
                        </button>
                        <div className="loading-text"></div> {/* Hidden by default */}
                    </div>
                ) : (
                    <div>
                        <div className="loading-bar-container">
                            <div className="loading-bar" id="loading-bar" />
                        </div>
                        <div className="loading-text loading">
                            Loading Map
                        </div>
                    </div>
                )}
            </div>
        </Html>
    );
}

export default Loader;
