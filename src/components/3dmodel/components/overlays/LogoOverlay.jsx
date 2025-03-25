import React from 'react';
import '../../styles/LogoOverlay.css'
import Logo from '/assets/img/logo.png';
const LogoOverlay = () => {
    return (
        <div className='logo_3D'>
            <img src={Logo} alt="Logo"  />
        </div>
    );
};

export default LogoOverlay; 