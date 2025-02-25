import { useState } from 'react';
import PersonHandler from '../../handler/js/PersonHandler';
import OwnerHandler from '../../handler/js/OwnerHandler';
import AdminHandler from '../../handler/js/AdminHandler';

const useDeleteUserModel = (onDeleteSuccess) => {
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleDelete = async (userData) => {
    setMessage({ text: "", type: "" });
    
    try {
      // First, delete the user account based on role
      let userResult;
      if (userData.role.toLowerCase() === "owner") {
        userResult = await OwnerHandler.deleteOwner(userData.Owner_Id);
      } else if (userData.role.toLowerCase() === "admin") {
        userResult = await AdminHandler.deleteAdmin(userData.Admin_Id);
        console.log(userResult.status)
      }

      // Only after successfully deleting the user role record, delete the person
      if (userResult.status === "success") {
        const result = await PersonHandler.deletePerson(userData.Person_Id);
        
        if (result) {
          if (onDeleteSuccess) onDeleteSuccess();
          setMessage({ text: "User successfully deleted", type: "success" });
        } else {
          setMessage({ text: "Failed to delete person record", type: "error" });
        }
      } else {
        setMessage({ text: "Failed to delete user role record", type: "error" });
      }
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  };

  return {
    message,
    handleDelete,
    setMessage
  };
};

export default useDeleteUserModel; 