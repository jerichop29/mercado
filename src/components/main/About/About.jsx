import React, { useEffect } from 'react';
import './About.css';
import AboutImage from '/assets/img/about.jpg';
import GLightbox from 'glightbox';

export default function About() {
  useEffect(() => {
    // Initialize GLightbox
    const lightbox = GLightbox({
      selector: '.glightbox',
    });

    return () => {
      // Clean up GLightbox instance
      lightbox.destroy();
    };
  }, []);

  return (
    <>
      {/* About Section */}
      <section id="about" className="about section">
        {/* Section Title - Fade Up */}
        <div className="container section-title" data-aos="fade-up">
          <h2>About Us</h2>
          <p>A bustling public market located in Calamba, Laguna, Philippines.</p>
        </div>
        {/* End Section Title */}

        <div className="container">
          <div className="row gy-4">
            {/* Left Side - Image & Video (Zoom In) */}
            <div
              className="col-lg-6 position-relative align-self-start"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <img src={AboutImage} className="img-fluid" alt="About Us" />
              <a
                href="https://www.youtube.com/watch?v=5DHkOvkIjDw&t=1s&ab_channel=KalanBangaDeN"
                className="glightbox pulsating-play-btn"
                data-glightbox="type: video"
              ></a>
            </div>

            {/* Right Side - Content (Fade Right) */}
            <div
              className="col-lg-6 content"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <h3>Mercado De Calamba</h3> <br />
              <p className="fst-italic">
                Mercado De Calamba is a vibrant marketplace known for its rich cultural heritage and bustling atmosphere, offering a variety of local products and services.
              </p>
              <ul>
                <li><i className="bi bi-check2-all"></i> <span>A diverse range of fresh produce and handcrafted goods.</span></li>
                <li><i className="bi bi-check2-all"></i> <span>A lively environment that reflects the community spirit.</span></li>
                <li><i className="bi bi-check2-all"></i> <span>Conveniently located with easy access to essential amenities and transport options.</span></li>
                <li><i className="bi bi-check2-all"></i> <span>Friendly vendors offering personalized service and fresh selections.</span></li>
                <li><i className="bi bi-check2-all"></i> <span>Support for local farmers, artisans, and small businesses, fostering regional growth.</span></li>
                <li><i className="bi bi-check2-all"></i> <span>A variety of local delicacies and street food to experience authentic flavors.</span></li>
              </ul>
              <br />
              <p>
                Experience the true essence of Calamba through its market, where tradition meets modernity, providing a unique shopping and social experience for all visitors.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* End About Section */}
    </>
  );
}
