import { useState, useEffect } from 'react';
import PersonHandler from '../../../handler/js/PersonHandler';
import PersonValidator from '../../validators/personValidator';
import TenantHandler from '../../../handler/js/TenantHandler';
import OwnerHandler from '../../../handler/js/OwnerHandler';

const useAddTenantModel = (editData, onSubmitSuccess) => {
  const initialFormState = {
    FName: "",
    MName: "",
    LName: "",
    Gender: "",
    Address: "",
    Contact: "",
    Email: "",
    Birthdate: "",
    Stall_Id: "",
    Date_Start: "",
    Market_Fee: ""
  };
  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  useEffect(() => {
    if (editData) {
      setFormData({
        FName: editData.FName || "",
        MName: editData.MName || "",
        LName: editData.LName || "",
        Gender: editData.Gender || "",
        Address: editData.Address || "",
        Contact: editData.Contact || "",
        Email: editData.Email || "",
        Birthdate: editData.Birthdate || "",
        Stall_Id: editData.Stall_Id || "",
        Date_Start: editData.Date_Start || "",
        Market_Fee: editData.Market_Fee || "",
        id: editData.id
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setMessage({ text: "", type: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    try {
       PersonValidator.validatePersonData(formData);
        // Ensure tenant update logic is clear
        if (editData) {
          await TenantHandler.updateTenant(editData.TenantId, formData);
        }
      
      const result = editData
        ? await PersonHandler.updatePerson(editData.id, formData)
        : await PersonHandler.addPerson(formData);
      
      setMessage({ text: result.message, type: "success" });
      if (onSubmitSuccess) onSubmitSuccess();

      // After successful person creation/update
      if (result && !editData) {
        // Get all persons and filter
        const persons = await PersonHandler.getPersons();
        const person = persons.data.filter((p) => 
          p.FName === formData.FName && 
          p.MName === formData.MName && 
          p.LName === formData.LName &&
          p.Email === formData.Email
        );
        //Get all owners information using Stall_Id
        const owners = await OwnerHandler.getOwners();
        const owner = owners.data.filter((o)=> 
          o.Stall_Id === formData.Stall_Id
      );
        
        if (person && owner) {
          // Get today's date in YYYY-MM-DD format
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;

          const createTenantData = {
            Stall_Id:formData.Stall_Id,
            Owner_Id:owner[0].Owner_Id,
            Date_Start: formattedDate,
            Person_Id: person[0].Person_Id,
            Market_Fee: formData.Market_Fee
          };

          let userResult = await TenantHandler.addTenant(createTenantData);
          if (userResult) {
            alert('Tenant Added');
          }
        }
      }

        resetForm();
      
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  };

  return {
    formData,
    message,
    handleChange,
    handleSubmit,
    setFormData,
    setMessage,
    resetForm
  };
};

export default useAddTenantModel;