import { useState } from "react";
import useAddUserModel from "../../../../backend/src/forms/templates/addUserModel";
import { useData } from "../../../hooks/useData";
export default function AddUser({ onClose, onSubmitSuccess ,edit}) {

    const [filteredStall,setFilteredStalls] = useState("");
    const {stall}=useData(filteredStall,"");
    const {
        formData,
        message,
        handleChange,
        handleSubmit,
        resetForm
    } = useAddUserModel(edit, onSubmitSuccess);
    const [errors, setErrors] = useState({});
    const [showSelect, setShowSelect] = useState(false);
    const [searchValue, setSearchValue] = useState('');

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
            await handleSubmit(e);
        }
        
    };

    return (
        <>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasAddUser" aria-labelledby="offcanvasAddUserLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 id="offcanvasAddUserLabel" className="offcanvas-title">Add User</h5>
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
                                <option value="Admin">Admin</option>
                            </select>
                        </div>

                        {/* Conditional Stall ID field */}
                        {formData.role === 'Owner' && (
                            <div className="mb-6">
                                <label className="form-label" htmlFor="stall-id">Stall ID</label>
                                <div className="position-relative">
                                    <input 
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Search stall..."
                                        value={searchValue}
                                        onChange={(e) => {
                                            setSearchValue(e.target.value);
                                            setFilteredStalls(e.target.value.toLowerCase());
                                            setShowSelect(true);
                                        }}
                                    />
                                    {showSelect &&(<select 
                                        id="stall-id" 
                                        className={`form-control ${errors.Stall_Id ? 'border-danger' : ''}`} 
                                        name="Stall_Id" 
                                        value={formData.Stall_Id || ''} 
                                        onChange={(e) => {
                                            handleChange(e);
                                            const selectedStall = stall?.find(s => s.Stall_Id === e.target.value);
                                            if (selectedStall) {
                                                setSearchValue(selectedStall.StallCode);
                                                setShowSelect(false);
                                            }
                                        }}
                                        required={formData.role === 'Owner'}
                                        size="5"
                                    >
                                        <option value="" disabled>Select Stall</option>
                                        {stall?.map((stall) => (
                                            <option key={stall.Stall_Id} value={stall.Stall_Id}>
                                                {stall.StallCode}
                                            </option>
                                        ))}
                                    </select>)}
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
