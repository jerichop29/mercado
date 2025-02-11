import React,{useEffect, useState} from 'react';
import './Discover.css';
import DiscoverHandler from '../../../../backend/handler_js/DiscoverHandler';



export default function Discover() {

  const [filteredData, setFilteredData] = useState(new Set());
  const [date,setFormatDate]=useState([]);
  // Function to fetch stall data from the server
  const formatDate = (inputDate) => {
    try {
        const date = new Date(inputDate); // Create a Date object from the input
        const year = date.getFullYear(); // Get the year
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month and ensure it's two digits
        const day = String(date.getDate()).padStart(2, '0'); // Get the day and ensure it's two digits
        return `${year}-${month}-${day}`; // Return formatted date
    } catch (error) {
        console.error('Error formatting date:', error);
        return null; // Return null or a default value in case of error
    }
  };
  const formatDateWMonth = (inputDate) => {
    try {
        const date = new Date(inputDate); // Create a Date object from the input
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const formattedMonth = monthNames[date.getMonth()]; // Get the current month name
        return `${formattedMonth +" "+ String(date.getDate()).padStart(2, '0')+", "+date.getFullYear()} `; // Return formatted date
    } catch (error) {
        console.error('Error formatting date:', error);
        return null; // Return null or a default value in case of error
    }
  };
const handleFetchData = async () => {
  try {
      const discover = await DiscoverHandler.getDiscoveries();
     const currentDate = new Date();
      const current = formatDate(currentDate);
      setFormatDate(current);
      // Filter data based on the current date
      const filteredDate = discover.data.filter(item =>  date >= item.Date_Start && date <= item.Date_End// Compare with currentDate
      );
      setFilteredData(new Set(filteredDate)); // Set the filtered data
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};

  useEffect(()=>{
    handleFetchData()
  },[date]);
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
            {/* Render  filtered data  */}
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
            </li>))}
          </ul>
        </div>
      </section>
      {/* End Discover Section */}
    </>
  );
}
