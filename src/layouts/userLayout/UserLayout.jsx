import { Outlet } from "react-router-dom";
import SideBar from "../../components/user/SideBar";

const UserLayout = () => {
  return (
    <>
      {/* Layout */}
      <div className="g-sidenav-show  bg-gray-100">
          <SideBar />
          
      </div>
    </>
  );
};

export default UserLayout;
