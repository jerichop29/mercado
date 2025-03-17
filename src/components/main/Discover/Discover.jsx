import React from 'react';
import './Discover.css';
import { useDiscover } from '../../../../backend/src/views/useDiscover';

export default function Discover() {
  const { filteredData, formatDateWMonth } = useDiscover();

  return (
    <>
      <section id="discover" className="discover section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Discover</h2>
          <p>Discover exciting new events at Mercado De Calamba, enriching experiences!</p>
        </div>
        <div className="discover" data-aos="fade-up">
          <ul className="d-cards">
            {Array.from(filteredData).map(discover => (
              <li className="d-cards_item" key={discover.discover_Id}>
                <div className="d-card" tabIndex="0">
                  <div className="d-card_image">
                    <img src={discover.image === '' ? "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" : discover.image} />
                  </div>
                  <div className="d-card_content">
                    <h2 className="d-card_title">{discover.Title}</h2>
                    <div className="d-card_text">
                      <span className="note">{discover.Activity}</span>
                      <div dangerouslySetInnerHTML={{ __html: discover.Description }} />
                      {discover.Reg_form !== '' &&
                        <p>Registration Form:
                          <a href={discover.Link} target='_blank'><strong>{discover.Link}</strong></a>
                        </p>}
                      <p className="upcharge">{formatDateWMonth(discover.Date_Start)}
                        {discover.Date_Start === discover.Date_End
                          ? <span> - 10:00pm - 11:00pm </span>  
                          : <span>- {formatDateWMonth(discover.Date_End)}
                          </span>}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}