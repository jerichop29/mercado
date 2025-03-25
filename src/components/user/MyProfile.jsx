import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import useAddUserModel from "../../../backend/src/forms/templates/User/addUserModel";
import useEditPassword from "../../../backend/src/forms/templates/User/editPassword";
import useAddAvatar from "../../../backend/src/forms/templates/Avatar/addAvatar";
export default function MyProfile() {
    const [activeTab,
        setActiveTab] = useState("account");
    const [showForm, setShowForm] = useState(false);
    const location = useLocation();
    
    const { editData } = location.state || {
        editData: null
    };
    console.log(editData)
    const { formData,
        message,
        handleChange,
        handleSubmit } = useAddUserModel(editData);

    const {
        imageData,
        imageMessage,
        handleImageChange,
        handleImageSubmit,
        resetImage
    } = useAddAvatar(editData);

    const { handlePasswordChange,
        resetPassword,
        passwordData,
        passwordMessage,
        handleEditPassword } = useEditPassword(editData);

    // Set imageData.Person_Id to editData.id on component load
    useEffect(() => {
        if (imageData.Person_Id !== editData.id) {
            imageData.Person_Id = editData.id; // Update Person_Id
            imageData.imageId = editData.imageId
        }
    }, [editData.id]); // Dependency array to run effect when editData.id changes

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleSubmit(e).then; // Ensure handleSubmit executes properly
        } catch (error) {
            console.error("Form submission failed:", error);
        }
    };

    const handleFormPasswordSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleEditPassword(e).then; // Ensure handleSubmit executes properly
        } catch (error) {
            console.error("Form submission failed:", error);
        }
    };


    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    return (<>
        <div className="container-xxl flex-grow-1 container-p-y">
            <div className="row">
                <div className="col-md-12">
                    <div className="container p-3 bg-light py-3 rounded">
                        <div className="profile-container position-relative mb-5">
                            {/* Cover Photo Section */}
                            <div className="cover-photo" style={{ height: '300px', backgroundColor: '#1877f2', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
                                <img
                                    src="/assets/img/hero-carousel/hero-carousel-2.jpg"
                                    alt="Mercado"
                                    style={{ width: '100%', height: '100%', objectFit: "cover" }}
                                />

                                {/* Settings Cog - positioned on the cover */}
                                <div className="position-absolute top-0 start-0 m-3">
                                    <button
                                        className="btn btn-light rounded-circle"
                                        onClick={() => setShowForm(!showForm)}
                                        aria-label="Edit Profile"
                                        style={{ width: '40px', height: '40px', padding: '0' }}
                                    >
                                        <i className="bx bx-cog fs-4"></i>
                                    </button>
                                </div>

                                {/* Profile Picture - positioned to overlap cover and info card */}
                                <div className="position-absolute" style={{ bottom: window.innerWidth < 768 ? '350px' : '182px', left: window.innerWidth < 768 ? '15vw' : '4px', zIndex: '3' }}>
                                    <div className="rounded-circle border border-4 border-white bg-primary shadow" style={{ width: '168px', height: '168px' }}>
                                        <img
                                            src={imageData.Avatar ?`data:image/jpeg;base64,${imageData.Avatar}` :editData.Avatar? editData.Avatar :  "https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg"}
                                            alt="Profile"
                                            className="w-100 h-100 rounded-circle"
                                            style={{ objectFit: 'cover' }}
                                            onClick={() => {
                                                setSelectedImage(imageData.Avatar ?`data:image/jpeg;base64,${imageData.Avatar}` :editData.Avatar? editData.Avatar :  "https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg");
                                                setShowImageModal(true);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Profile Info Card - positioned below cover photo */}
                            <div className="card border-0 shadow-sm mt-2 pt-2">
                                {/* Profile Info Content */}
                                <div className="card-body pt-4 ps-4 mt-2" style={{ paddingLeft: '200px' }}>
                                    <h1 className="fs-1 fw-bold mb-0">
                                        {formData.FName} {formData.MName} {formData.LName}
                                    </h1>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <p className="text-secondary mt-2 mb-1">{formData.Address}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="text-secondary">{formData.Email}</p>
                                            <p className="text-secondary">{formData.Contact}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal for Edit Form */}
                        {showForm &&
                            (

                                (activeTab === "account" && (
                                    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1200 }}>
                                        <div className="modal-dialog modal-dialog-centered modal-lg">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title fw-bold">Edit Profile</h5>
                                                    <button
                                                        type="button"
                                                        className="btn-close"
                                                        aria-label="Close"
                                                        onClick={() => setShowForm(false)}
                                                    ></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="mb-4">
                                                        <div className="d-flex align-items-center mb-3">
                                                            <div className="me-3">
                                                                <div className="rounded-circle overflow-hidden" style={{ width: '80px', height: '80px' }}>
                                                                    
                                                                        <img
                                                                            src={imageData.Avatar ?`data:image/jpeg;base64,${imageData.Avatar}` :editData.Avatar? editData.Avatar :  "https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg"}
                                                                            alt="user-avatar"
                                                                            className="w-100 h-100"
                                                                            style={{ objectFit: 'cover' }}
                                                                        />
                                                                 
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label htmlFor="upload" className="text-primary fw-bold d-block mb-1" style={{ cursor: 'pointer' }}>
                                                                    Upload New Photo
                                                                    <input
                                                                        type="file"
                                                                        id="upload"
                                                                        name="Avatar"
                                                                        className="d-none"
                                                                        accept="image/png, image/jpeg"
                                                                        onChange={handleImageChange}
                                                                    />
                                                                </label>
                                                                <small className="text-secondary">Allowed JPG, GIF, or PNG. Max size of 800K</small>
                                                            </div>
                                                            {imageMessage.text && (
                                                                <div className={`mx-5 p-3 alert alert-${imageMessage.type === 'error' ? 'danger' : 'success'} mt-3`}>
                                                                    {imageMessage.text}
                                                                </div>
                                                            )}
                                                           
                                                            {/* Hide buttons if imageMessage indicates success */}
                                                            {imageMessage.type !== 'success' && (
                                                                <div className="text-end mx-3">
                                                                    {imageData.Avatar && (
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-primary mx-1"
                                                                            onClick={(e) => {handleImageSubmit(e)}}
                                                                        >
                                                                            Save
                                                                        </button>
                                                                    )}
                                                                    {(imageData.Avatar || editData.Avatar) && (
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-secondary mx-1"
                                                                            onClick={() => resetImage()}
                                                                        >
                                                                            Reset
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            )}
                                                            
                                                        </div>

                                                        <form onSubmit={handleFormSubmit}>
                                                            <div className="row mb-3">
                                                                <div className="col-md-4 mb-3 mb-md-0">
                                                                    <label htmlFor="firstName" className="form-label fw-bold">First Name</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="firstName"
                                                                        name="FName"
                                                                        value={formData.FName}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div className="col-md-4 mb-3 mb-md-0">
                                                                    <label htmlFor="middleName" className="form-label fw-bold">Middle Name</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="middleName"
                                                                        name="MName"
                                                                        value={formData.MName}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <label htmlFor="lastName" className="form-label fw-bold">Last Name</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="lastName"
                                                                        name="LName"
                                                                        value={formData.LName}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="mb-3">
                                                                <label htmlFor="address" className="form-label fw-bold">Address</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="address"
                                                                    name="Address"
                                                                    value={formData.Address}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>

                                                            <div className="row mb-3">
                                                                <div className="col-md-6 mb-3 mb-md-0">
                                                                    <label htmlFor="email" className="form-label fw-bold">Email</label>
                                                                    <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        id="email"
                                                                        name="Email"
                                                                        value={formData.Email}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label htmlFor="phone" className="form-label fw-bold">Phone Number</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="phone"
                                                                        name="Contact"
                                                                        value={formData.Contact}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="text-end mt-4">
                                                            {message?.text && (
                                                                <div className={`alert alert-${message?.type === 'error' ? 'danger' : 'success'} mt-3`}>
                                                                    {message?.text}
                                                                </div>
                                                            )}
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-secondary mx-1 col-sm-4 col-lg-3"
                                                                    onClick={() => { setShowForm(false) }}
                                                                >
                                                                    Cancel
                                                                </button>

                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-primary col-sm-6 col-lg-3"
                                                                >
                                                                    Save
                                                                </button>
                                                            </div>
                                                        </form>
                                                        <a
                                                            className={`nav-link ${activeTab === "password"
                                                                ? "active"
                                                                : ""} mt-5`}
                                                            onClick={() => setActiveTab("password")}
                                                            style={{
                                                                cursor: "pointer"
                                                            }}>
                                                            <i className="icon-base bi bi-lock icon-sm me-1_5"></i>
                                                            Change Password
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) ||
                                    (activeTab === "password" && (
                                        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1200 }}>
                                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title fw-bold">Change Password</h5>
                                                        <button
                                                            type="button"
                                                            className="btn-close"
                                                            aria-label="Close"
                                                            onClick={() => setShowForm(false)}
                                                        ></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form
                                                            id="formPasswordChange"
                                                            method="POST"
                                                            onSubmit={handleFormPasswordSubmit}>
                                                            <div className="row g-6">
                                                                <div className="col-md-12">
                                                                    <label htmlFor="current_password" className="form-label fw-bold">Current Password</label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="password"
                                                                        value={passwordData.current_password}
                                                                        onChange={handlePasswordChange}
                                                                        id="current_password"
                                                                        name="current_password" />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label htmlFor="new_password" className="form-label fw-bold">New Password</label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="password"
                                                                        value={passwordData.new_password}
                                                                        onChange={handlePasswordChange}
                                                                        id="new_password"
                                                                        name="new_password" />
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <label htmlFor="confirm_password" className="form-label fw-bold">Confirm New Password</label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="password"
                                                                        value={passwordData.confirm_password}
                                                                        onChange={handlePasswordChange}
                                                                        id="confirm_password"
                                                                        name="confirm_password" />
                                                                </div>
                                                            </div>
                                                            {passwordMessage.text && (
                                                                <div className={`alert alert-${passwordMessage.type === 'error' ? 'danger' : 'success'} mt-3`}>
                                                                    {passwordMessage.text}
                                                                </div>
                                                            )}

                                                            <div className="text-end mt-4">
                                                                <button type="button" className="btn btn-secondary me-1 col-sm-4 col-lg-3" onClick={() => { setShowForm(false); resetPassword(); }}>
                                                                    Cancel
                                                                </button>
                                                                <button type="submit" className="btn btn-primary col-sm-6 col-lg-2">
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </form>
                                                        <a
                                                            className={`nav-link ${activeTab === "account"
                                                                ? "active"
                                                                : ""}mt-5`}
                                                            onClick={() => setActiveTab("account")}
                                                            style={{
                                                                cursor: "pointer"
                                                            }}>
                                                            <i className="icon-base bx bx-user icon-sm me-1_5"></i>
                                                            Edit Account
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    ))
                            )}
                    </div>
                </div>
            </div>
        </div>

        {/* Modal for Image Preview */}
        {showImageModal && (
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1200 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-transparent">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={() => setShowImageModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body text-center">
                            <img
                                src={selectedImage}
                                alt="Full Size"
                                className="img-fluid"
                                style={{ width: '100vw', height: '40vh', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    );
}