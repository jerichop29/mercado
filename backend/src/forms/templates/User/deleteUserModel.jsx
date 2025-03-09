import { useState } from 'react';
import PersonHandler from '../../../controllers/js/PersonHandler';
import OwnerHandler from '../../../controllers/js/OwnerHandler';
import AdminHandler from '../../../controllers/js/AdminHandler';
import stallHandler from '../../../controllers/js/stallHandler';

const useDeleteUserModel = (onDeleteSuccess) => {
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleDelete = async (userData) => {
    setMessage({ text: "", type: "" });
    try {
      // First, delete the user account based on role

      let userResult;
      if (userData.role.toLowerCase() === "owner") {   
      let statusUpdate;
        statusUpdate = await stallHandler.updateAllStallsByOwner(userData.Owner_Id,{Status_Id:"1"});
         if(statusUpdate.status === "success"){userResult = await OwnerHandler.deleteOwner(userData.Owner_Id);}
        }
      else if (userData.role.toLowerCase() === "admin") {
        userResult = await AdminHandler.deleteAdmin(userData.Admin_Id);
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