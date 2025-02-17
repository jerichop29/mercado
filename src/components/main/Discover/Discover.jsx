import React from 'react';
import './Discover.css';
import { useDiscover } from '../../../hooks/useDiscover';

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
                    <img src={discover.image === '' ? "https://cdn.manilastandard.net/wp-content/uploads/2021/12/team_ph.jpg" : discover.image} />
                  </div>
                  <div className="d-card_content">
                    <h2 className="d-card_title">{discover.Title}</h2>
                    <div className="d-card_text">
                      <span className="note">{discover.Activity}</span>
                      <p>{discover.Description}</p>
                      {discover.Reg_form !== '' &&
                        <p>Registration Form:
                          <a href={discover.Reg_form} target='_blank'><strong>{discover.Reg_form}</strong></a>
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