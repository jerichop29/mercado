import { Outlet } from "react-router-dom";
import SideBar from "../../components/user/SideBar";
import Navbar from "../../components/user/NavBar";
import Footer from "../../components/user/Footer";
import Dashboard from "../../components/user/Dashboard";

const UserLayout = () => {
  return (
    <>
      {/* Layout */}
      <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <SideBar />
            <div className="layout-page">
              <Navbar />
                <div className="content-wrapper">
                  <Dashboard />
                  <Footer />
                  <div className="content-backdrop fade"></div>
                </div>
            </div>
          </div>
          <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </>
  );
};

export default UserLayout;
