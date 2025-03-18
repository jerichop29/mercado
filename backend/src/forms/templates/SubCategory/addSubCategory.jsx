import { useState, useEffect } from 'react';
import SubCategoryHandler from '../../../controllers/js/SubCategoryHandler';
import { Alert } from '../../../../../src/components/main/DialogueBox/DialogueBox';
const useManageSubCategory = (editData) => {
    const initialFormState = {
        Category_Id: "",
        Title: "",
        Description: "",
        id: null
    };

    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        if (editData) {
            setFormData({
                Category_Id: editData.Category_Id || "",
                Title: editData.Title || "",
                Description: editData.Description || "",
                id: editData.SubCategories_Id
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
                ? await SubCategoryHandler.updateSubCategory(formData.id, formData)
                : await SubCategoryHandler.addSubCategory(formData);
            if (result && !editData) { Alert("SubCategory Added") }
            else if (result  && editData ){ Alert("SubCategory Editted")}
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

export default useManageSubCategory;
