import { useState, useEffect } from 'react';
import CategoryHandler from '../../../controllers/js/CategoryHandler';
import CategoryValidator from '../../validators/categoryValidator';

const useManageCategory = (editData) => {
    const initialFormState = {
        Title: "",
        Description: "",
        id: null
    };
    
    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        if (editData) {
            setFormData({
                Title: editData.Title || "",
                Description: editData.Description || "",
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
            CategoryValidator.validateCategoryData(formData);
            
            const result = editData
                ? await CategoryHandler.updateCategory(formData.id, formData)
                : await CategoryHandler.addCategory(formData);

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

// Delete function
const useDeleteCategory = (onDeleteSuccess) => {
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleDelete = async (categoryData) => {
        setMessage({ text: "", type: "" });
        try {
            const result = await CategoryHandler.deleteCategory(categoryData.id);
            if (result.status === "success") {
                if (onDeleteSuccess) onDeleteSuccess();
                setMessage({ text: "Category successfully deleted", type: "success" });
            } else {
                setMessage({ text: "Failed to delete category", type: "error" });
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

export { useDeleteCategory };
