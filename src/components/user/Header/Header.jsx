import './Header.css';
import Logo from '../../../assets/img/logo.png';

export default function Header() {
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
                    <a href="index.html" className="logo d-flex align-items-center">
                        <img src={Logo} alt="Logo" />
                    </a>

                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li><a href="#hero" className="active"><i className="bi bi-house-door"></i>Home</a></li>
                            <li><a href="#about"><i className="bi bi-info-square"></i>About</a></li>
                            <li><a href="#services"><i className="bi bi-shop"></i>Services</a></li>
                            <li className="dropdown">
                                <a href="#"><i className="bi bi-building"></i><span>Buildings</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                                <ul>
                                    <li><a href="#">Building 1</a></li>
                                    <li><a href="#">Building 2</a></li>
                                    <li><a href="#">Building 3</a></li>
                                    <li><a href="#">Building 4</a></li>
                                    <li><a href="#">Building 5</a></li>
                                </ul>
                            </li>
                            <li className="dropdown">
                                <a href="#"><i className="bi bi-building-gear"></i><span>Facilities</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                                <ul>
                                    <li><a href="#">Facilities 1</a></li>
                                    <li><a href="#">Facilities 2</a></li>
                                </ul>
                            </li>
                            <li><a href="#services"><i className="fas fa-star"></i>Discover</a></li>
                            <li><a href="#contact"><i className="bi bi-telephone-inbound"></i>Contact</a></li>
                            <li><a href="#login"><i className="bi bi-person"></i> Sign in</a></li>
                        </ul>
                    </nav>
                    <a className="cta-btn" href="index.html#appointment">Access Your Account</a>
                </div>
            </div>
        </header>
    );
}
