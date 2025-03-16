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
        setFormData(prev => {
            const updatedData = { ...prev, [name]: value };
            // Ensure Title and Activity are the same
            if (name === "Title") {
                updatedData.Activity = value;
            } else if (name === "Activity") {
                updatedData.Title = value;
            }
            return updatedData;
        });
        console.log(formData);
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
                ? await DiscoverHandler.updateDiscovery(formData.id, formData)
                : await DiscoverHandler.addDiscovery(formData);

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
