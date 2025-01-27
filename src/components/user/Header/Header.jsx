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
                        <i className="bi bi-globe"></i> Mercado De Calamba Official Website
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
                                    <i className="bi bi-house-door"></i>Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                                    <i className="bi bi-info-square"></i>About
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>
                                    <i className="bi bi-shop"></i>Services
                                </Link>
                            </li>
                            <li className="dropdown">
                                <a href="#">
                                    <i className="bi bi-building"></i>
                                    <span>Stalls</span>
                                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                                </a>
                                <ul>
                                    <li><a href="#">All Stalls</a></li>
                                    <li><a href="#">Building 1</a></li>
                                    <li><a href="#">Building 2</a></li>
                                    <li><a href="#">Building 3</a></li>
                                    <li><a href="#">Building 4</a></li>
                                    <li><a href="#">Building 5</a></li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="#">
                                    <i className="bi bi-building-gear"></i>
                                    <span>Facilities</span>
                                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                                </a>
                                <ul>
                                    <li><a href="#">Facilities 1</a></li>
                                    <li><a href="#">Facilities 2</a></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/discover" className={location.pathname === '/discover' ? 'active' : ''}>
                                    <i className="fas fa-star"></i>Discover
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                                    <i className="bi bi-telephone-inbound"></i>Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* Updated link for accessing account */}
                    <Link className="cta-btn" to="/auth/signin">
                        <i className="bi bi-person-square"></i> Access Your Account
                    </Link>
                </div>
            </div>
        </header>
    );
}
