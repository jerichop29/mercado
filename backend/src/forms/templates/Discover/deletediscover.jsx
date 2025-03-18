import { useState } from "react";
import DiscoverHandler from "../../../controllers/js/DiscoverHandler";
// Delete function
const useDeleteDiscover = (onDeleteSuccess) => {
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleDelete = async (discoverData) => {
        setMessage({ text: "", type: "" });
        try {
            const result = await DiscoverHandler.deleteDiscovery(discoverData.discover_Id);
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
