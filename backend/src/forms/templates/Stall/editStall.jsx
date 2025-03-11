import {useState, useEffect} from 'react';
import PersonHandler from '../../../controllers/js/PersonHandler';
import stallHandler from '../../../controllers/js/stallHandler';

const useStallUpdate = (editData, onSubmitSuccess) => {
    const initialFormState = {
        Owner_Id: "",
        StallCode: "",
        TypeName: "",
        BuildingName: "",
        OwnerFname: "",
        OwnerMname: "",
        OwnerLname: "",
        Status: "",
        id: null
    };
    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState({text: "", type: ""});
    useEffect(() => {
        if (editData  ) {
            setFormData({
                Owner_Id: editData.Owner_Id || "",
                StallCode: editData.StallCode,
                TypeName: editData.TypeName,
                BuildingName: editData.BuildingName,
                OwnerFname: editData.OwnerFname || "",
                OwnerMname: editData.OwnerMname || "",
                OwnerLname: editData.OwnerLname || "",
                Status: editData.Status,
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