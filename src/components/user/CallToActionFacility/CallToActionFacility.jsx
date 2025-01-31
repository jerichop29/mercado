import './CallToActionFacility.css';
import { Link } from "react-router-dom";

export default function CallToActionFacility () {
  return (
    <section id="call-to-action" className="call-to-action section accent-background">
      <div className="container">
        <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
          <div className="col-xl-10">
            <div className="text-center">
              <h3>Do you want to rent a Facility? Look for an available Facility?</h3>
              <p>
              Easily browse through available options to find the perfect space that meets your needs. Whether you're looking for a short-term or long-term rental, our system helps you quickly identify facility that suit your requirements, making the process simple and hassle-free. Start your search today and secure the ideal Facility for your event.
              </p>
              <Link className="cta-btn" to="/all-facilities">Check the Facility</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};