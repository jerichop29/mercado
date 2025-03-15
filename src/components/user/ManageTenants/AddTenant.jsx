import React, { useState } from 'react';
import Select from 'react-select';
import { useData } from '../../../../backend/src/views/useData';
import useaddTenant from '../../../../backend/src/forms/templates/Tenants/addTenant';
export default function AddTenant({ onClose, onSubmitSuccess, edit }) {
    // State for managing selected stall
    const [selectedStall, setSelectedStall] = useState(null);
    const [selectedBuilding, setSelectedBuilding] = useState('');
    const { stall } = useData();
    const { formData, message, handleChange, handleSubmit, resetForm } = useaddTenant(edit, onSubmitSuccess);
    // Handle building selection
    const handleSelectedBuilding = (selectedBuilding) => {
        setSelectedBuilding(selectedBuilding);
    };
    

    // Stall options for the dropdown, filtered by selected building
    const stallOptions = stall
        .filter(s => s.Status == "Occupied"  && (!selectedBuilding || s.BuildingName === selectedBuilding))
        .map((s) => ({
            value: s.Stall_Id,
            label: s.StallCode
        }));

     // Handle stall selection or input change
     const handleStallChange = (selectedOption) => {
        setSelectedStall(selectedOption);
        if (selectedOption) {
            // Update formData with the selected stall ID
            handleChange({ target: { name: 'Stall_Id', value: selectedOption.value } });
        } else {
            handleChange({ target: { name: 'Stall_Id', value: '' } });
        }
    };


    return (
        <>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 id="offcanvasAddUserLabel" className="offcanvas-title">{edit?"Edit":"Add"} Tenant</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body mx-0 flex-grow-0 p-6 h-100">
                    <form className="add-new-user pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="addNewUserForm" onSubmit={handleSubmit} noValidate="novalidate">
                        <div className="mb-6 form-control-validation fv-plugins-icon-container">
                            <label className="form-label" htmlFor="add-user-fullname">First Name</label>
                            <input  type="text" 
                                className="form-control"
                                placeholder="First Name"
                                id="add-user-fname" 
                                name="FName" 
                                value={formData.FName} 
                                onChange={handleChange} 
                                required />
                        </div>
                        <div className="mb-6 form-control-validation fv-plugins-icon-container">
                            <label className="form-label" htmlFor="add-user-middlename">Middle Name</label>
                            <input 
                                    type="text" 
                                    className="form-control"
                                    id="add-user-middlename"
                                  placeholder="Middle Name"
                                    name="MName"
                                    onChange={handleChange} 
                                    value={formData.MName} 
                                    aria-label="Middle Name" 
                                    required
                                    />
                        </div>
                        <div className="mb-6 form-control-validation fv-plugins-icon-container">
                            <label className="form-label" htmlFor="add-user-lastname">Last Name</label>
                            <input type="text" 
                                   className="form-control" 
                                   id="add-user-lastname" 
                                   placeholder="Last Name" 
                                   name="LName" 
                                   onChange={handleChange} 
                                   value={formData.LName} 
                                   aria-label="Last Name" 
                                   required
                                   />
                        </div>
                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-user-birthdate">Birthdate</label>
                            <input 
                                type="date" 
                                id="add-user-birthdate"     
                                name="Birthdate" 
                                className="form-control "
                                value={formData.Birthdate} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                        <div className="mb-6 form-control-validation fv-plugins-icon-container">
                            <label className="form-label" htmlFor="add-user-email">Email</label>
                            <input type="text" id="add-user-email" className="form-control" placeholder="user@example.com" onChange={handleChange} value={formData.Email} aria-label="User@example.com" name="Email" />
                        </div>
                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-user-contact">Contact</label>
                            <input type="text" id="add-user-contact" maxLength={11} minLength={11} pattern="^(09\d{9}|\+63\s9\d{8}|9\d{9})$" onChange={handleChange} value={formData.Contact} className="form-control phone-mask" placeholder="09884411221" aria-label="Contact" name="Contact" />
                        </div>
                        <div className="mb-6">
                            <label className="form-label" htmlFor="user-gender">Gender</label>
                            <select 
                                id="user-gender" 
                                className="form-control"
                                name="Gender" 
                                value={formData.Gender} 
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-tenant-address" >Address</label>
                            <input type="text" id="add-tenant-address" className="form-control" onChange={handleChange} value={formData.Address} placeholder="Address" aria-label="Address" name="Address" />
                        </div>
                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-tenant-marketfee">Market Fee</label>
                            <input type="text" id="add-tenant-marketfee" className="form-control" onChange={handleChange} value={formData.Market_Fee} placeholder="3000" aria-label="marketfee" name="Market_Fee" />
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
                                value={stallOptions.find(option => option.value === formData.Stall_Id)|| null}
                                className="form-react-select"
                                classNamePrefix="react-select"
                                onChange={handleStallChange}
                                options={stallOptions}
                                isClearable
                                isSearchable
                                placeholder="Select or type a Stall"
                            />
                        </div>
                        <div className='mt-4'>
                        {message.text && (
                            <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'} mt-3`}>
                                {message.text}
                            </div>
                        )}

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
