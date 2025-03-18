import { useState } from 'react';
import AppointmentHandler from '../../../controllers/js/AppointmentHandler';

const useDeleteAppointment = (onDeleteSuccess) => {
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleDelete = async (appointmentData) => {
        setMessage({ text: "", type: "" });
        try {
            const result = await AppointmentHandler.deleteAppointment(appointmentData.id);
            if (result.status === "success") {
                if (onDeleteSuccess) onDeleteSuccess();
                setMessage({ text: "Appointment successfully deleted", type: "success" });
            } else {
                setMessage({ text: "Failed to delete appointment", type: "error" });
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

export { useDeleteAppointment };
