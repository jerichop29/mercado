import  React,{ useEffect, useState } from 'react';
import './Stats.css';
import stallHandler from '../../../../backend/handler_js/stallHandler';
import OwnerHandler from '../../../../backend/handler_js/OwnerHandler';
export default function Stats() {
  const [stallData,setStallData] = useState();
  const [ownerData,setOwnerData] = useState();
     // Fetch initial data when the component mounts
    useEffect(() => {
        handleFetchData();
    }, []);

    // Function to fetch stall data from the server
    const handleFetchData = async () => {
        try {
            const stall = await stallHandler.getStalls();
            const owner = await OwnerHandler.getOwners();
            // Send the count of stalls to a function or endpoint
            setStallData(stall.data.length);
            setOwnerData(owner.data.length);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

  return (
    <>
      {/* Stats Section */}
      <section id="stats" className="stats section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                <i className="fa-solid fa-store flex-shrink-0"></i>
                <div>
                  <span data-purecounter-start="0" data-purecounter-end="25" data-purecounter-duration="1" className="purecounter">{stallData}</span>
                  <p>Stall</p>
                </div>
              </div>
            </div>{/* End Stats Item */}

            <div className="col-lg-3 col-md-6">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                <i className="fa-regular fa-building flex-shrink-0"></i>
                <div>
                  <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" className="purecounter">5</span>
                  <p>Building</p>
                </div>
              </div>
            </div>{/* End Stats Item */}

            <div className="col-lg-3 col-md-6">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                <i className="bi bi-building-gear flex-shrink-0"></i>
                <div>
                  <span data-purecounter-start="0" data-purecounter-end="8" data-purecounter-duration="1" className="purecounter">2</span>
                  <p>Facility</p>
                </div>
              </div>
            </div>{/* End Stats Item */}

            <div className="col-lg-3 col-md-6">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                <i className="bi bi-person flex-shrink-0"></i>
                <div>
                  <span data-purecounter-start="0" data-purecounter-end="150" data-purecounter-duration="1" className="purecounter">{ownerData}</span>
                  <p>Owner</p>
                </div>
              </div>
            </div>{/* End Stats Item */}
          </div>
        </div>
      </section>{/* /Stats Section */}
    </>
  );
}
