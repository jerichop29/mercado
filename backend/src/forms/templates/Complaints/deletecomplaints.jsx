// Delete function
const useDeleteComplaint = (onDeleteSuccess) => {
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleDelete = async (complaintData) => {
        setMessage({ text: "", type: "" });
        try {
            const result = await ComplaintHandler.deleteComplaint(complaintData.id);
            if (result.status === "success") {
                if (onDeleteSuccess) onDeleteSuccess();
                setMessage({ text: "Complaint successfully deleted", type: "success" });
            } else {
                setMessage({ text: "Failed to delete complaint", type: "error" });
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

export { useDeleteComplaint };
