import { useState } from "react";
import SubCategoryHandler from "../../../controllers/js/SubCategoryHandler";
// Delete function
const useDeleteCategory = (onDeleteSuccess) => {
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleDelete = async (categoryData) => {
        console.log(categoryData)
        setMessage({ text: "", type: "" });
        try {
            const result = await SubCategoryHandler.deleteSubCategory(categoryData.SubCategories_Id);
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