import React,{useEffect, useState} from 'react';
import './Discover.css';
import DiscoverHandler from '../../../../backend/handler_js/DiscoverHandler';



export default function Discover() {
  const [filteredData, setFilteredData] = useState(new Set());
  const [currentDay,setCurrentDay]= useState([]);
  // Function to fetch stall data from the server
const handleFetchData = async () => {
  try {
      const discover = await DiscoverHandler.getDiscoveries();
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const currentDate = new Date();
      const year = currentDate.getFullYear(); // Get the current year
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the current month and ensure it's two digits
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedMonth = monthNames[currentDate.getMonth()]; // Get the current month name
      const formattedDate = `${formattedMonth +" "+ day+", "+year} `; // Format as YYYY:MM
     const date = `${year}-${month}-${day}`;
      // Filter data based on the current date
      const filteredDate = discover.data.filter(item =>  date >= item.Date_Start && date <= item.Date_End// Compare with currentDate
      );
      setCurrentDay(formattedDate);
      setFilteredData(new Set(filteredDate)); // Set the filtered data
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
            {Array.from(filteredData).map(discover => (
          <li className="cards_item" key={discover.discover_Id}>
            <div className="card" tabIndex="0">
                <div className="card_image">
                <img src="https://cdn.manilastandard.net/wp-content/uploads/2021/12/team_ph.jpg" />
                </div>
                <div className="card_content"> 
                <h2 className="card_title">{discover.Title}</h2>
                <div className="card_text">
                <span className="note">{discover.Activity}</span>
                    <p>{discover.Description}</p>
                    <p>Registration Form: <strong>https://docs.google.com/forms/d/e/1FAIpQLSfs6PPXbXGZiX1ECBAyKnkzW-GcacswQUU90WeJq5ic-UVtkw/</strong></p>
                    <p className="upcharge">{currentDay} - 10:00pm - 11:00pm </p>
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
