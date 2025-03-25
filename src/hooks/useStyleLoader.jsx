// src/hooks/useStyleLoader.js
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Aos from "aos";

const useStyleLoader = () => {
  const location = useLocation();
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    Aos.init();

    const loadStyles = async () => {
      try {
        if (location.pathname.startsWith("/user/")) {
          // Load multiple styles for user routes
          await Promise.all([
            import(/* @vite-ignore */ "../../public/assets/css/user/Style.css"),
            import(/* @vite-ignore */ "../../public/assets/css/user/core.css"),
            import(/* @vite-ignore */ "../../public/assets/css/user/theme-default.css"),
          ]);
        } else {
          // Load a single style for non-user routes
          await import(/* @vite-ignore */ "../../public/assets/css/main/Style.css");
        }

        setStyleLoaded(true);
        if (initialLoad) {
          setTimeout(() => setIsLoading(false), 500);
          setInitialLoad(false);
        }
      } catch (err) {
        console.error("Error loading styles:", err);
        setStyleLoaded(true);
      }
    };

    loadStyles();
  }, [location.pathname, initialLoad]);

  return { styleLoaded, isLoading };
};

export default useStyleLoader;
