import './Contact.css';
import MapImage from '/assets/img/map.png';

export default function Contact() {
  return (
    <div>
      {/* Contact Section */}
      <section id="contact" className="contact section">
        
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>Get in touch with Mercado for any inquiries, support, or assistance you may need.</p>
          <p>Our team is dedicated to providing prompt and efficient help, ensuring that all your questions are answered and your issues are resolved.</p>
          <p>Whether you're seeking more information, need guidance on using our services, or have any concerns, we're here to help every step of the way.</p>
        </div> {/* End Section Title */}

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div className="row gy-4">
                <div className="col-lg-12">
                  <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="200">
                    <i className="bi bi-geo-alt"></i>
                    <h3>Address</h3>
                    <p>Bldg 1, Calamba City Public Market, Pabalan St, Calamba, 4027 Laguna</p>
                  </div>
                </div> {/* End Info Item */}

                <div className="col-md-6">
                  <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="300">
                    <i className="bi bi-telephone"></i>
                    <h3>Call Us</h3>
                    <p>(+63) 9426912070</p>
                  </div>
                </div> {/* End Info Item */}

                <div className="col-md-6">
                  <div className="info-item d-flex flex-column justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="400">
                    <i className="bi bi-envelope"></i>
                    <h3>Email Us</h3>
                    <p>mdc.marketmanagementdivision@gmail.com</p>
                  </div>
                </div> {/* End Info Item */}
              </div>
            </div>

            {/* Aligning and Centering the Map Image to the Info Container */}
            <div className="col-lg-6">
              <div className="image-container d-flex justify-content-center align-items-center" data-aos="fade-up" data-aos-delay="500">
                <img src={MapImage} alt="Contact Map" className="contact-image"/>
              </div>
            </div> {/* End Image Section */}
          </div>
        </div>
      </section> {/* /Contact Section */}
      <div className="mb-5" data-aos="fade-up" data-aos-delay="200">
          <iframe
            style={{ border: 0, width: '100%', height: '370px' }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.731965761415!2d121.16293052192657!3d14.210466356533631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd6310a720dcc1%3A0xa7f398923d91bdba!2sMercado%20de%20Calamba!5e0!3m2!1sen!2sph!4v1737679968621!5m2!1sen!2sph"
            frameBorder="0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>  
        </div> {/* End Google Maps */}
    </div>
  );
}
