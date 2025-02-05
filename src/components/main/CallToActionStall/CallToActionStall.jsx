import './CallToActionStall.css';
import { Link } from "react-router-dom";

export default function CallToActionStall () {
  return (
    <section id="call-to-action" className="call-to-action section accent-background">
      <div className="container">
        <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
          <div className="col-xl-10">
            <div className="text-center">
              <h3>Do you want to rent a stall? Look for an available stall?</h3>
              <p>
              Easily browse through available options to find the perfect space that meets your needs. Whether you're looking for a short-term or long-term rental, our system helps you quickly identify stalls that suit your requirements, making the process simple and hassle-free. Start your search today and secure the ideal stall for your business.
              </p>
              <Link className="cta-btn" to="/all-buildings">Find a stall</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
