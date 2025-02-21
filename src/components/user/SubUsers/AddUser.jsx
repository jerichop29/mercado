export default function AddUser() {
    
    return (
        <>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 id="offcanvasAddUserLabel" className="offcanvas-title">Add User</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body mx-0 flex-grow-0 p-6 h-100">
                    <form className="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onClick={(e) => e.preventDefault()} noValidate="novalidate">
                        <div className="mb-6 form-control-validation fv-plugins-icon-container">
                            <label className="form-label" htmlFor="add-user-fullname">Full Name</label>
                            <input type="text" className="form-control" id="add-user-fullname" placeholder="Full Name" name="userFullname" aria-label="Full Name" />
                            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                        <div className="mb-6 form-control-validation fv-plugins-icon-container">
                            <label className="form-label" htmlFor="add-user-email">Email</label>
                            <input type="text" id="add-user-email" className="form-control" placeholder="user@example.com" aria-label="User@example.com" name="userEmail" />
                            <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div></div>
                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-user-contact">Contact</label>
                            <input type="text" id="add-user-contact" className="form-control phone-mask" placeholder="+1 (609) 988-44-11" aria-label="Contact" name="userContact" />
                        </div>
                        <div className="mb-6">
                            <label className="form-label" htmlFor="user-role">Sex</label>
                            <select id="user-role" className="form-select">
                                <option value="subscriber">Male</option>
                                <option value="editor">Female</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-user-address">Address</label>
                            <input type="text" id="add-user-address" className="form-control" placeholder="Address" aria-label="Address" name="address" />
                        </div>
                        <div className="mb-6">
                            <label className="form-label" htmlFor="user-role">User Role</label>
                            <select id="user-role" className="form-select">
                                <option value="subscriber">Admin</option>
                                <option value="editor">Owner</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary me-3 data-submit">Submit</button>
                        <button type="reset" className="btn btn-label-danger" data-bs-dismiss="offcanvas">Cancel</button>
                        <input type="hidden" /></form>
                </div>
            </div>
        </>
    )
}