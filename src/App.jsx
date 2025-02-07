import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Aos from 'aos';
import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router>
      <AppRoutesWithStyles />
    </Router>
  );
}

function AppRoutesWithStyles() {
  const location = useLocation();
  const [styleLoaded, setStyleLoaded] = useState(false);

  useEffect(() => {
    // Initialize Aos (if used for animations)
    Aos.init();

    // Determine the CSS file based on the route
    let currentStyle;
    if (location.pathname.startsWith('/user/')) {
      currentStyle = './assets/css/user/Style.css'; // Path for user styles
    } else {
      currentStyle = './assets/css/main/Style.css'; // Default path for main styles
    }
    // Dynamically import the correct stylesheet based on the path
    import(currentStyle)
      .then(() => {
        console.log("Styles Loaded")
        setStyleLoaded(true);
      })
      .catch((err) => {
        console.error("Error loading style:", err);
      });

    return () => {
      setStyleLoaded(false); // Reset the state when path changes
    };
  }, [location.pathname]); // Depend on pathname to reload styles on path change

  return (
    <div>
      <AppRoutes />
    </div>
  );
}

export default App;
