import { useState, useEffect } from 'react';
import DiscoverHandler from '../../../controllers/js/DiscoverHandler';
import DiscoverValidator from '../../validators/discoverValidator';

const useManageDiscover = (editData) => {
    const initialFormState = {
        Title: "",
        image: "",
        Activity: "",
        Description: "",
        Date_Start: "",
        Date_End: "",
        Link: "",
        id: null
    };
    
    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        if (editData) {
            setFormData({
                Title: editData.Title || "",
                image: editData.image || "",
                Activity: editData.Activity || "",
                Description: editData.Description || "",
                Date_Start: editData.Date_Start || "",
                Date_End: editData.Date_End || "",
                Link: editData.Link || "",
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
            DiscoverValidator.validateDiscoverData(formData);
            
            const result = editData
                ? await DiscoverHandler.updateDiscover(formData.id, formData)
                : await DiscoverHandler.addDiscover(formData);

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

export default useManageDiscover;

// Delete function
const useDeleteDiscover = (onDeleteSuccess) => {
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleDelete = async (discoverData) => {
        setMessage({ text: "", type: "" });
        try {
            const result = await DiscoverHandler.deleteDiscover(discoverData.id);
            if (result.status === "success") {
                if (onDeleteSuccess) onDeleteSuccess();
                setMessage({ text: "Discover entry successfully deleted", type: "success" });
            } else {
                setMessage({ text: "Failed to delete discover entry", type: "error" });
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

export { useDeleteDiscover };
