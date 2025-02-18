import React, { useState } from 'react';
import Select from 'react-select';

export default function AddTenant() {
    // State for managing selected stall
    const [selectedStall, setSelectedStall] = useState(null);

    // Stall options for the dropdown
    const stallOptions = [
        { value: 'Stall 1', label: 'Stall 1' },
        { value: 'Stall 2', label: 'Stall 2' },
        { value: 'Stall 3', label: 'Stall 3' },
        { value: 'Stall 4', label: 'Stall 4' },
        { value: 'Stall 5', label: 'Stall 5' },
    ]

    // Handle stall selection or input change
    const handleStallChange = (selectedOption) => {
        setSelectedStall(selectedOption);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add logic to handle form submission here
        console.log("Form submitted");
    };

    return (
        <>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 id="offcanvasAddUserLabel" className="offcanvas-title">Add Tenant</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body mx-0 flex-grow-0 p-6 h-100">
                    {/* Single form wrapping all the input elements */}
                    <form className="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} noValidate="novalidate">
                        <div className="mb-6 form-control-validation fv-plugins-icon-container">
                            <label className="form-label" htmlFor="add-user-fullname">Full Name</label>
                            <input type="text" className="form-control" id="add-user-fullname" placeholder="Full Name" name="userFullname" aria-label="Full Name" />
                        </div>
                        <div className="mb-6 form-control-validation fv-plugins-icon-container">
                            <label className="form-label" htmlFor="add-user-email">Email</label>
                            <input type="text" id="add-user-email" className="form-control" placeholder="user@example.com" aria-label="User@example.com" name="userEmail" />
                        </div>
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
                            <label className="form-label" htmlFor="add-tenant-address">Address</label>
                            <input type="text" id="add-tenant-address" className="form-control" placeholder="Address" aria-label="Address" name="address" />
                        </div>
                        <div className="mb-6">
                            <label className="form-label" htmlFor="user-role">Building</label>
                            <select id="user-role" className="form-select">
                                <option value="1">Building 1</option>
                                <option value="2">Building 2</option>
                                <option value="3">Building 3</option>
                                <option value="4">Building 4</option>
                                <option value="5">Building 5</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-tenant-stall">Stall</label>
                            <Select
                                id="add-tenant-stall"
                                value={selectedStall}
                                className="form-react-select"
                                classNamePrefix="react-select"
                                onChange={handleStallChange}
                                options={stallOptions}
                                isClearable
                                isSearchable
                                placeholder="Select or type a Stall"
                                />
                        </div>
                        <button type="submit" className="btn btn-primary me-3 data-submit">Submit</button>
                        <button type="reset" className="btn btn-label-danger" data-bs-dismiss="offcanvas">Cancel</button>
                    </form>
                </div>
            </div>
        </>
    );
}
