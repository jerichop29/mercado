class OwnerHandler {
    constructor() {
        this.baseUrl = 'http://localhost/mercado/backend/handler_php/ownerFunctions.php'; // Update with the correct PHP file
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

    async getOwners() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }

    async addOwner(ownerData) {
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
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${ownerId}`, {
            method: 'PUT',
            body: JSON.stringify(ownerData)
        });
    }
}

export default new OwnerHandler(); 