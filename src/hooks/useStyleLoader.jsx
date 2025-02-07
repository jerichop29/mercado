// src/hooks/useStyleLoader.js
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Aos from "aos";

const useStyleLoader = () => {
  const location = useLocation();
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to track if it's the first load
  const [initialLoad, setInitialLoad] = useState(true); // Track if it's the initial load

  useEffect(() => {
    Aos.init();

    const currentStyle = location.pathname.startsWith("/user/")
      ? "../assets/css/user/Style.css"
      : "../assets/css/main/Style.css";

    import(/* @vite-ignore */ currentStyle)
      .then(() => {
        setStyleLoaded(true);
        if (initialLoad) {
          // Set isLoading to false after the first load
          setTimeout(() => setIsLoading(false), 500); // Wait for loader to disappear
          setInitialLoad(false); // Set initialLoad to false after the first load
        }
      })
      .catch((err) => {
        console.error("Error loading style:", err);
        setStyleLoaded(true); // Even on error, proceed so the app isn’t stuck
      });
  }, [location.pathname, initialLoad]);

  return { styleLoaded, isLoading };
};

export default useStyleLoader;
