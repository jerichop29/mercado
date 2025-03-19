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
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status === 'error') {
                throw new Error(data.message);
            }

            return data;
        } catch (error) {
            console.error("API Error:", error);
            throw error;
        }
    }

    async getAllAvatars() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`, {
            method: 'GET'
        });
    }

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

    async updateAvatar(id, personId, image) {
        const data = {
            Person_Id: personId,
            image: image // Base64 string of the image
        };

        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteAvatar(id) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${id}`, {
            method: 'DELETE'
        });
    }
}

export default new AvatarHandler();
