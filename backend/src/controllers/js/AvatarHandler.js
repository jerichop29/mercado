import axios from 'axios';

class AvatarHandler {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/models/php/avatarFunctions.php`;
    }

    // Function to get all avatars
    async getAllAvatars() {
        try {
            const response = await axios.get(`${this.baseUrl}?action=get`);
            return response.data;
        } catch (error) {
            console.error("Error fetching avatars:", error);
            throw error;
        }
    }

    // Function to add a new avatar
    async addAvatar(personId, image) {
        const data = {
            Person_Id: personId,
            image: image // Base64 string of the image
        };

        try {
            const response = await axios.post(`${this.baseUrl}?action=add`, data);
            return response.data;
        } catch (error) {
            console.error("Error adding avatar:", error);
            throw error;
        }
    }

    // Function to update an existing avatar
    async updateAvatar(id, personId, image) {
        const data = {
            Person_Id: personId,
            image: image // Base64 string of the image
        };

        try {
            const response = await axios.put(`${this.baseUrl}?action=update&id=${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error updating avatar:", error);
            throw error;
        }
    }

    // Function to delete an avatar
    async deleteAvatar(id) {
        try {
            const response = await axios.delete(`${this.baseUrl}?action=delete&id=${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting avatar:", error);
            throw error;
        }
    }
}
export default AvatarHandler; 