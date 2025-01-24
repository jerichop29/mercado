import './Footer.css';

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
                            <p className="mt-3"><strong>Phone:</strong> <span>(+63) 9426912070</span></p>
                            <p><strong>Email:</strong> <span>mdc.marketmanagementdivision@gmail.com</span></p>
                        </div>
                        <div className="social-links d-flex mt-4">
                            <a href=""><i className="bi bi-twitter-x"></i></a>
                            <a href="https://www.facebook.com/profile.php?id=100085059805113" target='_blank'><i className="bi bi-facebook"></i></a>
                            <a href=""><i className="bi bi-instagram"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Services</a></li>
                            <li><a href="#">Buildings</a></li>
                            <li><a href="#">Facilities</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-6 footer-links">
                        <h4>Our Services</h4>
                        <ul>
                            <li><a href="#">Stalls Rental Appointment</a></li>
                            <li><a href="#">Facility Rental Appointment </a></li>
                            <li><a href="#">Discover Event</a></li>
                            <li><a href="#">Complaint Management for Owner's</a></li>
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