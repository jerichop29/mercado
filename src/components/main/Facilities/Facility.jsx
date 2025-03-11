import "./Facility.scss";
import Calendar from "react-calendar"; // Import react-calendar package
import { useState } from "react";
import { useFacility } from "../../../../backend/src/views/useFacility";

export default function Facility({ facility }) {
    const [date, setDate] = useState(new Date());
    const {pinnedEvents} = useFacility(facility);

    if (!facility) {
        return <h2 className="text-center mt-5">Facility not found</h2>;
    }
  
  // Highlight pinned event dates
  const tileContent = ({ date }) => {
    const dateStr = date.toLocaleDateString("en-CA"); // Formats as "YYYY-MM-DD" in local time
    return pinnedEvents[dateStr] ? (
      <div style={{ color: "red", fontWeight: "bold" }}>📌</div>
    ) : null;
  };
  

    return (
        <div className="container my-5">
                {/* Section Title */}
                <div className="container section-title" data-aos="fade-up">
                    <h2>Mercado Buildings</h2>
                    <p>Mercado buildings are spacious hubs that feature a variety of stalls offering goods ranging from fresh produce to local crafts, creating vibrant spaces for trade and shopping.</p>
                    <p>These markets also serve as community gathering points, fostering social interaction and cultural exchange through events and shared experiences.</p>
                </div>
                {/* End Section Title */}
            <div className="row">
                {/* Left Side: Facility Details */}
                <div className="col-12 col-md-8" data-aos="fade-right">
                    <article className="facility-card">
                        <div className="facility-card__background">
                            <div className="card__background--wrapper">
                                <div
                                    className="card__background--main"
                                    style={{ backgroundImage: `url("${facility.imageUrl}")` }}
                                >
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

                        <div className="facility-card__info">
                            <h5>{facility.title}</h5>
                            <p>
                                <span><i className="fa-solid fa-ruler-vertical"></i> Length: {facility.length}</span>
                                &nbsp;&nbsp;&nbsp;
                                <span><i className="fa-solid fa-ruler-horizontal"></i> Width: {facility.width}</span>
                            </p>
                            <p>{facility.description}</p>

                            {/* Back Button */}
                            <a href="#" className="facility-card-btny btn--with-icon"><i className="btn-icon fa fa-long-arrow-right"></i> Inquire For Reservation</a>
                        </div>
                    </article>
                </div>

                {/* Right Side: Calendar */}
                <div className="col-12 col-md-4 d-flex flex-column align-items-center justify-content-center text-center" data-aos="fade-left">
                    <div className="calendar-container">
                        <h5 className="calendar-title">Facility Availability</h5>
                        <Calendar 
                            onChange={setDate} 
                            value={date} 
                            tileContent={tileContent}
                        />
                        <p className="selected-date">
                            Current Date: <strong>{date.toDateString()}</strong>
                            {pinnedEvents[date.toLocaleDateString("en-CA")]?.length > 0 && (
                                <ul className="no-bullets">
                                    {pinnedEvents[date.toLocaleDateString("en-CA")].map((event, index) => (
                                        <li key={index}>📌 {event}</li>
                                    ))}
                                </ul>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
