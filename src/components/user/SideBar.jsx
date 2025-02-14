

export default function SideBar(){
  return(
    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
    <div className="app-brand demo">
      <a className="app-brand-link">
        <span className="app-brand-text demo menu-text fw-bold ms-2">MDC</span>
      </a>
      <a className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
        <i className="bx bx-chevron-left bx-sm d-flex align-items-center justify-content-center"></i>
      </a>
    </div>

    <div className="menu-inner-shadow"></div>

    <ul className="menu-inner py-1">
      {/* Dashboard */}
      <li className="menu-item active open">
        <a className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bi bi-house-heart"></i>
          <div className="text-truncate" data-i18n="Dashboards">Dashboard</div>
          <span className="badge rounded-pill bg-danger ms-auto">5</span>
        </a>
      </li>

      {/* Sub-users */}
      <li className="menu-item">
        <a className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bi bi-people"></i>
          <div className="text-truncate" data-i18n="Layouts">Sub-users</div>
        </a>

        <ul className="menu-sub">
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Fluid">Add user</div>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Container">Manage users</div>
            </a>
          </li>
        </ul>
      </li>

      {/* Stalls Header */}
      <li className="menu-header small text-uppercase">
        <span className="menu-header-text"> Stalls</span>
      </li>
      {/* Stalls Appointment */}
      <li className="menu-item">
        <a className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bi bi-calendar-heart"></i>
          <div className="text-truncate" data-i18n="Account Settings">Stalls Appointment</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Account">Request Appointment</div>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Notifications">Approved Appointment</div>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Connections">Cancelled Appointment</div>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Connections">All Appointment</div>
            </a>
          </li>
        </ul>
      </li>
      <li className="menu-item">
        <a className="menu-link">
          <i className="menu-icon tf-icons bi bi-shop"></i>
          <div className="text-truncate" data-i18n="Misc">Manage Stalls</div>
        </a>
      </li>

      {/* Facilitities Header */}
      <li className="menu-header small text-uppercase">
        <span className="menu-header-text"> Facilities</span>
      </li>
      {/* Facilitities Appointment */}
      <li className="menu-item">
        <a className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bx bxs-calendar-star"></i>
          <div className="text-truncate" data-i18n="Account Settings">Facilitities Appointment</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Account">Request Appointment</div>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Notifications">Approved Appointment</div>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Connections">Cancelled Appointment</div>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Connections">All Appointment</div>
            </a>
          </li>
        </ul>
      </li>
      <li className="menu-item">
        <a className="menu-link">
          <i className="menu-icon tf-icons bi bi-building-fill-gear"></i>
          <div className="text-truncate" data-i18n="Misc">Manage Facilitities</div>
        </a>
      </li>

      {/* Complaints Header */}
      <li className="menu-header small text-uppercase">
        <span className="menu-header-text"> Complaints</span>
      </li>
      {/* Facilitities Appointment */}
      <li className="menu-item">
        <a className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bi bi-envelope-exclamation"></i>
          <div className="text-truncate" data-i18n="Account Settings">Manage Complaint</div>
        </a>
        <ul className="menu-sub">
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Account">Not Process</div>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Notifications">In Process</div>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Connections">Close</div>
            </a>
          </li>
          <li className="menu-item">
            <a className="menu-link">
              <div className="text-truncate" data-i18n="Connections">All Complaints</div>
            </a>
          </li>
        </ul>
      </li>
      <li className="menu-item">
        <a className="menu-link">
          <i className="menu-icon tf-icons bx bx-category"></i>
          <div className="text-truncate" data-i18n="Misc">Manage Category</div>
        </a>
      </li>

      {/* Discover Header */}
      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Discover</span>
      </li>
      {/* Manage Discover */}
      <li className="menu-item">
        <a className="menu-link">
          <i className="menu-icon tf-icons bx bx-calendar-event"></i>
          <div className="text-truncate" data-i18n="Misc">Manage Discover</div>
        </a>
      </li>

       {/* Report Header */}
       <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Report</span>
      </li>
      <li className="menu-item">
        <a className="menu-link">
          <i className="menu-icon tf-icons bx bxs-report"></i>
          <div className="text-truncate" data-i18n="Misc">Data Report</div>
        </a>
      </li>
      <li className="menu-item">
        <a className="menu-link">
          <i className="menu-icon tf-icons bi bi-envelope-paper"></i>
          <div className="text-truncate" data-i18n="Misc">Complaint Report</div>
        </a>
      </li>
    </ul>
    </aside>
  )
}
