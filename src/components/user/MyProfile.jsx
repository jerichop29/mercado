import {useState} from "react";
import {useLocation} from 'react-router-dom';
import useAddUserModel from "../../../backend/src/forms/templates/User/addUserModel";
import { Alert } from "../main/DialogueBox/DialogueBox";
export default function MyProfile() {
    const [activeTab,
        setActiveTab] = useState("account");
    const location = useLocation();
    const { editData } = location.state || {
        editData: null
    };
    const {formData, message, handleChange, handleSubmit, resetForm} = useAddUserModel(editData);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const success = await handleSubmit(e); // Ensure handleSubmit executes properly
            console.log(success)
                Alert("User's Account Details Updated")
                resetForm(); // Only reset if submission is successful
            
        } catch (error) {
            console.error("Form submission failed:", error);
        }
    };
    
    return ( <> <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
            <div className="col-md-12">
                <ul className="nav nav-pills flex-column flex-md-row mb-6 gap-md-2 gap-2">
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === "account"
                            ? "active"
                            : ""}`}
                            onClick={() => setActiveTab("account")}
                            style={{
                            cursor: "pointer"
                        }}>
                            <i className="icon-base bx bx-user icon-sm me-1_5"></i>
                            Account
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab === "password"
                            ? "active"
                            : ""}`}
                            onClick={() => setActiveTab("password")}
                            style={{
                            cursor: "pointer"
                        }}>
                            <i className="icon-base bi bi-lock icon-sm me-1_5"></i>
                            Password
                        </a>
                    </li>
                </ul>

                {activeTab === "account" && (
                    <div className="card mb-6">
                        <div className="card-body">
                            <div
                                className="d-flex align-items-start align-items-sm-center gap-4 pb-4 border-bottom">
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg"
                                    alt="user-avatar"
                                    className="d-block w-px-100 h-px-100 rounded"
                                    id="uploadedAvatar"/>
                                <div className="button-wrapper">
                                    <label htmlFor="upload" className="btn tbl-btn-primary me-3 mb-4" tabIndex="0">
                                        <span className="d-flex justify-content-between align-item-center">
                                            <i className="icon-base bx bx-photo-album icon-lg me-0 me-sm-2"></i>
                                            <span className="d-none d-sm-inline-block">Upload new photo</span>
                                        </span>
                                        <input
                                            type="file"
                                            id="upload"
                                            className="account-file-input"
                                            hidden
                                            accept="image/png, image/jpeg"/>
                                    </label>
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary account-image-reset mb-4">Reset</button>
                                    <div>Allowed JPG, GIF, or PNG. Max size of 800K</div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body pt-4">
                            <form
                                id="formAccountSettings"
                                method="POST"
                                onSubmit={handleFormSubmit}>
                                <div className="row g-6">
                                    <div className="col-md-6">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="FName"
                                            name="FName"
                                            value={formData.FName}
                                            onChange={handleChange}
                                            defaultValue="First Name"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="middleName" className="form-label">Middle Name</label>
                                        <input
                                            className="form-control"
                                            type="MName"
                                            id="middleName"
                                            name="MName"
                                            value={formData.MName}
                                            onChange={handleChange}
                                            defaultValue="Middle Name"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="LName"
                                            id="LName"
                                            value={formData.LName}
                                            onChange={handleChange}
                                            defaultValue="Last Name"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="Address"
                                            value={formData.Address}
                                            onChange={handleChange}
                                            id="Address"
                                            defaultValue="Address"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label">E-mail</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="Email"
                                            name="Email"
                                            value={formData.Email}
                                            onChange={handleChange}
                                            defaultValue="user.@example.com"
                                            placeholder="jericho.pecho@example.com"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                                        <div className="input-group input-group-merge">
                                            <span className="input-group-text">PH (+63)</span>
                                            <input
                                                type="text"
                                                id="Contact"
                                                name="Contact"
                                                value={formData.Contact}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="202 555 0111"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className="btn tbl-btn-primary me-3">Save changes</button>
                                    <button type="reset" className="btn btn-outline-secondary">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {activeTab === "password" && (
                    <div className="card mb-6">
                        <div className="card-body pt-4">
                            <form
                                id="formPasswordChange"
                                method="POST"
                                onSubmit={(e) => e.preventDefault()}>
                                <div className="row g-6">
                                    <div className="col-md-6">
                                        <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="currentPassword"
                                            name="currentPassword"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="newPassword" className="form-label">New Password</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"/>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className="btn tbl-btn-primary me-3">Change Password</button>
                                    <button type="reset" className="btn btn-outline-secondary">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div> </>
    );
}