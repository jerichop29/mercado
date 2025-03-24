import { useState } from 'react';
import AvatarHandler from '../../../controllers/js/AvatarHandler';
import { Alert } from '../../../../../src/components/main/DialogueBox/DialogueBox';

const useAddAvatar = (editData, onSubmitSuccess) => {
    const initialFormState = {
        Avatar: null,
        Person_Id:'',
        imageId: null
    };
    const [imageData, setImageData] = useState(initialFormState);
    const [imageMessage, setMessage] = useState({ text: "", type: "" });


    const handleImageChange = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageData(prev => ({
                    ...prev,
                    Avatar: reader.result.split(',')[1] // Store the base64 string directly
                }));
 
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const resetImage = () => {
        setImageData(initialFormState);
        setMessage({ text: "", type: "" });
    };

    const handleImageSubmit = async (e) => {
        e.preventDefault();
        setMessage({ text: "", type: "" });

        try {
            if (imageData.Avatar) { // Check if Avatar is not null
                const personId = imageData.Person_Id; // Assuming you have a Person_Id to send
                
                let result;
                if (editData.imageId != null && editData.imageId !== '') { // Check if imageId is not null or empty
                    result = await AvatarHandler.updateAvatar(imageData.imageId, personId, imageData.Avatar);
                } else {
                    result = await AvatarHandler.addAvatar(personId, imageData.Avatar);
                }

                if (result.status === "success") {
                    setMessage({ text: editData ? "Avatar updated successfully!" : "Avatar added successfully!", type: "success" });
                } else {
                    setMessage({ text: result.message, type: "error" });
                }
            } else {
                Alert("No image selected.");
                setMessage({ text: "No image selected.", type: "error" }); // Handle the case where no image is selected
            }
        } catch (error) {
            setMessage({ text: error.message, type: "error" });
        }
    };

    return {
        imageData,
        imageMessage,
        handleImageChange,
        handleImageSubmit,
        resetImage
    };
};

export default useAddAvatar; 