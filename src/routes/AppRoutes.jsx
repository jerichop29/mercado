// src/AppRoutes.js
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../components/loader/loader";
import NotFound from "../components/main/ErrorPages/NotFound"; // Import the NotFound component
import Forbidden from "../components/main/ErrorPages/Forbidden"; // Import the Forbidden component
import ProtectedRoute from "../components/main/ProtectedRoute/ProtectedRoute"; // Import the ProtectedRoute component

// Hooks
import useScrollReset from "../hooks/useScrollReset";
import useLoading from "../hooks/useLoading";

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
import Building1Page from "../pages/main/Stalls/Building1";
import Building2Page from "../pages/main/Stalls/Building2";
import Building3Page from "../pages/main/Stalls/Building3";
import Building4Page from "../pages/main/Stalls/Building4";
import Building5Page from "../pages/main/Stalls/Building5";
import AllFacilitiesPage from "../pages/main/Facilities/AllFacilities";
import Facility1Page from "../pages/main/Facilities/Facility1";
import Facility2Page from "../pages/main/Facilities/Facility2";
import DashboardPage from "../pages/user/Dashboard";
import AddUserPage from "../pages/user/SubUsers.jsx/AddUser";
import ManageUsersPage from "../pages/user/SubUsers.jsx/ManageUsers";
import AllAppointmentsPage from "../pages/user/Appointments/AllAppointments";
import RequestAppointmentPage from "../pages/user/Appointments/RequestAppointment";
import ApprovedAppointmentPage from "../pages/user/Appointments/ApprovedAppointment";
import CancelledAppointmentPage from "../pages/user/Appointments/CancelledAppointment";
import AddCategoryPage from "../pages/user/Complaints/Category/AddCategory";
import ManageCategoryPage from "../pages/user/Complaints/Category/ManageCategory";
import ClosedComplaintsPage from "../pages/user/Complaints/ManageComplaints/ClosedComplaints";
import InProcessComplaintsPage from "../pages/user/Complaints/ManageComplaints/InProcessComplaints";
import NotForwardedComplaintsPage from "../pages/user/Complaints/ManageComplaints/NotForwardedComplaints";
import NotProcessComplaintsPage from "../pages/user/Complaints/ManageComplaints/NotProcessComplaints";
import ManageStallsPage from "../pages/user/ManageProperty/ManageStalls";
import ManageFacilitiesPage from "../pages/user/ManageProperty/ManageFacilities";
import AddDiscoverPage from "../pages/user/Discover/AddDiscover";
import ManageDiscoverPage from "../pages/user/Discover/ManageDiscover";
import ReportPage from "../pages/user/Report/Report";

const AppRoutes = () => {
  const location = useLocation();
  const isLoading = useLoading(); // Get loading state from the hook

  useScrollReset();

  const renderPage = (Page) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Page />
    </motion.div>
  );

  return (
    <>
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Main Layout Routes */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={renderPage(HomePage)} />
              <Route path="about" element={renderPage(AboutPage)} />
              <Route path="services" element={renderPage(ServicesPage)} />
              <Route path="all-buildings" element={renderPage(AllBuildingsPage)} />
              <Route path="building-1" element={renderPage(Building1Page)} />
              <Route path="building-2" element={renderPage(Building2Page)} />
              <Route path="building-3" element={renderPage(Building3Page)} />
              <Route path="building-4" element={renderPage(Building4Page)} />
              <Route path="building-5" element={renderPage(Building5Page)} />
              <Route path="all-facilities" element={renderPage(AllFacilitiesPage)} />
              <Route path="facility-1" element={renderPage(Facility1Page)} />
              <Route path="facility-2" element={renderPage(Facility2Page)} />
              <Route path="discover" element={renderPage(DiscoverPage)} />
              <Route path="contact" element={renderPage(ContactPage)} />
            </Route>

            {/* Authentication Layout Routes */}
            <Route path="auth" element={<AuthLayout />}>
              <Route path="signin" element={renderPage(SignInPage)} />
            </Route>

            {/* User Layout Routes */}
            {/* <Route path="user" element={<ProtectedRoute><UserLayout /></ProtectedRoute>}> */}
            <Route path="user" element={<UserLayout />}>
              <Route path="dashboard" element={renderPage(DashboardPage)} />
              <Route path="add-user" element={renderPage(AddUserPage)} />
              <Route path="manage-users" element={renderPage(ManageUsersPage)} />
              <Route path="all-appointments" element={renderPage(AllAppointmentsPage)} />
              <Route path="request-appointment" element={renderPage(RequestAppointmentPage)} />
              <Route path="approved-appointment" element={renderPage(ApprovedAppointmentPage)} />
              <Route path="cancelled-appointment" element={renderPage(CancelledAppointmentPage)} />
              <Route path="add-category" element={renderPage(AddCategoryPage)} />
              <Route path="manage-category" element={renderPage(ManageCategoryPage)} />
              <Route path="closed-complaints" element={renderPage(ClosedComplaintsPage)} />
              <Route path="in-process-complaints" element={renderPage(InProcessComplaintsPage)} />
              <Route path="not-forwarded-complaints" element={renderPage(NotForwardedComplaintsPage)} />
              <Route path="not-process-complaints" element={renderPage(NotProcessComplaintsPage)} />
              <Route path="manage-stalls" element={renderPage(ManageStallsPage)} />
              <Route path="manage-facilities" element={renderPage(ManageFacilitiesPage)} />
              <Route path="add-discover" element={renderPage(AddDiscoverPage)} />
              <Route path="manage-discover" element={renderPage(ManageDiscoverPage)} />
              <Route path="Report" element={renderPage(ReportPage)} />
            </Route>

          </Routes>
        </AnimatePresence>
      )}
    </>
  );
};

export default AppRoutes;
