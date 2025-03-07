import React, {useState, useEffect} from 'react';
import Select from 'react-select';
const EditStall = ({stall, onClose, onSubmitSuccess}) => {
    const [formData,
        setFormData] = useState({
        StallCode: '',
        TypeName: '',
        BuildingName: '',
        Owner_Id:"",
        OwnerFname:  "",
        OwnerMname:  "",
        OwnerLname:  "",
        Status: '',
        Date_Start: '',
        due: ''
    });

    useEffect(() => {
        if (stall) {
            setFormData({
                StallCode: stall.StallCode,
                TypeName: stall.TypeName,
                BuildingName: stall.BuildingName,
                Owner_Id: stall.Owner_Id || "",
                OwnerFname: stall.OwnerFname || "",
                OwnerMname: stall.OwnerMname || "",
                OwnerLname: stall.OwnerLname || "",
                Status: stall.Status,
                Date_Start: stall.Date_Start,
                due: stall.due
            });
        }
    }, [stall]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the onSubmitSuccess with the updated formData
        onSubmitSuccess(formData);
        onClose(); // Close the modal after submission
    };

    return (
        <div
            className="offcanvas offcanvas-end"
            id="offcanvasEditStall"
            aria-labelledby="offcanvasEditStallLabel">
            <div className="offcanvas-header border-bottom">
                <h5 id="offcanvasEditStall" className="offcanvas-title">Edit Stall</h5>
                <button
                    type="button"
                    className="btn-close text-reset"
                    onClick={onClose}
                    aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="stallCode" className="form-label">Stall Code</label>
                        <input
                            type="text"
                            className="form-control"
                            id="stallCode"
                            name="StallCode"
                            value={formData.StallCode}
                            onChange={handleChange}
                            required
                            disabled/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="typeName">Type</label>
                        <select
                            id="TypeName"
                            name="TypeName"
                            className="form-select"
                            value={formData.TypeName}
                            onChange={handleChange}
                            required
                            disabled>
                            <option value="None">None</option>
                            <option value="Meat">Meat</option>
                            <option value="Fish">Fish</option>
                            <option value="Vegetable">Vegetable</option>
                            <option value="Variety">Variety</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="buildingName">Building</label>
                        <select
                            id="buildingName"
                            name="BuildingName"
                            value={formData.BuildingName}
                            className="form-select"
                            onChange={handleChange}
                            required
                            disabled>
                            <option value="">All Buildings</option>
                            <option value="Building 1">Building 1</option>
                            <option value="Building 2">Building 2</option>
                            <option value="Building 3">Building 3</option>
                            <option value="Building 4">Building 4</option>
                            <option value="Building 5">Building 5</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="OwnerFname" className="form-label">Owner</label>
                        <input
                            type="text"
                            className="form-control"
                            id="OwnerFname"
                            name="OwnerFname"
                            value={formData.Owner_Id}
                            onChange={handleChange}
                            required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <input
                            type="text"
                            className="form-control"
                            id="status"
                            name="Status"
                            value={formData.Status}
                            onChange={handleChange}
                            required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dateStart" className="form-label">Start Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateStart"
                            name="Date_Start"
                            value={formData.Date_Start}
                            onChange={handleChange}
                            required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dueDate" className="form-label">Due Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dueDate"
                            name="due"
                            value={formData.due}
                            onChange={handleChange}
                            required/>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-6'>
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                        <div className='col-6'>
                                <button type="submit" className="btn btn-primary">Clear Stall</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStall;