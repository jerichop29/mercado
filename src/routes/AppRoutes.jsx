import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; // Import Framer Motion
import { useEffect } from "react";

// Layouts
import MainLayout from "../layouts/MainLayout/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import UserLayout from "../layouts/UserLayout/UserLayout";

// Pages
import SignInPage from "../pages/auth/SignIn";
import HomePage from "../pages/main/Home";
import AboutPage from "../pages/main/About";
import ServicesPage from "../pages/main/Services";
import ContactPage from "../pages/main/Contact";
import DiscoverPage from "../pages/main/Discover";
import AllBuildingsPage from "../pages/main/Stalls/AllBuildings";
import Building1Page from "../pages/main/Stalls/Building1"
import Building2Page from "../pages/main/Stalls/Building2"
import Building3Page from "../pages/main/Stalls/Building3"
import Building4Page from "../pages/main/Stalls/Building4"
import Building5Page from "../pages/main/Stalls/Building5"
import AllFacilitiesPage from "../pages/main/Facilities/AllFacilities";
import Facility1Page from "../pages/main/Facilities/Facility1";
import Facility2Page from "../pages/main/Facilities/Facility2";
import DashboardPage from "../pages/user/Dashboard";

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
              path="all-buildings"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AllBuildingsPage />
                </motion.div>
              }
            />
            <Route
              path="building-1"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Building1Page />
                </motion.div>
              }
            />
            <Route
              path="building-2"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Building2Page />
                </motion.div>
              }
            />
            <Route
              path="building-3"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Building3Page />
                </motion.div>
              }
            />
            <Route
              path="building-4"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Building4Page />
                </motion.div>
              }
            />
            <Route
              path="building-5"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Building5Page />
                </motion.div>
              }
            />
            <Route
              path="all-facilities"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AllFacilitiesPage />
                </motion.div>
              }
            />
            <Route
              path="facility-1"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Facility1Page />
                </motion.div>
              }
            />
            <Route
              path="facility-2"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Facility2Page />
                </motion.div>
              }
            />
            <Route
              path="discover"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <DiscoverPage />
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

          <Route path="user" element={<UserLayout />}>
            <Route
              path="dashboard"
              element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <DashboardPage />
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
