import getGreetingMessage from '../../utils/GreetingHandler';
import { useNavigate } from 'react-router-dom';
import { checkRole, checkRoleisOwner, logout } from '../../utils/auth';
import { getUser } from '../../utils/auth';
import { useData } from '../../../backend/src/views/useData';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { username } = useData(getUser());
  const { avatar } = useData(username[0]?.Person_Id);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  
  useEffect(() => {
    const fetchUserRole = async () => {
      const isOwner = await checkRoleisOwner();
      const isAdmin = await checkRole();
      if (isAdmin) {
        setUserRole('Admin');
      } else if (isOwner) {
        setUserRole('Owner');
      } else {
        setUserRole('Guest');
      }
    };
    fetchUserRole();
  }, []);

  const handleLogout = () => {
    logout(); // Clear auth data
    navigate('/', { replace: true }); // Redirect to login page with replace
    window.location.reload(); 
  };

  const handleProfileClick = (e, user) => {
    e.preventDefault();
      // Prepare the data for editing
    const editData = {
        FName: user.FName,
        MName: user.MName,
        LName: user.LName,
        Address: user.Address,
        Contact: user.Contact,
        Email: user.Email,
        Admin_Id: user.Admin_Id,
        Owner_Id: user.Owner_Id,
        Gender: user.Gender,
        Birthdate: user.Birthdate,
        imageId: avatar[0].Avatar_Id || null,
        Avatar: avatar[0].image || null,
        Stall_Id: user.Stall_Id || "",
        role:user.role,
        // Assuming this exists in your data
    };
    
    // Navigate to the Profile component with the edit data
    navigate('/user/my-profile', { 
        state: { 
            editData: editData
        } 
    });
};

  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar">
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a aria-label='toggle for sidebar' className="nav-item nav-link px-0 me-xl-4" href="#">
          <i className="bx bx-menu bx-sm"></i>
        </a>
      </div>

      <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
      {getGreetingMessage(Array.isArray(username) && username.length > 0 ? username[0]?.FName : "Guest")}
        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li>
            <i className='menu-icon bx bx-bell'></i>
          </li>
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a aria-label='dropdown profile avatar' className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
              <div className="avatar avatar-online">
                <img src={ avatar[0]?.image ? avatar[0]?.image :"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="w-px-40 h-px-40 rounded-circle" alt="avatar-image" aria-label='Avatar Image'/>
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a aria-label='go to profile' onClick={(e) =>handleProfileClick(e,username[0])} style={{ cursor: "pointer" }} className="dropdown-item" href="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img src={ avatar[0]?.image? avatar[0]?.image :"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="w-px-40 h-px-40 rounded-circle" alt='avatar-image' aria-label='Avatar Image' />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-medium d-block">
                        {Array.isArray(username) && username.length > 0 
                          ? `${username[0]?.FName} ${username[0]?.LName}` 
                          : "Guest"}
                      </span>
                      <small className="text-muted">{userRole}</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
              <a className="dropdown-item" onClick={(e) =>handleProfileClick(e,username[0])} style={{ cursor: "pointer" }}>
                  <i className="bx bx-user me-2"></i>
                  <span className="align-middle">My Profile</span>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <a onClick={handleLogout} aria-label='click to log out' className="dropdown-item" href="#">
                  <i className="bx bx-power-off me-2"></i>
                  <span className="align-middle">Log Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;