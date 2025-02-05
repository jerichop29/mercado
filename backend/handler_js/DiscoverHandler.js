class DiscoverHandler {
    constructor() {
        this.baseUrl = 'http://localhost/mercado/backend/handler_php/discover/Function/discoverFunctions.php'; // Update with the correct PHP file
    }

    async fetchWithErrorHandling(url, options = {}) {
        // ... existing fetchWithErrorHandling method ...
    }

    async getDiscoveries() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }

    async addDiscovery(discoveryData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            body: JSON.stringify(discoveryData)
        });
    }

    async deleteDiscovery(discoveryId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${discoveryId}`, {
            method: 'DELETE'
        });
    }

    async updateDiscovery(discoveryId, discoveryData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${discoveryId}`, {
            method: 'PUT',
            body: JSON.stringify(discoveryData)
        });
    }
}

export default new DiscoverHandler(); 