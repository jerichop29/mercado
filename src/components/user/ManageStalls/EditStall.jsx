import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import { useData } from '../../../../backend/src/views/useData';
import useStallUpdate from '../../../../backend/src/forms/templates/Stall/editStall';
const EditStall = ({stall, onClose, onSubmitSuccess}) => {
      const {owner} = useData();
      const [selectedStall,setSelectedStall] = useState();
      const { formData, message, handleChange, handleSubmit, resetForm } = useStallUpdate(stall, onSubmitSuccess);
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
                            className="form-control "
                            id="stallCode"
                            name="StallCode"
                            value={formData.StallCode}
                            onChange={handleChange}
                            required
                            disabled/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="Type_Id">Type</label>
                        <select
                            id="Type_Id"
                            name="Type_Id"
                            className="form-select"
                            value={formData.Type_Id}
                            onChange={handleChange}
                            required
                            >
                            <option value="6">None</option>
                            <option value="1">Meat</option>
                            <option value="2">Fish</option>
                            <option value="3">Vegetable</option>
                            <option value="4">Variety</option>
                            <option value="5">Other</option>
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
                    <div className="mb-3">
                        <label className="form-label" htmlFor="buildingName">Status</label>
                        <select
                            id="status"
                            name="Status"
                            value={formData.Status}
                            className="form-select"
                            onChange={handleChange}
                            required>
                            <option value="1">Available</option>
                            <option value="2">Unavailable</option>
                            <option value="3">Reserved</option>
                            <option value="4">Occupied</option>
                            <option value="5">Maintenance</option>
                        </select>
                    </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-6'>
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStall;