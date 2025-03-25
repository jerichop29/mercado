import {useState, useEffect} from 'react';
import PersonHandler from '../../../controllers/js/PersonHandler';
import PersonValidator from '../../validators/personValidator';
import TenantHandler from '../../../controllers/js/TenantHandler';
import stallHandler from '../../../controllers/js/stallHandler';

const useaddTenant = (editData,onSubmitSuccess) => {
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
        Market_Fee: "",
        id: null
    };
    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState({text: "", type: ""});
    useEffect(() => {
        if (editData  ) {
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
                Person_Id:editData.Person_Id||"",
                id: editData.id
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setMessage({text: "", type: ""});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage({text: "", type: ""});
        try {
            PersonValidator.validatePersonData(formData);
            
            if(editData){
                const persons = await PersonHandler.getPersons();
                const person = persons.data.filter((p) => 
                    p.Person_Id === formData.Person_Id
                );
                await PersonHandler.updatePerson(formData.Person_Id,formData)
            }

            const result = editData
                ? await TenantHandler.updateTenant(formData.id, formData)
                : await PersonHandler.addPerson(formData);

            setMessage({text: result.message, type: "success"});
            if (onSubmitSuccess) onSubmitSuccess();
            if (result && !editData) {
                const persons = await PersonHandler.getPersons();
                const person = persons.data.filter((p) => 
                    p.FName === formData.FName && 
                    p.MName === formData.MName && 
                    p.LName === formData.LName &&
                    p.Email === formData.Email
                );

                const stalls = await stallHandler.getStalls();
                const stall = stalls.data.filter((s) => s.Stall_Id === formData.Stall_Id);
                if (person && stall) {
                    const today = new Date();
                    const formattedDate = today.toISOString().split('T')[0];
                    
                    const createTenantData = {
                        Stall_Id: formData.Stall_Id,
                        Owner_Id: stall[0].Owner_Id,
                        Date_Start: formattedDate,
                        Person_Id: person[0].Person_Id,
                        Market_Fee: formData.Market_Fee
                    };
                      console.log(createTenantData)
                    let userResult = await TenantHandler.addTenant(createTenantData);
                    if (userResult) {
                        alert('Tenant Added');
                    }
                }
            }

            resetForm();

        } catch (error) {
            setMessage({text: error.message, type: "error"});
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

export default useaddTenant;