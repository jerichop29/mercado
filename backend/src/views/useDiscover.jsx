import { useState, useEffect } from 'react';
import DiscoverHandler from '../controllers/js/DiscoverHandler';

export const useDiscover = () => {
  const [filteredData, setFilteredData] = useState(new Set());
  const [date, setFormatDate] = useState([]);

  const formatDate = (inputDate) => {
    try {
      const date = new Date(inputDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  };

  const formatDateWMonth = (inputDate) => {
    try {
      const date = new Date(inputDate);
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const formattedMonth = monthNames[date.getMonth()];
      return `${formattedMonth} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  };

  const handleFetchData = async () => {
    try {
      const discover = await DiscoverHandler.getDiscoveries();
      const currentDate = new Date();
      const current = formatDate(currentDate);
      setFormatDate(current);
      const filteredDate = discover.data.filter(item => date <= item.Date_Start || date <= item.Date_End);
      setFilteredData(new Set(filteredDate));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [date]);

  return { filteredData, formatDateWMonth };
};