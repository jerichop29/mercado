import './Hero.css';
import CarouseImage1 from "../../../assets/img/hero-carousel/hero-carousel-1.png";
import CarouseImage2 from "../../../assets/img/hero-carousel/hero-carousel-2.jpg";
import CarouseImage3 from "../../../assets/img/hero-carousel/hero-carousel-3.jpg";


export default function Hero() {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="hero">
        <div id="hero-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
          <div className="carousel-item active">
            <img src={CarouseImage1} alt="Hero 1" />
            <div className="container">
              <h2>Welcome to Mercado</h2>
              <p>Mercado De Calamba is a vibrant marketplace known for its rich cultural heritage and bustling atmosphere, offering a variety of local products and services.</p>
              <p>✔️  A diverse range of fresh produce and handcrafted goods.</p>
              <a href="#about" className="btn-get-started">Read More</a>
            </div>
          </div>
          {/* End Carousel Item */}

          <div className="carousel-item">
            <img src={CarouseImage2} alt="Hero 2" />
            <div className="container">
            <h2>Welcome to Mercado</h2>
              <p>Mercado De Calamba is a vibrant marketplace known for its rich cultural heritage and bustling atmosphere, offering a variety of local products and services.</p>
              <p>✔️   A lively environment that reflects the community spirit.</p>
              <a href="#about" className="btn-get-started">Read More</a>
            </div>
          </div>
          {/* End Carousel Item */}

          <div className="carousel-item">
            <img src={CarouseImage3} alt="Hero 3" />
            <div className="container">
            <h2>Welcome to Mercado</h2>
              <p>Mercado De Calamba is a vibrant marketplace known for its rich cultural heritage and bustling atmosphere, offering a variety of local products and services.</p>
              <p>✔️  Conveniently located with easy access to essential amenities and transport options.</p>
              <a href="#about" className="btn-get-started">Read More</a>
            </div>
          </div>
          {/* End Carousel Item */}

          <a className="carousel-control-prev" href="#hero-carousel" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
          </a>

          <a className="carousel-control-next" href="#hero-carousel" role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
          </a>

          <ol className="carousel-indicators">
            <li data-bs-target="#hero-carousel" data-bs-slide-to="0" className="active"></li>
            <li data-bs-target="#hero-carousel" data-bs-slide-to="1"></li>
            <li data-bs-target="#hero-carousel" data-bs-slide-to="2"></li>
          </ol>

        </div>
      </section>
      {/* /Hero Section */}
    </>
  );
}
