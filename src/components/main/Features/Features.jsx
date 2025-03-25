import './Features.css';
import FeaturesImage from '/assets/img/features.jpg';

export default function Features() {
  return (
    <>
      {/* Features Section */}
      <section id="features" className="features section">
        <div className="container">
          <div className="row justify-content-around gy-4">
            <div className="features-image col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <img src={FeaturesImage} alt="" />
            </div>

            <div className="col-lg-5 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
              <h3>Features of Mercado</h3>
              <p>Mercado brings you an intuitive and reliable online marketplace with a focus on ease of use, security, and variety. Shop with confidence, discover new products, and enjoy a hassle-free experience whether you're buying or selling. Explore the top features that make Mercado the go-to platform for all your shopping needs.</p>

              <div className="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="300">
                <i className="fa-brands fa-cc-discover flex-shrink-0"></i>
                <div>
                  <h4><a className="stretched-link">Easy Product Discovery</a></h4>
                  <p>Quickly find the products you need with advanced search filters and personalized recommendations.</p>
                </div>
              </div>{/* End Icon Box */}

              <div className="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="400">
                <i className="fa-solid fa-cart-shopping flex-shrink-0"></i>
                <div>
                  <h4><a className="stretched-link">Hassle-Free Checkout</a></h4>
                  <p>Complete your purchases with a secure and fast checkout process, including multiple payment options.</p>
                </div>
              </div>{/* End Icon Box */}

              <div className="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="500">
                <i className="bi bi-patch-check-fill flex-shrink-0"></i>
                <div>
                  <h4><a className="stretched-link">Verified Sellers</a></h4>
                  <p>Shop confidently with trusted, verified sellers and transparent reviews to guide your decisions.</p>
                </div>
              </div>{/* End Icon Box */}

              <div className="icon-box d-flex position-relative" data-aos="fade-up" data-aos-delay="600">
                <i className="fa-regular fa-handshake flex-shrink-0"></i>
                <div>
                  <h4><a className="stretched-link">Vendor Partnerships</a></h4>
                  <p>Local vendors can collaborate on promotions, sales, or special offers, fostering a sense of community and supporting each other’s businesses.</p>
                </div>
              </div>{/* End Icon Box */}
            </div>
          </div>
        </div>
      </section>{/* /Features Section */}
    </>
  );
}
