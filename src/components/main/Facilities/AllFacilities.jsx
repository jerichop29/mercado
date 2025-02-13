import './Facility.scss';
import FacilityData from '../../../utils/FacilityData';

export default function AllFacilities() {
    return (
        <>
            <div className="container my-5">
                {/* Section Title */}
                <div className="container section-title" data-aos="fade-down">
                    <h2>Mercado Buildings</h2>
                    <p>Mercado buildings are spacious hubs that feature a variety of stalls offering goods ranging from fresh produce to local crafts, creating vibrant spaces for trade and shopping.</p>
                    <p>These markets also serve as community gathering points, fostering social interaction and cultural exchange through events and shared experiences.</p>
                </div>
                {/* End Section Title */}

                <div className="row" data-aos="fade-up">
                    {FacilityData.map((facility) => (
                        <div className="col-12 col-md-6" key={facility.id}>
                            <article className="facility-card">
                                <div className="facility-card__background">
                                    <div className="card__background--wrapper">
                                        <div className="card__background--main" style={{ backgroundImage: `url("${facility.imageUrl}")` }}>
                                            <div className="card__background--layer"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="facility-card__head">
                                    <span className="info__box">
                                        <span>{facility.name}</span>
                                        <span>Facility {facility.id}</span>
                                    </span>
                                </div>
                                <div className="facility-card__info" style={{ minHeight: '200px' }}>
                                    <h5>{facility.title}</h5>
                                    <p>
                                        <span><i className="fa-solid fa-ruler-vertical"></i> Length: {facility.length}</span>&nbsp;&nbsp;&nbsp;
                                        <span><i className="fa-solid fa-ruler-horizontal"></i> Width: {facility.width}</span>
                                    </p>
                                    <p>{facility.description}</p>
                                    <a href="#" className="facility-card-btny btn--with-icon"><i className="btn-icon fa fa-long-arrow-right"></i>SEE MORE</a>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
