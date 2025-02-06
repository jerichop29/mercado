import React from 'react';

const LogoOverlay = () => {
    return (
        <div style={{
            position: 'absolute',
            top:  '27vh',
            left:  '5vw',
            zIndex: 12,
        }}>
            <img src="src/assets/img/logo.png" alt="Logo" style={{ width: window.innerWidth < 768 ? '35vw' : '10vw', height: 'auto' }} />
        </div>
    );
};

export default LogoOverlay; 