import './Header.css';
import Logo from '/assets/img/logo.png';
import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { isAuthenticated } from '../../../utils/auth';

export default function Header() {
    const location = useLocation(); // Get current location (route)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to track mobile menu visibility
    const [openDropdown, setOpenDropdown] = useState(null); // State to track which dropdown is open

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle the mobile menu
    };

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown); // Toggle dropdown
    };

    return (
        <header id="" className="header sticky-top">
            <div className="topbar d-flex align-items-center">
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="d-none d-md-flex align-items-center">
                        <i className="bi bi-phone me-1"></i>Call us now (+63) 9426912070
                    </div>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-globe me-1"></i> Mercado De Calamba Official Website
                    </div>
                </div>
            </div>

            <div className="branding d-flex align-items-center">
                <div className="container position-relative d-flex justify-content-between align-items-center">
                    <Link to="/" className="logo d-flex align-items-center">
                        <img src={Logo} alt="Logo" />
                    </Link>

                    <div id="navmenu" className={`navmenu ${isMobileMenuOpen ? 'mobile-nav-active' : ''}`}>
                        <ul className='navmenu-content'>
                            <li>
                                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                                    <i className="bi bi-house-door"></i>&nbsp;&nbsp;Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                                    <i className="bi bi-info-square"></i>&nbsp;&nbsp;About
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>
                                    <i className="bi bi-shop"></i>&nbsp;&nbsp;Services
                                </Link>
                            </li>
                            <li className="dropdown">
                                <a onClick={() => toggleDropdown('stalls')}>
                                    <i className="bi bi-building"></i>
                                    <span>&nbsp;&nbsp;Stalls</span>
                                    <i id="toggle-dropdown" className="bi bi-chevron-down toggle-dropdown"></i>
                                </a>
                                <ul className={openDropdown === 'stalls' ? 'dropdown-active' : ''}>
                                    <li>       
                                        <Link to="/all-buildings" className={location.pathname === '/all-buildings' ? 'active' : ''}> All Buildings</Link>
                                    </li>
                                    <li>       
                                        <Link to="/building-1" className={location.pathname === '/building-1' ? 'active' : ''}> Building 1</Link>
                                    </li>
                                    <li>       
                                        <Link to="/building-2" className={location.pathname === '/building-2' ? 'active' : ''}> Building 2</Link>
                                    </li>
                                    <li>       
                                        <Link to="/building-3" className={location.pathname === '/building-3' ? 'active' : ''}> Building 3</Link>
                                    </li>
                                    <li>       
                                        <Link to="/building-4" className={location.pathname === '/building-4' ? 'active' : ''}> Building 4</Link>
                                    </li>
                                    <li>       
                                        <Link to="/building-5" className={location.pathname === '/building-5' ? 'active' : ''}> Building 5</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a onClick={() => toggleDropdown('facilities')}>
                                    <i className="bi bi-building-gear"></i>
                                    <span>&nbsp;&nbsp;Facilities</span>
                                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                                </a>
                                <ul className={openDropdown === 'facilities' ? 'dropdown-active' : ''}>
                                    <li>       
                                        <Link to="/all-facilities" className={location.pathname === '/all-facilities' ? 'active' : ''}> All Facilities</Link>
                                    </li>
                                    <li>       
                                        <Link to="/facility-1" className={location.pathname === '/facility-1' ? 'active' : ''}> Facility 1</Link>
                                    </li>
                                    <li>       
                                        <Link to="/facility-2" className={location.pathname === '/facility-2' ? 'active' : ''}> Facility 2</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/discover" className={location.pathname === '/discover' ? 'active' : ''}>
                                    <i className="bi bi-calendar-event"></i>&nbsp;&nbsp;Discover
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                                    <i className="bi bi-telephone-inbound"></i>&nbsp;&nbsp;Contact
                                </Link>
                            </li>
                            <li>
                            {!isAuthenticated()&&isMobileMenuOpen&&(
                                <Link className="" to="/auth/signin">
                                    <i className="bi bi-person-square"></i>&nbsp;&nbsp;Access Your Account
                                </Link>)}
                                {isAuthenticated()&&isMobileMenuOpen&&(
                                <Link className="" to="/user/dashboard">
                                    <i className="bi bi-house"></i>&nbsp;&nbsp;Return to Dashboard
                                </Link>)}
                            </li>
                           
                        </ul>
                    </div>
                    {/* Mobile Menu Toggle Button */}
                    <div
                        className="mobile-nav-toggle d-md-none"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle Menu"
                    >
                        <i className={`bi bi-${isMobileMenuOpen ? 'x' : 'list'}`}></i> {/* Toggle icon */}
                    </div>
                    {/* Updated link for accessing account */}
                    {!isAuthenticated()&&(
                    <Link className="cta-btn" to="/auth/signin">
                        <i className="bi bi-person-square"></i>&nbsp;&nbsp;Access Your Account
                    </Link>)}
                    {isAuthenticated()&&(
                    <Link className="cta-btn" to="/user/dashboard">
                        <i className="bi bi-house"></i>&nbsp;&nbsp;Return to Dashboard
                    </Link>)}
                </div>
            </div>
        </header>
    );
}