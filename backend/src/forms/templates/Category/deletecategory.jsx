
import CategoryHandler from "../../../controllers/js/CategoryHandler";
import SubCategoryHandler from "../../../controllers/js/SubCategoryHandler";
import { useState } from "react";
const useDeleteCategory = (onDeleteSuccess) => {
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleDelete = async (categoryData) => {
        setMessage({ text: "", type: "" });
        try {
            const subs = await SubCategoryHandler.deleteSubCategoriesByCategoryId(categoryData.Categories_Id);
            const result = await CategoryHandler.deleteCategory(categoryData.Categories_Id);
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
