import { useState, useEffect } from 'react';
import ComplaintHandler from '../../../controllers/js/ComplaintHandler';
import ComplaintValidator from '../../validators/complaintValidator';

const useManageComplaint = (editData) => {
    const initialFormState = {
        Complainant: "",
        Category_Id: "",
        SubCategory_Id: "",
        Complaint_Message: "",
        Status: "",
        Complaint_Image: "",
        Request: "",
        Date_Start: "",
        Date_End: "",
        id: null
    };
    
    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        if (editData) {
            setFormData({
                Complainant: editData.Complainant || "",
                Category_Id: editData.Category_Id || "",
                SubCategory_Id: editData.SubCategory_Id || "",
                Complaint_Message: editData.Complaint_Message || "",
                Status: editData.Status || "",
                Complaint_Image: editData.Complaint_Image || "",
                Request: editData.Request || "",
                Date_Start: editData.Date_Start || "",
                Date_End: editData.Date_End || "",
                id: editData.id
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    Complaint_Image: reader.result.split(',')[1]
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setMessage({ text: "", type: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });
        try {
            ComplaintValidator.validateComplaintData(formData);
            
            const result = editData
                ? await ComplaintHandler.updateComplaint(formData.id, formData)
                : await ComplaintHandler.addComplaint(formData);

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

export default useManageComplaint;

