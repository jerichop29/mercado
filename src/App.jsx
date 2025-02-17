// src/App.jsx
import { BrowserRouter as Router } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion from framer-motion
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/loader/Loader"; // Import the loader component
import useStyleLoader from "./hooks/useStyleLoader"; // Import the custom hook
import NotFound from "./components/main/ErrorPages/NotFound";

function App() {
  return (
    <Router>
      <AppRoutesWithStyles />
    </Router>
  );
}

function AppRoutesWithStyles() {
  const { styleLoaded, isLoading } = useStyleLoader(); // Use the hook to get the state

  // Until the style is loaded, render a loading indicator
  if (!styleLoaded || isLoading) {
    return <Loader isLoading={true} />;
  }

  try {
    return (
      <motion.div
        initial={{ opacity: 0 }} // Start with 0 opacity
        animate={{ opacity: 1 }} // Animate to full opacity
        exit={{ opacity: 0 }} // Fade out on exit (if needed)
        transition={{ duration: 1 }} // Transition duration
      >
        <AppRoutes />
      </motion.div>
    );
  } catch (error) {
    if (error.message === "NotFound") {
      return <NotFound />;
    }
    throw error; // Re-throw if it's not a NotFound error
  }
}

export default App;
