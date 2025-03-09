import { useState, useEffect } from 'react';
import stallHandler from '../controllers/js/stallHandler';

export const useModal = (isOpen,stallName) => {
    const [stall, setData] = useState([]);

const handleFilterData = async () => {
  try {
    const stallData = await stallHandler.getStalls();
    setData(stallData.data.filter((data) => data.StallCode === stallName.replace(/^Stall_/,'')));
  } catch (e) {
    console.error(e);
  }
};

useEffect(() => {
  if (isOpen) {
    handleFilterData();
  }
}, [isOpen]);
return {stall}
}