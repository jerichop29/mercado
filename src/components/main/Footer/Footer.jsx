import './Footer.css';
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <footer id="footer" className="footer light-background">
            <div className="container footer-top">
                <div className="row gy-4">
                    <div className="col-lg-4 col-md-6 footer-contact">
                        <a href="index.html" className="logo d-flex align-items-center">
                            <span className="sitename">Mercado De Calamba</span>
                        </a>
                        <div className="footer-contact pt-3">
                            <p>Bldg 1, Calamba City Public Market,</p>
                            <p>Pabalan St, Calamba, 4027 Laguna</p>
                            <p className="mt-3">
                                <strong>Phone:</strong> 
                                <a href="tel:+639426912070"> (+63) 9426912070</a>
                            </p>
                            <p>
                                <strong>Email:</strong> 
                                <a href="mailto:mdc.marketmanagementdivision@gmail.com"> mdc.marketmanagementdivision@gmail.com</a>
                            </p>
                        </div>
                        <div className="social-links d-flex mt-4">
                            <a href="https://www.facebook.com/profile.php?id=100085059805113" target='_blank'><i className="bi bi-facebook"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 footer-links">
                        <h4>Useful Links</h4>
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
                            <li>       
                                <Link to="/all-buildings" className={location.pathname === '/all-buildings' ? 'active' : ''}>
                                <i className="bi bi-building"></i>&nbsp;Stalls
                                </Link>
                            </li>
                            <li>       
                                <Link to="/all-facilities" className={location.pathname === '/all-facilities' ? 'active' : ''}>
                                <i className="bi bi-building-gear"></i>&nbsp;Facilities
                                </Link>
                            </li>
                            <li>
                                <Link to="/discover" className={location.pathname === '/discover' ? 'active' : ''}>
                                    <i className="bi bi-calendar-event"></i>&nbsp;Discover
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                                    <i className="bi bi-telephone-inbound"></i>&nbsp;Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-6 footer-links">
                        <h4>Site Services</h4>
                        <ul>
                            <li><a>Stalls Rental Appointment</a></li>
                            <li><a>Facility Rental Appointment </a></li>
                            <li><a>Discover Event</a></li>
                            <li><a>Complaint Management for Owner's</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <h4>About</h4>
                        <p>Mercado De Calamba is a vibrant marketplace known for its rich cultural heritage and bustling atmosphere, offering a variety of local products and services.</p>
                        <p>Experience the true essence of Calamba through its market, where tradition meets modernity, providing a unique shopping and social experience for all visitors.</p>
                    </div>
                </div>
            </div>

            <div className="container copyright text-center mt-4">
                <p>© <span>Copyright</span> <strong className="px-1 sitename">Mercado De Calamba</strong> <span>All Rights Reserved</span></p>
                <div className="credits">
                    Designed by Calamba City Hall ICT Department Distributed by <a href="https://www.calambacity.gov.ph/Users/DepartmentHome/City_planning_and_development_office">City Planning and Devopment Office</a>
                </div>
            </div>
        </footer>
    );
}