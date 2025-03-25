import axios from 'axios';

class AvatarHandler {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/models/php/avatarFunctions.php`;
    }
    async fetchWithErrorHandling(url, options = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status === 'error') {
                throw new Error(data.message);
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
        // ... existing fetchWithErrorHandling method ...
    }
    // Function to get all avatars
    async getAllAvatars() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`, {
            method: 'GET'
        });
    }

    // Function to add a new avatar
    async addAvatar(personId, image) {
        const data = {
            Person_Id: personId,
            image: image // Base64 string of the image
        };

        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // Function to update an existing avatar
    async updateAvatar(id, personId, image) {
        const data = {
            Avatar_Id: id,
            Person_Id: personId,
            image: image // Base64 string of the image
        };

        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // Function to delete an avatar
    async deleteAvatar(id) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${id}`, {
            method: 'DELETE'
        });
    }
}
export default new AvatarHandler(); 