import OwnerValidator from "../../forms/validators/ownerValidator";

class OwnerHandler {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/models/php/ownerFunctions.php`; // Dynamic base URL without port
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
            //console.error('API Error:', error);
            throw error;
        }
    }

    async getOwners() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }

    async AuthOwner(ownerData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=auth`,{
        method:'POST',
        body: JSON.stringify(ownerData)
        });
    }
    checkUsername = async (ownerData) => {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=checkUsername`, {
            method: 'POST',
            body: JSON.stringify(ownerData)
        });
    }

    async addOwner(ownerData) {
        OwnerValidator.validateUserData(ownerData);
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            body: JSON.stringify(ownerData)
        });
    }

    async deleteOwner(ownerId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${ownerId}`, {
            method: 'DELETE'
        });
    }

    async updateOwner(ownerId, ownerData) {
        OwnerValidator.validateUserData(ownerData);
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${ownerId}`, {
            method: 'PUT',
            body: JSON.stringify(ownerData)
        });
    }

    validateOwnerData(data) {
        if (!data.username?.trim() || !data.password?.trim()) {
            throw new Error('Username and password are required');
        }
        return true;
    }
}

export default new OwnerHandler(); 