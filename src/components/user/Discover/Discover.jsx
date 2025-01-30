import React from 'react';
import './Discover.css';

export default function Discover() {
  return (
    <>
      {/* Discover Section */}
      <section id="discover" className="discover section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Discover</h2>
          <p>Discover exciting new events at Mercado De Calamba, enriching experiences!</p>
        </div>
        {/* End Section Title */}

        <div className="discover">
          <ul className="cards">
          <li className="cards_item">
            <div className="card" tabIndex="0">
                <div className="card_image">
                <img src="https://scontent.fmnl16-1.fna.fbcdn.net/v/t39.30808-6/427989829_867250462084011_3951982731069653291_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHkaip8hCtbsy7-tW0OsW62ZPLGPt24lA1k8sY-3biUDQflOjVHA_Nr0-OnzKPk3CoN3_QaO_bf5SDZ5qxwAVvh&_nc_ohc=ZjH8zhA-QUYQ7kNvgG93DEL&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=AySD0hpnRQXLpDhfC8QKvKi&oh=00_AYA6qiPNFSeH76HGIWAhkpCIPD1CUP5dRQmINrH0nU3JHA&oe=67A0A552" alt="a Reuben sandwich on wax paper." />
                </div>
                <div className="card_content"> 
                <h2 className="card_title">Mercado Karate Tournament</h2>
                <div className="card_text">
                <span className="note">Karate Marcial Art</span>
                    <p>The "Table Tennis Tournament at Mercado De Calamba for Youth" is an exciting event aimed at promoting sportsmanship, skill development, and community engagement among young people. Held at the Mercado De Calamba, this tournament invites local youth to participate in friendly yet competitive table tennis matches. The event provides a platform for young players to showcase their talents, improve their game, and interact with peers in a vibrant and supportive environment.</p>
                    <p>Registration Form: <strong>https://docs.google.com/forms/d/e/1FAIpQLSfs6PPXbXGZiX1ECBAyKnkzW-GcacswQUU90WeJq5ic-UVtkw/</strong></p>
                    <p className="upcharge">March 24, 2025 - 10:00pm - 11:00pm</p>
                </div>
                </div>
            </div>
            </li>

            <li className="cards_item">
            <div className="card" tabIndex="0">
                <div className="card_image">
                <img src="https://mercadodecalamba-market.com/assets/images/uploads/discover/6765fa74728ee_1734736500.jpg" alt="a Reuben sandwich on wax paper." />
                </div>
                <div className="card_content"> 
                <h2 className="card_title">Mercado Table Tennis Tournament</h2>
                <div className="card_text">
                <span className="note">Table Tennis Sport</span>
                    <p>The "Table Tennis Tournament at Mercado De Calamba for Youth" is an exciting event aimed at promoting sportsmanship, skill development, and community engagement among young people. Held at the Mercado De Calamba, this tournament invites local youth to participate in friendly yet competitive table tennis matches. The event provides a platform for young players to showcase their talents, improve their game, and interact with peers in a vibrant and supportive environment.</p>
                    <p>Registration Form: <strong>https://docs.google.com/forms/d/e/1FAIpQLSfs6PPXbXGZiX1ECBAyKnkzW-GcacswQUU90WeJq5ic-UVtkw/</strong></p>
                    <p className="upcharge">March 24, 2025 - 10:00pm - 11:00pm</p>
                </div>
                </div>
            </div>
            </li>
          </ul>
        </div>
      </section>
      {/* End Discover Section */}
    </>
  );
}
