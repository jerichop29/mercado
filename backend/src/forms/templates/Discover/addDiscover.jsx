import { useState, useEffect } from 'react';
import DiscoverHandler from '../../../controllers/js/DiscoverHandler';
import { Alert } from '../../../../../src/components/main/DialogueBox/DialogueBox';
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
                Activity: editData.Title || "",
                Description: editData.Description || "",
                Date_Start: editData.Date_Start || "",
                Date_End: editData.Date_End || "",
                Link: editData.Link || "",
                id: editData.id
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => {
            const updatedData = { ...prev };
            // Handle file input for image
            if (name === "image" && files.length > 0) {
                const file = files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                    updatedData.image = reader.result; // Store the base64 string directly
                    setFormData(updatedData); // Update state with the new image data
                };
                reader.readAsDataURL(file); // Read the file as a data URL
            } else {
                updatedData[name] = value;
                // Ensure Title and Activity are the same
                if (name === "Title") {
                    updatedData.Activity = value;
                } else if (name === "Activity") {
                    updatedData.Title = value;
                }
            }
            return updatedData; // Return the updated data immediately
        });
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
                ? await DiscoverHandler.updateDiscovery(formData.id, formData)
                : await DiscoverHandler.addDiscovery(formData);

                if (result && !editData) { Alert("Discover Added") }
                else if (result  && editData ){ Alert("Discover Editted")}
            setMessage({ text: result.message, type: "success" });
            resetForm();
        } catch (error) {
            setMessage({ text: error.message, type: "error" });
            Alert(`Error: ${error.message}`); // Show error message
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
