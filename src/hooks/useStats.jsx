import { useState, useEffect } from 'react';
import stallHandler from '../../backend/src/handler/js/stallHandler';
import OwnerHandler from '../../backend/src/handler/js/OwnerHandler';
export const  useStats = () =>{
  const [stallData,setStallData] = useState();
  const [ownerData,setOwnerData] = useState();
     // Fetch initial data when the component mounts
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
    useEffect(() => {
        handleFetchData();
    }, []);
return {stallData,ownerData}
}