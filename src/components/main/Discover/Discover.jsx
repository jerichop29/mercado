import React,{useEffect, useState} from 'react';
import './Discover.css';
import DiscoverHandler from '../../../../backend/handler_js/DiscoverHandler';



export default function Discover() {
  const [discoverData,setDiscoverData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // Function to fetch stall data from the server
const handleFetchData = async () => {
  try {
      const discover = await DiscoverHandler.getDiscoveries();
      setDiscoverData(discover.data);
      const currentDate = new Date();

      // Filter data based on the current date
      const filteredDate = discover.data.filter(item => {
        const itemStartDate = new Date(item.StartDate);
        const itemEndDate = new Date(item.EndDate);
        return itemStartDate < currentDate && itemEndDate > currentDate; // Return true if the item is within the date range
      });
      console.log(filteredDate);
      setFilteredData(filteredDate); // Set the filtered data
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};

  useEffect(()=>{
    handleFetchData()
  },[]);
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

        <div className="discover" data-aos="fade-up">
          <ul className="cards">
            {/* Render your filtered data here */}
            {filteredData.map(item => (
          <li className="cards_item" key={item.id}>
            <div className="card" tabIndex="0">
                <div className="card_image">
                <img src="https://cdn.manilastandard.net/wp-content/uploads/2021/12/team_ph.jpg" />
                </div>
                <div className="card_content"> 
                <h2 className="card_title">{item.Title}</h2>
                <div className="card_text">
                <span className="note">{item.Activity}</span>
                    <p>{item.Description}</p>
                    <p>Registration Form: <strong>https://docs.google.com/forms/d/e/1FAIpQLSfs6PPXbXGZiX1ECBAyKnkzW-GcacswQUU90WeJq5ic-UVtkw/</strong></p>
                    <p className="upcharge">{item.StartDate} - {item.EndDate}</p>
                </div>
                </div>
            </div>
            </li>
))}
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
