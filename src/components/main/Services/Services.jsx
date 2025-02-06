import './Services.css';

export default function Services() {
  return (
    // Services Section
    <section id="services" className="services section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>Here’s a list of services for Mercado de Calamba.</p>
      </div>
      {/* End Section Title */}

      <div className="container">
        <div className="row gy-4">
          {/* Service Item 1 */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="fas fa-apple-alt"></i>
              </div>
              <a className="stretched-link">
                <h3>Fresh Produce Section</h3>
              </a>
              <p>
              Daily supply of fresh vegetables, fruits, and herbs sourced locally and regionally.
              </p>
            </div>
          </div>
          {/* End Service Item 1 */}

          {/* Service Item 2 */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="fas fa-fish"></i>
              </div>
              <a className="stretched-link">
                <h3>Seafood and Meat Market</h3>
              </a>
              <p>
              Freshly caught seafood and a variety of meat cuts, with options for pre-cleaned and prepared items.
              </p>
            </div>
          </div>
          {/* End Service Item 2 */}

          {/* Service Item 3 */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="fas fa-box"></i>
              </div>
              <a className="stretched-link">
                <h3>Dry Goods and Groceries</h3>
              </a>
              <p>
              A wide selection of spices, grains, canned goods, and condiments.
              </p>
            </div>
          </div>
          {/* End Service Item 3 */}

          {/* Service Item 4 */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="fas fa-hamburger"></i>
              </div>
              <a className="stretched-link">
                <h3>Cooked Food and Delicacies</h3>
              </a>
              <p>
              Ready-to-eat meals like local street food, grilled items, and traditional Filipino dishes.
              </p>
            </div>
          </div>
          {/* End Service Item 4 */}

          {/* Service Item 5 */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="500">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="fas fa-tshirt"></i>
              </div>
              <a className="stretched-link">
                <h3>Clothing and Household Items</h3>
              </a>
              <p>
              Affordable clothing, footwear, and accessories for all ages.
              </p>
            </div>
          </div>
          {/* End Service Item 5 */}

          {/* Service Item 6 */}
          <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="600">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <a className="stretched-link">
                <h3>Business Services for Vendors</h3>
              </a>
              <p>
              Stall rental options for vendors with flexible terms.
              </p>
            </div>
          </div>
          {/* End Service Item 6 */}
        </div>
      </div>
    </section>
  );
}
