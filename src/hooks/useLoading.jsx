import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true); // Start as true for initial loading
  const [prevLayout, setPrevLayout] = useState(null);
  const [isFirstLoad, setIsFirstLoad] = useState(true);  // Track the first load
  const location = useLocation();

  useEffect(() => {
    // Determine layout from pathname
    const currentLayout = getLayoutFromPath(location.pathname);

    // Show loader for first load
    if (isFirstLoad) {
      setIsLoading(true);
      setIsFirstLoad(false); // Set first load flag to false after initial load
    }

    // Check if we are transitioning between layouts
    if (prevLayout !== null && prevLayout !== currentLayout) {
      setIsLoading(true);
      
      // Simulate loading by adding a delay (optional)
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300); // Show loader for 300ms when layout changes
      
      return () => clearTimeout(timer);
    }

    setPrevLayout(currentLayout);

    // No loading if we are on the same layout
    return () => setIsLoading(false);
  }, [location, prevLayout, isFirstLoad]);

  const getLayoutFromPath = (path) => {
    if (path.includes('/auth')) return 'auth';
    if (path.includes('/user')) return 'user';
    return 'main'; // default layout
  };

  return isLoading;
};

export default useLoading;
