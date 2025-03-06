import React, { useState } from 'react';
import Select from 'react-select';
import { useData } from '../../../hooks/useData';
import useAddTenantModel from '../../../../backend/src/forms/templates/Tenants/addTenantModel';
export default function AddTenant( onClose, onSubmitSuccess ,edit) {
    // State for managing selected stall
    const [selectedStall, setSelectedStall] = useState(null);
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const { stall } = useData("", "");

    // Handle building selection
    const handleSelectedBuilding = (selectedBuilding) => {
        setSelectedBuilding(selectedBuilding);
    };

    // Stall options for the dropdown, filtered by selected building
    const stallOptions = stall
        .filter(s => s.Status === "Occupied" && (!selectedBuilding || s.BuildingName === selectedBuilding))
        .map((s) => ({
            value: s.Stall_Id,
            label: s.StallCode
        }));

    // Handle stall selection or input change
    const handleStallChange = (selectedOption) => {
        setSelectedStall(selectedOption);
    };

    const { formData,
        message,
        handleChange,
        handleSubmit,
        setFormData,
        setMessage,
        resetForm } = useAddTenantModel(edit, onSubmitSuccess);
    return (
        <>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 id="offcanvasAddUserLabel" className="offcanvas-title">Add Tenant</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body mx-0 flex-grow-0 p-6 h-100">
                    <form className="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} noValidate="novalidate">
                        <div className="mb-6 form-control-validation fv-plugins-icon-container">
                            <label className="form-label" htmlFor="add-user-fullname">First Name</label>
                            <input type="text" className="form-control" id="add-user-firstname" placeholder="First Name" name="userFullname" aria-label="First Name" />
                        </div>
                        <div className="mb-6 form-control-validation fv-plugins-icon-container">
                            <label className="form-label" htmlFor="add-user-middlename">Middle Name</label>
                            <input type="text" className="form-control" id="add-user-middlename" placeholder="Middle Name" name="userFullname" aria-label="Middle Name" />
                        </div>
                        <div className="mb-6 form-control-validation fv-plugins-icon-container">
                            <label className="form-label" htmlFor="add-user-lastname">Last Name</label>
                            <input type="text" className="form-control" id="add-user-lastname" placeholder="Last Name" name="userFullname" aria-label="Last Name" />
                        </div>
                        <div className="mb-6 form-control-validation fv-plugins-icon-container">
                            <label className="form-label" htmlFor="add-user-email">Email</label>
                            <input type="text" id="add-user-email" className="form-control" placeholder="user@example.com" aria-label="User@example.com" name="userEmail" />
                        </div>
                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-user-contact">Contact</label>
                            <input type="text" id="add-user-contact" maxLength={11} minLength={11} pattern="^(09\d{9}|\+63\s9\d{8}|9\d{9})$" className="form-control phone-mask" placeholder="09884411221" aria-label="Contact" name="userContact" />
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
                            <label className="form-label" htmlFor="add-tenant-marketfee">Market Fee</label>
                            <input type="text" id="add-tenant-marketfee" className="form-control" placeholder="3000" aria-label="marketfee" name="marketfee" />
                        </div>
                        <div className="mb-6">
                            <label className="form-label" htmlFor="user-role">Building</label>
                            <select id="user-role" className="form-select" onChange={(e) => handleSelectedBuilding(e.target.value)}>
                                <option value="">All Buildings</option>
                                <option value="Building 1">Building 1</option>
                                <option value="Building 2">Building 2</option>
                                <option value="Building 3">Building 3</option>
                                <option value="Building 4">Building 4</option>
                                <option value="Building 5">Building 5</option>
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
                        <div className="mt-4">
                            <button type="submit" className="btn btn-primary me-3">Submit</button>
                            <button 
                                type="button" 
                                className="btn btn-label-danger" 
                                data-bs-dismiss="offcanvas" 
                                onClick={() => {
                                    resetForm();
                                    if (onClose) onClose();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
