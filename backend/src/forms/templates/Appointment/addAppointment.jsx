import { useState, useEffect } from 'react';
import AppointmentHandler from '../../../controllers/js/AppointmentHandler';
import AppointmentValidator from '../../validators/appointmentValidator';

const useManageAppointment = (editData) => {
    const initialFormState = {
        Stall_Id: "",
        FullName: "",
        Email: "",
        Contact: "",
        POI: "",
        Status: "",
        id: null
    };
    
    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        if (editData) {
            setFormData({
                Stall_Id: editData.Stall_Id || "",
                FullName: editData.FullName || "",
                Email: editData.Email || "",
                Contact: editData.Contact || "",
                POI: editData.POI || "",
                Status: editData.Status || "",
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
            AppointmentValidator.validateAppointmentData(formData);
            
            const result = editData
                ? await AppointmentHandler.updateAppointment(formData.id, formData)
                : await AppointmentHandler.addAppointment(formData);

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

export default useManageAppointment;
