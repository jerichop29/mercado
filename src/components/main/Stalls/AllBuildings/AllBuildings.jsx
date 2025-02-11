import { Link } from "react-router-dom";
import "./AllBuildings.scss";
import BuildingData from "../../../../utils/BuildingData"; // Import building data

export default function AllBuildings() {
    return (
        <section className="light">
            <div className="container py-2">
                {/* Section Title - Only this fades up */}
                <div className="container section-title" data-aos="fade-up">
                    <h2>Mercado Buildings</h2>
                    <p>
                        Mercado buildings are spacious hubs that feature a variety of stalls offering goods 
                        ranging from fresh produce to local crafts, creating vibrant spaces for trade and shopping.
                    </p>
                    <p>
                        These markets also serve as community gathering points, fostering social interaction 
                        and cultural exchange through events and shared experiences.
                    </p>
                </div>

                {/* Dynamically Render Buildings */}
                {BuildingData.map((building, index) => (
                    <article 
                        key={building.id} 
                        className={`postcard light ${building.color}`} 
                        data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} 
                        data-aos-delay={index * 100} // Staggered delay for smooth animation
                    >
                        <a className="postcard__img_link" href="#">
                            <img className="postcard__img" src={building.image} alt={building.name} />
                        </a>
                        <div className="postcard__text t-dark">
                            <h1 className={`postcard__title ${building.color}`}>
                                <a href="#">{building.name}</a>
                            </h1>
                            <div className="postcard__subtitle small">
                                <i className="fa-solid fa-store"></i> {building.stalls}
                            </div>
                            <div className="postcard__bar"></div>
                            <div className="postcard__preview-txt">{building.description}</div>
                            <ul className="postcard__tagbox">
                                <Link className={`tag__item play ${building.color}`} to={building.link}>
                                    <i className="fa-solid fa-angles-right"></i> See more
                                </Link>
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
