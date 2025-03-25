import { getUser } from "../../../utils/auth";
import { useData } from "../../../../backend/src/views/useData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const OwnerDashboard = () => {
    const navigate = useNavigate();
    const { username } = useData(getUser())
    const { avatar } = useData(username[0]?.Person_Id);
    const handleProfileClick = (e, user) => {
        e.preventDefault();
        const editData = {
            Username: user.Username,
            FName: user.FName,
            MName: user.MName,
            LName: user.LName,
            Address: user.Address,
            Contact: user.Contact,
            Email: user.Email,
            id: user.Person_Id,
            Owner_Id: user.Owner_Id,
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
    return (
        <>
            <div className="row">
                <div className="col-lg-12 mb-4 order-0">
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
                                        You are logged in as <span className="fw-medium">Owner</span> description about account type
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
                                    <img aria-label='dsahboard icon image'
                                        src="/assets/img/illustrations/man-with-laptop-light.png"
                                        height="140"
                                        alt="View Badge User"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 col-md-12 order-md-2">
                    <div className="row">
                        <div className="col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                            <img aria-label='dsahboard icon image'
                                                src="/assets/img/icons/unicons/allComplaints.png"
                                                alt="Appointment"
                                                className="rounded"
                                            />
                                        </div>
                                        <div className="dropdown">
                                            <button aria-label='Click me'
                                                className="btn p-0"
                                                type="button"
                                                id="cardOpt4"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div
                                                className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="cardOpt4"
                                            >
                                                <a aria-label="view more" className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="d-block mb-1">Total Complaints</span>
                                    <h3 className="card-title text-nowrap mb-2">5</h3>
                                    <small className="text-info fw-medium">
                                        <i className="bx bx-up-arrow-alt"></i> All My Reports
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                            <img aria-label='dsahboard icon image'
                                                src="/assets/img/icons/unicons/notProcess.png"
                                                alt="Discover"
                                                className="rounded"
                                            />
                                        </div>
                                        <div className="dropdown">
                                            <button aria-label='Click me'
                                                className="btn p-0"
                                                type="button"
                                                id="cardOpt1"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="cardOpt1">
                                                <a aria-label="view more" className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="fw-medium d-block mb-1">Not Process</span>
                                    <h3 className="card-title mb-2">2</h3>
                                    <small className="text-danger fw-medium">
                                        <i className="bx bx-up-arrow-alt"></i> Unreviewed
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-12 col-md-12 order-md-2">
                    <div className="row">
                        <div className="col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                            <img aria-label='dsahboard icon image'
                                                src="/assets/img/icons/unicons/inProcess.png"
                                                alt="Appointment"
                                                className="rounded"
                                            />
                                        </div>
                                        <div className="dropdown">
                                            <button aria-label='Click me'
                                                className="btn p-0"
                                                type="button"
                                                id="cardOpt4"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div
                                                className="dropdown-menu dropdown-menu-end"
                                                aria-labelledby="cardOpt4"
                                            >
                                                <a aria-label="view more" className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="d-block mb-1">In Process</span>
                                    <h3 className="card-title text-nowrap mb-2">2</h3>
                                    <small className="text-warning fw-medium">
                                        <i className="bx bx-up-arrow-alt"></i> Ongoing Complaints
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title d-flex align-items-start justify-content-between">
                                        <div className="avatar flex-shrink-0">
                                            <img aria-label='dsahboard icon image'
                                                src="/assets/img/icons/unicons/resolved.png"
                                                alt="Discover"
                                                className="rounded"
                                            />
                                        </div>
                                        <div className="dropdown">
                                            <button aria-label='Click me'
                                                className="btn p-0"
                                                type="button"
                                                id="cardOpt1"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="cardOpt1">
                                                <a aria-label="view more" className="dropdown-item" href="#">
                                                    View More
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="fw-medium d-block mb-1">Resolved</span>
                                    <h3 className="card-title mb-2">1</h3>
                                    <small className="text-success fw-medium">
                                        <i className="bx bx-up-arrow-alt"></i> Completed Issues
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
export default OwnerDashboard;