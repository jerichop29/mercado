import Select from 'react-select';
import { useState } from "react";
import useAddUserModel from "../../../../backend/src/forms/templates/User/addUserModel";
import { useData } from '../../../../backend/src/views/useData';
import { Alert } from '../../main/DialogueBox/DialogueBox';
export default function AddUser({ onClose, onSubmitSuccess ,edit}) {
const { stall }=useData();

// State for managing selected stall
   
        
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

    const {
        formData,
        message,
        handleChange,
        handleSubmit,
        resetForm
    } = useAddUserModel(edit, onSubmitSuccess);
    const stallOptions = stall.filter(s => s.Status === "Available").map((s) => ({
        value: s.Stall_Id,
        label: s.StallCode
    }));
    const OccupiedStall = stall.filter(s => s.Status === "Occupied").map((s) => ({
        value: s.Stall_Id,
        label: s.StallCode
    }));
    const [selectedStall, setSelectedStall] = useState(edit ? stallOptions.find(option => option.value === formData.Stall_Id) : null);
    
    // Stall options for the dropdown
 
    const [errors, setErrors] = useState({});
    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key] && (key !== 'Stall_Id' || formData.role === 'Owner')) {
                newErrors[key] = `${key} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()){
            onSubmitSuccess();
            await handleSubmit(e);
        }
        
    };
    const title = edit ?"Edit User": "Add User";
    return (
        <>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 id="offcanvasAddUserLabel" className="offcanvas-title">{title}</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body mx-0 flex-grow-0 p-6 h-100">
                    <form 
                        onSubmit={handleFormSubmit} 
                        className="add-new-user pt-0" 
                        id="addNewUserForm" 
                        noValidate
                    >
                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-user-fname">First Name</label>
                            <input 
                                type="text" 
                                className={`form-control ${errors.FName ? 'border-danger' : ''}`} 
                                placeholder="First Name"
                                id="add-user-fname" 
                                name="FName" 
                                value={formData.FName} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                        

                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-user-mname">Middle Name</label>
                            <input 
                                type="text" 
                                id="add-user-mname" 
                                className={`form-control ${errors.MName ? 'border-danger' : ''}`} 
                                placeholder="Middle Name"
                                name="MName" 
                                value={formData.MName} 
                                onChange={handleChange} 
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-user-lname">Last Name</label>
                            <input 
                                type="text" 
                                id="add-user-lname" 
                                className={`form-control ${errors.LName ? 'border-danger' : ''}`} 
                                placeholder="Last Name"
                                name="LName" 
                                value={formData.LName} 
                                onChange={handleChange} 
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="form-label" htmlFor="user-gender">Gender</label>
                            <select 
                                id="user-gender" 
                                className={`form-control ${errors.Gender ? 'border-danger' : ''}`} 
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
                            <label className="form-label" htmlFor="user-role">Role</label>
                            <select 
                                id="user-role" 
                                className={`form-control ${errors.role ? 'border-danger' : ''}`} 
                                name="role" 
                                value={formData.role} 
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="Owner">Owner</option>
                                <option value="admin">Admin</option>
                                {formData.role == "superadmin" &&(
                                <option value="superadmin">Super Admin</option>
                                )}
                            </select>
                        </div> 
                        {formData.role === 'Owner' && (
                            
                            <div className="mb-6">
                                <label className="form-label" htmlFor="stall-id">Stall ID</label>
                                <div className="mb-6">
                                    <Select
                                        id="add-tenant-stall"
                                        value={OccupiedStall.find(option => option.value === formData.Stall_Id) || stallOptions.find(option => option.value === formData.Stall_Id)|| null}
                                        className="form-react-select"
                                        classNamePrefix="react-select"
                                        onChange={handleStallChange}
                                        options={stallOptions}
                                        isClearable
                                        isSearchable
                                        placeholder="Select or type a Stall"
                                    />
                                </div>
                                {errors.Stall_Id && (
                                    <div className="text-danger small mt-1">
                                        {errors.Stall_Id}
                                    </div>
                                )}
                            </div>
                            
                        )}

                         

                        
                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-user-address">Address</label>
                            <input 
                                type="text" 
                                id="add-user-address" 
                                className={`form-control ${errors.Address ? 'border-danger' : ''}`} 
                                placeholder={errors.Address ? errors.Address : "Address"} 
                                name="Address" 
                                value={formData.Address} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-user-contact">Contact</label>
                            <input 
                                type="text" 
                                id="add-user-contact"
                                maxLength={11} 
                                minLength={11}
                                className={`form-control phone-mask ${errors.Contact ? 'border-danger' : ''}`} 
                                placeholder={errors.Contact ? errors.Contact : "09884411999"} 
                                pattern="^(09\d{9}|\+63\s9\d{8}|9\d{9})$"
                                name="Contact" 
                                value={formData.Contact} 
                                onChange={handleChange} 
                                required
                            />
                        </div>
                        
                        <div className="mb-6 form-control-validation fv-plugins-icon-container">
                            <label className="form-label" htmlFor="add-user-email">Email</label>
                            <input 
                                type="email" 
                                id="add-user-email" 
                                className={`form-control ${errors.Email ? 'border-danger' : ''}`} 
                                placeholder={errors.Email ? errors.Email : "user@example.com"} 
                                name="Email" 
                                value={formData.Email} 
                                onChange={handleChange} 
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="form-label" htmlFor="add-user-birthdate">Birthdate</label>
                            <input 
                                type="date" 
                                id="add-user-birthdate"     
                                name="Birthdate" 
                                className={`form-control ${errors.Birthdate ? 'border-danger' : ''}`} 
                                value={formData.Birthdate} 
                                onChange={handleChange} 
                                required
                            />
                        </div>

                        {message.text && (
                            <div className={`alert alert-${message.type === 'error' ? 'danger' : 'success'} mt-3`}>
                                {message.text}
                            </div>
                        )}

                        <div className="mt-4">
                            <button type="submit" className="btn tbl-btn-primary me-3">Submit</button>
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
