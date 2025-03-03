import React, { useState, useEffect } from 'react';

const EditStall = ({ stall, onClose, onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        StallCode: '',
        TypeName: '',
        BuildingName: '',
        OwnerName: '',
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
                OwnerName: stall.OwnerName,
                Status: stall.Status,
                Date_Start: stall.Date_Start,
                due: stall.due
            });
        }
    }, [stall]);

    const handleChange = (e) => {
        const { name, value } = e.target;
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
        <div className="offcanvas offcanvas-end show" tabIndex="-1" aria-labelledby="offcanvasEditStallLabel">
            <div className="offcanvas-header border-bottom">
                <h5 id="offcanvasEditStallLabel" className="offcanvas-title">Edit Stall</h5>
                <button type="button" className="btn-close text-reset" onClick={onClose} aria-label="Close"></button>
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
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="typeName" className="form-label">Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="typeName"
                            name="TypeName"
                            value={formData.TypeName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="buildingName" className="form-label">Building</label>
                        <input
                            type="text"
                            className="form-control"
                            id="buildingName"
                            name="BuildingName"
                            value={formData.BuildingName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ownerName" className="form-label">Owner</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ownerName"
                            name="OwnerName"
                            value={formData.OwnerName}
                            onChange={handleChange}
                            required
                        />
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
                            required
                        />
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
                            required
                        />
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
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    );
};

export default EditStall; 