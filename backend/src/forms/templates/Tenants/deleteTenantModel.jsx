import { useState } from 'react';
import PersonHandler from '../../../controllers/js/PersonHandler';
import TenantHandler from '../../../controllers/js/TenantHandler';

const useDeleteTenantModel = (onDeleteSuccess) => {
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleDelete = async (userData) => {
    setMessage({ text: "", type: "" });
    try {
      // First, delete the user account based on role

      let userResult;
      userResult = await PersonHandler.deletePerson(userData.Person_Id);
      // Only after successfully deleting the user role record, delete the person
      if (userResult.status === "success") {
        const result = await TenantHandler.deleteTenant(userData.TenantId);
        
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

export default useDeleteTenantModel; 