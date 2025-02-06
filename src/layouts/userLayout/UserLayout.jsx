import { Outlet } from "react-router-dom";
import TopBar from "../../components/user/TopBar";

const UserLayout = () => {
  return (
    <>
      {/* Layout */}
      <div class="container-scroller">
          <TopBar />
          <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
