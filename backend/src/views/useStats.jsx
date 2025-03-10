import { useState, useEffect } from 'react';
import stallHandler from '../controllers/js/stallHandler';
import OwnerHandler from '../controllers/js/OwnerHandler';
import DiscoverHandler from '../controllers/js/DiscoverHandler';
export const  useStats = () =>{
  const [stallData,setStallData] = useState();
  const [ownerData,setOwnerData] = useState();
  const [discoverData,setDiscoverData] = useState();
     // Fetch initial data when the component mounts
     // Function to fetch stall data from the server
    const handleFetchData = async () => {
      try {
          const stall = await stallHandler.getStalls();
          const owner = await OwnerHandler.getOwners();
          const discover = await DiscoverHandler.getDiscoveries();
          // Send the count of stalls to a function or endpoint
          setStallData(stall.data.length);
          setOwnerData(owner.data.length);
          setDiscoverData(discover.data.length);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };
    useEffect(() => {
        handleFetchData();
    }, []);
return {stallData,ownerData,discoverData};
}