import { useState, useEffect } from 'react';
import OwnerHandler from '../../../controllers/js/OwnerHandler';
import AdminHandler from '../../../controllers/js/AdminHandler';
import { Alert } from '../../../../../src/components/main/DialogueBox/DialogueBox';

const useEditPassword = (editData) => {
  const [passwordMessage, setMessage] = useState({ text: "", type: "" });
  const initialFormState = {
    current_password: "",
    new_password: "",
    confirm_password: "",
    Username: "",
    Admin_Id: "",
    Owner_Id: "",
    role: ""
  };
  const [passwordData, setPasswordData] = useState(initialFormState);
  useEffect(() => {
    if (editData) {
      setPasswordData({
        current_password: editData.current_password || "",
        new_password: editData.new_password || "",
        confirm_password: editData.confirm_password || "",
        role: editData.role || "",
        Username: editData.Username || "",
        Admin_Id: editData.Admin_Id || "",
        Owner_Id: editData.Owner_Id || "",
      });
    }
  }, [editData]);


  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const resetPassword = () => {
    setPasswordData(initialFormState);
    setMessage({ text: "", type: "" });
  };


  const handleEditPassword = async (userData) => {
    setMessage({ text: "", type: "" }); 
    try {
      if (passwordData.confirm_password === passwordData.new_password) {
        let userResult;
        if (passwordData.role.toLowerCase() === "owner") {
          userResult = await OwnerHandler.updatePassword(passwordData.Owner_Id, passwordData);

        }
        else if (passwordData.role.toLowerCase() === "admin" || passwordData.role.toLowerCase() === "superadmin") {
          userResult = await AdminHandler.updatePassword(passwordData.Admin_Id, passwordData);
          console.log(passwordData.Admin_Id,passwordData)
        }
        
        if (userResult) {
          Alert("Password Updated");
        }
        else {
          setMessage({ text: "Failed to delete user role record", type: "error" });
        }
      } else {
        setMessage({ text: "Password Does Not Match", type: "error" });
      }
    } catch (error) {
      setMessage({ text: error.message || "An error occurred", type: "error" });
    }
  };

  return {
    handlePasswordChange,
    resetPassword,
    passwordData,
    passwordMessage,
    handleEditPassword
  };
};

export default useEditPassword; 