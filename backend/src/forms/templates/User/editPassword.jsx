import { useState, useEffect } from 'react';
import OwnerHandler from '../../../controllers/js/OwnerHandler';
import AdminHandler from '../../../controllers/js/AdminHandler';

const useEditPassword = (editData) => {
  const [message, setMessage] = useState({ text: "", type: "" });
  const initialFormState = {
    Username: "",
    Admin_Id:"",
    Owner_Id: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  useEffect(() => {
    if (editData) {
        setFormData({
            Username: editData.Username||"",
            Admin_Id:editData.Admin_Id||"",
            Owner_Id: editData.Owner_Id||"",
        });
    }
}, [editData]);
  const handleEditPassword = async (userData) => {
    setMessage({ text: "", type: "" });
    try {
      // First, delete the user account based on role

      let userResult;
      if (userData.role.toLowerCase() === "owner") {   
        userResult = await OwnerHandler.deleteOwner(userData.Owner_Id);
        }
      else if (userData.role.toLowerCase() === "admin") {
        userResult = await AdminHandler.deleteAdmin(userData.Admin_Id);
      }

       else {
        setMessage({ text: "Failed to delete user role record", type: "error" });
      }
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  };

  return {
    message,
    handleEditPassword,
    setMessage
  };
};

export default useEditPassword; 