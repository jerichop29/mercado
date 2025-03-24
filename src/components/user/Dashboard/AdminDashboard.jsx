import {useEffect, useState} from "react";
import {useData} from "../../../../backend/src/views/useData";
import {getUser} from "../../../utils/auth";
import {CardStats} from "../../../utils/CardStatsData";
import { Link,useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const { admin,complaints,discover,appointment,stall } = useData();
    const { stallsOccupied } = CardStats();
    const { username } = useData(getUser());
    const { avatar } = useData(username[0]?.Person_Id);

    const [pie, setPieData] = useState(0);
        useEffect(() => {
            const pData = parseFloat(stallsOccupied);
            setPieData(pData);
          }, [stallsOccupied]);
        
          useEffect(() => {
            if (!isNaN(pie)) {
              dashboardAnalitics([pie]);
            }
          }, [pie]);

          const handleProfileClick = (e, user) => {
            e.preventDefault();
            // Prepare the data for editing
            const editData = {
                Username: user.Username,
                FName: user.FName,
                MName: user.MName,
                LName: user.LName,
                Address: user.Address,
                Contact: user.Contact,
                Email: user.Email,
                id: user.Person_Id,
                Admin_Id: user.Admin_Id,
                Gender: user.Gender,
                Birthdate: user.Birthdate,
                imageId: avatar[0]?.Avatar_Id || null,
                Avatar: avatar[0]?.image || null,
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
    return ( <> <div className="row">
        <div className="col-lg-8 mb-4 order-0">
            <div className="card">
                <div className="d-flex align-items-end row">
                    <div className="col-sm-7">
                        <div className="card-body">
                            <h5 className="card-title text-primary">
                                Welcome {Array.isArray(username) && username.length > 0 
                                    ? username[0]
                                        ?.FName
                                        : "Guest"}! 🎉
                            </h5>
                            <p className="mb-4">
                                You are logged in as
                                <span className="fw-medium"> Admin </span>
                                description about account type
                            </p>

                            <Link
                                aria-label="view badges"
                                onClick={(e)=>handleProfileClick(e,username.length > 0 ?username[0]:"")}
                                className="btn btn-sm btn-outline-primary">
                                View Details
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-5 text-center text-sm-left">
                        <div className="card-body pb-0 px-0 px-md-4">
                            <img
                                aria-label='dsahboard icon image'
                                src="/assets/img/illustrations/man-with-laptop-light.png"
                                height="140"
                                alt="View Badge User"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-4 col-md-4 order-1">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                                <div className="avatar flex-shrink-0">
                                    <img
                                        aria-label='dsahboard icon image'
                                        src="/assets/img/icons/unicons/entrepreneur.png"
                                        alt="Users"
                                        className="rounded"/>
                                </div>
                                <div className="dropdown">
                                    <button
                                        aria-label='Click me'
                                        className="btn p-0"
                                        type="button"
                                        id="cardOpt3"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        <i className="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                                        <a aria-label="view more" className="dropdown-item" href="#">
                                            View More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <span className="fw-medium d-block mb-1">Users</span>
                            <h3 className="card-title mb-2">{admin.length}</h3>
                            {/* <small className="text-success fw-medium">
                                <i className="bx bx-up-arrow-alt"></i>stall admin's
                            </small> */}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 col-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                                <div className="avatar flex-shrink-0">
                                    <img
                                        aria-label='dsahboard icon image'
                                        src="/assets/img/icons/unicons/complaints.png"
                                        alt="Complaints"
                                        className="rounded"/>
                                </div>
                                <div className="dropdown">
                                    <button
                                        aria-label='Click me'
                                        className="btn p-0"
                                        type="button"
                                        id="cardOpt6"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        <i className="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                                        <a aria-label="view more" className="dropdown-item" href="#">
                                            View More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <span>Complaints</span>
                            <h3 className="card-title text-nowrap mb-1">{complaints.length}</h3>
                            {/* <small className="text-danger fw-medium">
                                <i className="bx bx-up-arrow-alt"></i>
                                new complaints
                            </small> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
            <div className="card">
                <div className="row row-bordered g-0">
                    <div className="col-md-8">
                        <h5 className="card-header m-0 me-2 pb-3">Number of New Stalls Occupied</h5>
                        <div id="totalRevenueChart" className="px-2"></div>
                    </div>
                    <div className="col-md-4">
                        <div className="card-body">
                            <div className="text-center">
                                <div className="dropdown">
                                    <button
                                        aria-label='Years selection 2025'
                                        className="btn btn-sm btn-outline-primary dropdown-toggle"
                                        type="button"
                                        id="growthReportId"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        2025
                                    </button>
                                    <div
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="growthReportId">
                                        <a aria-label="dropdown item 2024" className="dropdown-item" href="#">
                                            2024
                                        </a>
                                        <a aria-label="dropdown item 2023" className="dropdown-item" href="#">
                                            2023
                                        </a>
                                        <a aria-label="dropdown item 2022" className="dropdown-item" href="#">
                                            2022
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="growthChart"></div>
                        <div className="text-center fw-medium pt-3 mb-2">
                            Number of Stalls
                        </div>

                        <div
                            className="d-flex px-xxl-4 px-lg-2 p-4 gap-xxl-3 gap-lg-1 gap-3 justify-content-center">
                            <div className="d-flex">
                                <div className="me-2">
                                    <span className="badge bg-label-primary p-3">
                                        <i className="bx bx-store-alt text-primary"></i>
                                    </span>
                                </div>
                                <div className="d-flex flex-column">
                                    <small>Year 2025</small>
                                    <h6 className="mb-0">{stall.length}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
            <div className="row">
                <div className="col-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                                <div className="avatar flex-shrink-0">
                                    <img
                                        aria-label='dsahboard icon image'
                                        src="/assets/img/icons/unicons/appointment.png"
                                        alt="Appointment"
                                        className="rounded"/>
                                </div>
                                <div className="dropdown">
                                    <button
                                        aria-label='Click me'
                                        className="btn p-0"
                                        type="button"
                                        id="cardOpt4"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        <i className="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt4">
                                        <a aria-label="view more" className="dropdown-item" href="#">
                                            View More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <span className="d-block mb-1">Appointment</span>
                            <h3 className="card-title text-nowrap mb-2">{appointment.length}</h3>
                            {/* <small className="text-success fw-medium">
                                <i className="bx bx-up-arrow-alt"></i>
                                new request
                            </small> */}
                        </div>
                    </div>
                </div>
                <div className="col-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                                <div className="avatar flex-shrink-0">
                                    <img
                                        aria-label='dsahboard icon image'
                                        src="/assets/img/icons/unicons/news.png"
                                        alt="Discover"
                                        className="rounded"/>
                                </div>
                                <div className="dropdown">
                                    <button
                                        aria-label='Click me'
                                        className="btn p-0"
                                        type="button"
                                        id="cardOpt1"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        <i className="bx bx-dots-vertical-rounded"></i>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="cardOpt1">
                                        <a aria-label="view more" className="dropdown-item" href="#">
                                            View More
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <span className="fw-medium d-block mb-1">Discover</span>
                            <h3 className="card-title mb-2">{discover.length}</h3>
                            {/* <small className="text-success fw-medium">
                                <i className="bx bx-up-arrow-alt"></i>
                                Announcements
                            </small> */}
                        </div>
                    </div>
                </div>

                <div className="col-12 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                                <div
                                    className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                                    <div className="card-title">
                                        <h5 className="text-nowrap mb-2">Complaints Report</h5>
                                        <span className="badge bg-label-primary rounded-pill">
                                            Current Year {new Date().getFullYear()}
                                        </span> 
                                    </div>
                                    <div className="mt-sm-auto">
                                        {/* <small className="text-success text-nowrap fw-medium">
                                            <i className="bx bx-chevron-down"></i>
                                            Resolved Complaints
                                        </small> */}
                                        <h3 className="mb-0">100</h3>
                                    </div>
                                </div>
                                <div id="complaintReportChart"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> </>
    );
};
export default AdminDashboard;