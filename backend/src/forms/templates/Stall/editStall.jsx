import { useState, useEffect } from "react";
import stallHandler from "../../../controllers/js/stallHandler";
import { Alert } from "../../../../../src/components/main/DialogueBox/DialogueBox";
const useStallUpdate = (editData = {}, onSubmitSuccess) => {
    const initialFormState = {
        Owner_Id: "",
        StallCode: "",
        Type_Id: "6",
        BuildingName: "",
        OwnerFname: "",
        OwnerMname: "",
        OwnerLname: "",
        Status: "",
        id: null
    };

    const [formData, setFormData] = useState(initialFormState);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        if (editData && Object.keys(editData).length > 0) {
            setFormData({
                Owner_Id: editData.Owner_Id || "",
                StallCode: editData.StallCode || "",
                Type_Id: editData.Type_Id || "",
                BuildingName: editData.BuildingName || "",
                OwnerFname: editData.OwnerFname || "",
                OwnerMname: editData.OwnerMname || "",
                OwnerLname: editData.OwnerLname || "",
                Status: editData.Status || "",
                id: editData.Stall_Id || null
            });
        } else {
            setFormData(initialFormState);
        }
    }, [editData]);

    const handleChange = (e) => {
        
        const { name, value } = e.target;
        console.log({name,value})
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setMessage({ text: "", type: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });

        try {
            if (!formData.id) {
                console.log(formData)
                throw new Error("Stall ID is missing.");
            }

            const stall = await stallHandler.updateStall(formData.id, formData);

            if (stall?.status === "success") {
                setMessage({ text: stall.message, type: "success" });
                Alert("Stall Edited");
                resetForm();

                if (onSubmitSuccess) {
                    onSubmitSuccess();
                }
            } else {
                setMessage({ text: stall?.message || "Update failed", type: "error" });
            }
        } catch (error) {
            setMessage({ text: error.message || "An error occurred", type: "error" });
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

export default useStallUpdate;
