import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; // Import Framer Motion
import { useEffect } from "react";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Pages
import SignInPage from "../pages/Auth/SignIn";
import HomePage from "../pages/main/Home";
import AboutPage from "../pages/main/About";
import ServicesPage from "../pages/main/Services";
import ContactPage from "../pages/main/Contact";

const AppRoutes = () => {
  const location = useLocation();

  // Reset scroll position instantly when the location changes
  useEffect(() => {
    window.scrollTo(0, 0); // Instantly scroll to the top of the page
  }, [location]);

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <HomePage />
                </motion.div>
              }
            />
            <Route
              path="about"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AboutPage />
                </motion.div>
              }
            />
            <Route
              path="services"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ServicesPage />
                </motion.div>
              }
            />
            <Route
              path="contact"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ContactPage />
                </motion.div>
              }
            />
          </Route>
          
            {/* Auth Layout */}
          <Route path="auth" element={<AuthLayout />}>
            <Route
              path="signin"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SignInPage />
                </motion.div>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AppRoutes;
