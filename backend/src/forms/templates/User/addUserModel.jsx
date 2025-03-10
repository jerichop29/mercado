import { useState, useEffect } from 'react';
import PersonHandler from '../../../controllers/js/PersonHandler';
import PersonValidator from '../../validators/personValidator';
import OwnerHandler from '../../../controllers/js/OwnerHandler';
import AdminHandler from '../../../controllers/js/AdminHandler';
import stallHandler from '../../../controllers/js/stallHandler';
const useAddUserModel = (editData, onSubmitSuccess) => {
  const initialFormState = {
    FName: "",
    MName:"",
    LName: "",
    Gender: "",
    Address: "",
    Contact: "",
    Email: "",
    Birthdate: "",
    role:"",
    Stall_Id:""
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
        role:editData.role ||"",
        Stall_Id:editData.Stall_Id || "",
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
      if (editData){
        const persons = await PersonHandler.getPersons();
        
        const person = persons.data.filter((p) => 
          p.FName === formData.FName && 
          p.MName === formData.MName &&   
          p.LName === formData.LName &&
          p.Email === formData.Email
        );
        const owners = await OwnerHandler.getOwners();

        const owner = owners.data.filter((o) =>
        o.Person_Id === person[0].Person_Id
        );
        const stalls = await stallHandler.getStalls();

        const stall = stalls.data.filter((s) =>
        s.Owner_Id === owner[0].Owner_Id 
        );
        const editStall = stalls.data.filter((s)=> s.Stall_Id === stall[0].Stall_Id);
        
        console.log(editStall)
        await stallHandler.updateStallStatus(stall[0].Stall_Id, { Status_Id: "1", Owner_Id: null });

        await stallHandler.updateStallStatus(formData.Stall_Id,{Status_Id:"4",Owner_Id:owner[0].Owner_Id}); 
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
        if (person) {
          // Generate username from name parts
          const username = `${formData.FName.toLowerCase()}_${formData.LName.toLowerCase()}`;
          
          // Generate random password
          const generatePassword = () => {
            const length = 22;
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-";
            let password = "";
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * charset.length);
              password += charset[randomIndex];
            }
            return password;
          };

          const password = generatePassword();
          
          // Get today's date in YYYY-MM-DD format
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;
          const createUserAccount ={
            Admin_Id: "1",
            Date_Start: formattedDate,
            Person_Id: person[0].Person_Id,
            username: username,
            password: password,
            role: formData.role
          }
          let userResult
          let stallupdate;
          if(formData.role == "Owner"){// Create user account
            userResult = await OwnerHandler.addOwner(createUserAccount);
        
            const owners = await OwnerHandler.getOwners();

            const owner = owners.data.filter((o) =>
            o.Person_Id === person[0].Person_Id
            );

            stallupdate =await stallHandler.updateStallStatus(formData.Stall_Id,{Status_Id:"4",Owner_Id:owner[0].Owner_Id}); 
          }
          else{
            userResult = await AdminHandler.addAdmin(createUserAccount);
          }
          if (userResult) {
            console.log('Generated credentials:');
            console.log('Username:', username);
            console.log('Password:', password);
            alert("User Created");
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

export default useAddUserModel;