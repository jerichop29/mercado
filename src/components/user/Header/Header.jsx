import './Header.css';
import Logo from '../../../assets/img/logo.png';
import { Link, useLocation } from 'react-router-dom'; // Import Link and useLocation

export default function Header() {
    const location = useLocation(); // Get current location (route)

    return (
        <header id="header" className="header sticky-top">
            <div className="topbar d-flex align-items-center">
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="d-none d-md-flex align-items-center">
                        <i className="bi bi-globe"></i>&nbsp;Mercado De Calamba Official Website
                    </div>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-phone me-1"></i> Call us now (+63) 9426912070
                    </div>
                </div>
            </div>

            <div className="branding d-flex align-items-center">
                <div className="container position-relative d-flex justify-content-between align-items-center">
                    <Link to="/" className="logo d-flex align-items-center">
                        <img src={Logo} alt="Logo" />
                    </Link>

                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li>
                                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                                    <i className="bi bi-house-door"></i>&nbsp;Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                                    <i className="bi bi-info-square"></i>&nbsp;About
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>
                                    <i className="bi bi-shop"></i>&nbsp;Services
                                </Link>
                            </li>
                            <li className="dropdown">
                                <a href="#">
                                    <i className="bi bi-building"></i>
                                    <span>&nbsp;Stalls</span>
                                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                                </a>
                                <ul>
                                    <li>       
                                        <Link to="/all buildings" className={location.pathname === '/all buildings' ? 'active' : ''}> All Buildings</Link>
                                    </li>
                                    <li>       
                                        <Link to="/building 1" className={location.pathname === '/building 1' ? 'active' : ''}> Building 1</Link>
                                    </li>
                                    <li>       
                                        <Link to="/building 2" className={location.pathname === '/building 2' ? 'active' : ''}> Building 2</Link>
                                    </li>
                                    <li>       
                                        <Link to="/building 3" className={location.pathname === '/building 3' ? 'active' : ''}> Building 3</Link>
                                    </li>
                                    <li>       
                                        <Link to="/building 4" className={location.pathname === '/building 4' ? 'active' : ''}> Building 4</Link>
                                    </li>
                                    <li>       
                                        <Link to="/building 5" className={location.pathname === '/building 5' ? 'active' : ''}> Building 5</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="#">
                                    <i className="bi bi-building"></i>
                                    <span>&nbsp;Facilities</span>
                                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                                </a>
                                <ul>
                                    <li>       
                                        <Link to="/all facilities" className={location.pathname === '/all facilities' ? 'active' : ''}> All Facilities</Link>
                                    </li>
                                    <li>       
                                        <Link to="/facility 1" className={location.pathname === '/facility 1' ? 'active' : ''}> Facility 1</Link>
                                    </li>
                                    <li>       
                                        <Link to="/facility 2" className={location.pathname === '/facility 2' ? 'active' : ''}> Facility 2</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/discover" className={location.pathname === '/discover' ? 'active' : ''}>
                                    <i className="fas fa-star"></i>&nbsp;Discover
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                                    <i className="bi bi-telephone-inbound"></i>&nbsp;Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* Updated link for accessing account */}
                    <Link className="cta-btn" to="/auth/signin">
                        <i className="bi bi-person-square"></i>&nbsp;&nbsp;Access Your Account
                    </Link>
                </div>
            </div>
        </header>
    );
}
