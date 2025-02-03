import './AllFacilities.scss';

export default function AllFacilities() {
    return (
        <>
            <div className="container my-5">
                {/* Section Title */}
                <div className="container section-title" data-aos="fade-up">
                    <h2>Mercado Buildings</h2>
                    <p>Mercado buildings are spacious hubs that feature a variety of stalls offering goods ranging from fresh produce to local crafts, creating vibrant spaces for trade and shopping.</p>
                    <p>These markets also serve as community gathering points, fostering social interaction and cultural exchange through events and shared experiences.</p>
                </div>
                {/* End Section Title */}

                <div className="row" data-aos="fade-up">
                    {/* Facility 1 */}
                    <div className="col-12 col-md-6" data-aos="fade-up">
                        <article className="facility-card">
                            <div className="facility-card__background">
                                <div className="card__background--wrapper">
                                    <div className="card__background--main" style={{ backgroundImage: 'url("https://images.squarespace-cdn.com/content/v1/60da576b8b440e12699c9263/84391c8c-f6a3-415a-988e-ff0534ace4fc/ovation+2.jpg")' }}>
                                        <div className="card__background--layer"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="facility-card__head">
                                <span className="info__box">
                                    <span>Event Hall</span>
                                    <span>Facility 1</span>
                                </span>
                            </div>
                            <div className="facility-card__info" style={{ minHeight: '200px' }}>
                                <h5>MERCADO DE CALAMBA Event Hall FACILITY</h5>
                                <p>
                                    <span><i className="fa-solid fa-ruler-vertical"></i> Length: 100m</span>&nbsp;&nbsp;&nbsp;
                                    <span><i className="fa-solid fa-ruler-horizontal"></i> Width: 5m</span>
                                </p>
                                <p>The Mercado de Calamba Event Hall provides a spacious venue designed for gatherings, conferences, and celebrations. Equipped with modern amenities, excellent lighting, and ventilation, it ensures a comfortable experience for all attendees. Whether hosting corporate functions or social events, this facility offers a well-maintained space to meet your needs.</p>
                                <a href="#" className="facility-card-btny btn--with-icon"><i className="btn-icon fa fa-long-arrow-right"></i>SEE MORE</a>
                            </div>
                        </article>
                    </div>

                    {/* Facility 2 */}
                    <div className="col-12 col-md-6" data-aos="fade-up">
                        <article className="facility-card">
                            <div className="facility-card__background">
                                <div className="card__background--wrapper">
                                    <div className="card__background--main" style={{ backgroundImage: 'url("https://i.pinimg.com/originals/63/ac/3a/63ac3a8383a9a79b10a8ce520a427d68.jpg")' }}>
                                        <div className="card__background--layer"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="facility-card__head">
                                <span className="info__box">
                                    <span>Table Tennis</span>
                                    <span>Facility 2</span>
                                </span>
                            </div>
                            <div className="facility-card__info" style={{ minHeight: '200px' }}>
                                <h5>MERCADO DE CALAMBA TABLE TENNIS FACILITY</h5>
                                <p>
                                    <span><i className="fa-solid fa-ruler-vertical"></i> Length: 10m</span>&nbsp;&nbsp;&nbsp;
                                    <span><i className="fa-solid fa-ruler-horizontal"></i> Width: 5m</span>
                                </p>
                                <p>The Mercado de Calamba Table Tennis Facility is a dedicated space for table tennis enthusiasts of all skill levels. Featuring high-quality tables, ample lighting, and a well-ventilated environment, it ensures an enjoyable playing experience. Whether for practice or competitive matches, this facility provides everything needed for a great game.</p>
                                <a href="#" className="facility-card-btny btn--with-icon"><i className="btn-icon fa fa-long-arrow-right"></i>SEE MORE</a>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </>
    );
}
