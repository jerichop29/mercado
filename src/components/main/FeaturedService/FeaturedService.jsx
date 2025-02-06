import './FeaturedService.css';
export default function FeaturedService(){
    return(
        <>
            <section id="featured-services" className="featured-services section">
            <div className="container">
                <div className="row gy-4">

                <div className="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="100">
                    <div className="service-item position-relative">
                    <div className="icon"><i className="bi bi-map icon"></i></div>
                    <h4><a className="stretched-link">Interactive Map</a></h4>
                    <p>Quickly find and navigate to stalls with our interactive map, designed to provide a seamless and user-friendly experience. Search for stalls by name, category, or products offered, and apply filters such as distance, ratings, or special promotions to narrow down your options. </p>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="200">
                    <div className="service-item position-relative">
                    <div className="icon"><i className="fas fa-calendar-check icon"></i></div>
                    <h4><a className="stretched-link">Stall & Facility Rental Appointment</a></h4>
                    <p>Easily schedule and manage stall or facility rentals with our streamlined appointment system. Whether you need a space for a day, week, or longer, the system provides real-time availability, flexible booking options, and instant confirmation.</p>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="300">
                    <div className="service-item position-relative">
                    <div className="icon"><i className="fas fa-star icon"></i></div>
                    <h4><a className="stretched-link">Discover</a></h4>
                    <p>Uncover exciting new opportunities and stay ahead by keeping up with our latest events and promotions. Discover special offers, limited-time discounts, and exclusive deals tailored to meet your needs. Stay informed about upcoming events, workshops, and activities designed to help you grow your business or enjoy unique experiences.</p>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 d-flex" data-aos="fade-up" data-aos-delay="400">
                    <div className="service-item position-relative">
                    <div className="icon"><i className="fas fa-exclamation-triangle icon"></i></div>
                    <h4><a className="stretched-link">Stall Owner's Complaint Management</a></h4>
                    <p>A streamlined and user-friendly system designed to help stall owners effectively manage and resolve customer complaints with ease. This system enables stall owners to record complaints in detail, track their status, and maintain a complete resolution history, ensuring transparency and accountability.</p>
                    </div>
                </div>

                </div>
            </div>
            </section>
        </>
    );
}