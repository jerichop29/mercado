import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import { useData } from '../../../hooks/useData';
const EditStall = ({stall, onClose, onSubmitSuccess}) => {
      const {owner} = useData();
      // Stall options for the dropdown, filtered by selected building
      const ownerOptions = owner
      .map((o) => ({
          value: o.Owner_Id,
          label: o.FName+" "+o.MName+" "+o.LName
      }));

      const handleOwnerChange = (selectedOption) => {
        setSelectedStall(selectedOption);
        if (selectedOption) {
            // Update formData with the selected stall ID
            handleChange({ target: { name: 'Owner_Id', value: selectedOption.value } });
        } else {
            handleChange({ target: { name: 'Owner_Id', value: '' } });
        }
    };
    const [formData,
        setFormData] = useState({
        Owner_Id:"",
        StallCode: '',
        TypeName: '',
        BuildingName: '',
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
                Owner_Id:stall.Owner_Id || "",
                StallCode: stall.StallCode,
                TypeName: stall.TypeName,
                BuildingName: stall.BuildingName,
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
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
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
                            >
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
                        <label htmlFor="OwnerName" className="form-label">Owner Name</label>
                        <div className="mb-6">
                                    <Select
                                        id="add-owner-name"
                                        value={ownerOptions.find(option => option.value === formData.Owner_Id) || null}
                                        className="form-react-select"
                                        classNamePrefix="react-select"
                                        onChange={handleOwnerChange}
                                        options={ownerOptions}
                                        isClearable
                                        isSearchable
                                        placeholder="Select or type the Owner"
                                    />
                                </div>
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