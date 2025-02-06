class OwnerHandler {
    constructor() {
        this.baseUrl = 'http://localhost/mercado/backend/handler_php/owner/Function/ownerFunctions.php'; // Update with the correct PHP file
    }

    async fetchWithErrorHandling(url, options = {}) {
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