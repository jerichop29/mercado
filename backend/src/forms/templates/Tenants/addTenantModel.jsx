import {useState, useEffect} from 'react';
import PersonHandler from '../../../handler/js/PersonHandler';
import PersonValidator from '../../validators/personValidator';
import TenantHandler from '../../../handler/js/TenantHandler';
import OwnerHandler from '../../../handler/js/OwnerHandler';
import stallHandler from '../../../handler/js/stallHandler';

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
        console.log(message)
        console.log(formData)
        setMessage({text: "", type: ""});
        try {
            PersonValidator.validatePersonData(formData);
            const result = editData
                ? await TenantHandler.updateTenant(editData.TenantId, formData)
                : await PersonHandler.addPerson(formData);

            setMessage({text: result.message, type: "success"});
            // if (onSubmitSuccess) 
            //     onSubmitSuccess();
            
            // After successful person creation/update
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

export default useAddTenantModel;