import { Outlet } from "react-router-dom";
import SideBar from "../../components/user/SideBar";

const UserLayout = () => {
  return (
    <>
      {/* Layout */}
      <div className="layout-wrapper layout-content-navbar">
          <div class="layout-container">
            <SideBar />
          </div>
      </div>
    </>
  );
};

export default UserLayout;
