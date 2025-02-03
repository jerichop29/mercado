import './AllBuildings.scss';
import Building1Image from '../../../../assets/img/buildings/building1.png';
import Building2Image from '../../../../assets/img/buildings/building2.png';
import Building3Image from '../../../../assets/img/buildings/building3.png';
import Building4Image from '../../../../assets/img/buildings/building4.png';
import Building5Image from '../../../../assets/img/buildings/building5.png';

export default function AllBuildings() {
    return (
      <>
        <section className="light">
          <div className="container py-2">
                      {/* Section Title */}
                      <div className="container section-title" data-aos="fade-up">
                          <h2>Mercado Buildings</h2>
                          <p>Mercado buildings are spacious hubs that feature a variety of stalls offering goods ranging from fresh produce to local crafts, creating vibrant spaces for trade and shopping.</p>
                          <p> These markets also serve as community gathering points, fostering social interaction and cultural exchange through events and shared experiences.</p>
                      </div>
                      {/* End Section Title */}

                      {/* Building 1 */}
                      <article className="postcard light blue" data-aos="fade-up">
                        <a className="postcard__img_link" href="#">
                          <img className="postcard__img" src={Building1Image} alt="Image Title" />
                        </a>
                        <div className="postcard__text t-dark">
                          <h1 className="postcard__title blue"><a href="#">Building 1</a></h1>
                          <div className="postcard__subtitle small">
                              <i className="fa-solid fa-store"></i> 100+ stalls
                          </div>
                          <div className="postcard__bar"></div>
                          <div className="postcard__preview-txt">Building 1 is a vibrant marketplace offering a wide variety of goods, from school supplies and bakery items to snacks and everyday essentials. With multiple stalls, it provides a convenient shopping experience for customers looking for quality products in one place. Whether you're grabbing a quick bite or stocking up on essentials, this market hub has something for everyone.</div>
                          <ul className="postcard__tagbox">
                            <li className="tag__item play blue">
                              <a href="#"><i className="fa-solid fa-angles-right"></i> See more</a>
                            </li>
                          </ul>
                        </div>
                      </article>

                      {/* Building 2 */}
                      <article className="postcard light red" data-aos="fade-up" data-aos-delay="100">
                        <a className="postcard__img_link" href="#">
                          <img className="postcard__img" src={Building2Image} alt="Image Title" />
                        </a>
                        <div className="postcard__text t-dark">
                          <h1 className="postcard__title red"><a href="#">Building 2</a></h1>
                          <div className="postcard__subtitle small">
                              <i className="fa-solid fa-store"></i> 100+ stalls
                          </div>
                          <div className="postcard__bar"></div>
                          <div className="postcard__preview-txt">Building 2 offers a diverse selection of services, from fresh groceries and gadget repairs to custom t-shirts and bags. This marketplace brings together essential items and personalized services, making it the perfect destination for everyday needs. Whether you're stocking up on groceries, fixing your gadgets, or looking for custom apparel, Building 2 has you covered with a range of quality offerings under one roof.</div>
                          <ul className="postcard__tagbox">
                            <li className="tag__item play red">
                              <a href="#"><i className="fa-solid fa-angles-right"></i> See more</a>
                            </li>
                          </ul>
                        </div>
                      </article>

                      {/* Building 3 */}
                      <article className="postcard light green" data-aos="fade-up" data-aos-delay="200">
                        <a className="postcard__img_link" href="#">
                          <img className="postcard__img" src={Building3Image} alt="Image Title" />
                        </a>
                        <div className="postcard__text t-dark">
                          <h1 className="postcard__title green"><a href="#">Building 3</a></h1>
                          <div className="postcard__subtitle small">
                              <i className="fa-solid fa-store"></i> 200+ stalls
                          </div>
                          <div className="postcard__bar"></div>
                          <div className="postcard__preview-txt">Building 3 specializes in fresh, high-quality meat, vegetables, fruits, pork, and seafood. It’s the go-to destination for those seeking fresh ingredients for their meals, offering a wide variety of products from trusted vendors. Whether you're shopping for your weekly groceries or preparing a special meal, Building 3 ensures top-notch freshness and selection across all categories.</div>
                          <ul className="postcard__tagbox">
                            <li className="tag__item play green">
                              <a href="#"><i className="fa-solid fa-angles-right"></i> See more</a>
                            </li>
                          </ul>
                        </div>
                      </article>

                      {/* Building 4 */}
                      <article className="postcard light yellow" data-aos="fade-up" data-aos-delay="300">
                        <a className="postcard__img_link" href="#">
                          <img className="postcard__img" src={Building4Image} alt="Image Title" />
                        </a>
                        <div className="postcard__text t-dark">
                          <h1 className="postcard__title yellow"><a href="#">Building 4</a></h1>
                          <div className="postcard__subtitle small">
                              <i className="fa-solid fa-store"></i> 20+ stalls
                          </div>
                          <div className="postcard__bar"></div>
                          <div className="postcard__preview-txt">Building 4 serves as both a storage hub and a marketplace offering fresh fruits, vegetables, seafood, and ice. With a focus on preserving and selling perishable goods, it provides customers with high-quality, fresh produce and seafood, along with essential ice for storage and preservation. Ideal for both individuals and businesses, Building 4 ensures easy access to fresh goods and reliable storage solutions.</div>
                          <ul className="postcard__tagbox">
                            <li className="tag__item play yellow">
                              <a href="#"><i className="fa-solid fa-angles-right"></i> See more</a>
                            </li>
                          </ul>
                        </div>
                      </article>

                      {/* Building 5 */}
                      <article className="postcard light orange" data-aos="fade-up" data-aos-delay="400">
                        <a className="postcard__img_link" href="#">
                          <img className="postcard__img" src={Building5Image} alt="Image Title" />
                        </a>
                        <div className="postcard__text t-dark">
                          <h1 className="postcard__title orange"><a href="#">Building 5</a></h1>
                          <div className="postcard__subtitle small">
                              <i className="fa-solid fa-store"></i> 50+ stalls
                          </div>
                          <div className="postcard__bar"></div>
                          <div className="postcard__preview-txt">Building 5 offers a fast food, a salon, cooked food stores, and recreational facilities. It’s the perfect place to enjoy a quick meal, refresh with a salon visit, or grab some home-cooked food. Additionally, it features a table tennis facility, providing a fun and active break for visitors. Whether you're in need of a quick bite, a salon service, or a spot to relax and play, Building 5 has everything you need.</div>
                          <ul className="postcard__tagbox">
                            <li className="tag__item play orange">
                              <a href="#"><i className="fa-solid fa-angles-right"></i> See more</a>
                            </li>
                          </ul>
                        </div>
                      </article>
          </div>
        </section>
      </>
    );
}
