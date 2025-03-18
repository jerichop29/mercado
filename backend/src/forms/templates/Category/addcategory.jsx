import { useState, useEffect } from 'react';
import CategoryHandler from '../../../controllers/js/CategoryHandler';
import { Alert } from "../../../../../src/components/main/DialogueBox/DialogueBox";
const useManageCategory = (editData) => {
    const initialFormState = {
        Title: "",
        Description: "",
        Categories_Id: null
    };
    
    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        if (editData) {
            setFormData({
                Title: editData.Title || "",
                Description: editData.Description || "",
                Categories_Id: editData.Categories_Id
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
            
            const result = editData
                ? await CategoryHandler.updateCategory(formData.Categories_Id, formData)
                : await CategoryHandler.addCategory(formData);
                if (result && !editData) { Alert("Category Added") }
                else if (result  && editData ){ Alert("Category Editted")}
            setMessage({ text: result.message, type: "success" });
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

export default useManageCategory;
