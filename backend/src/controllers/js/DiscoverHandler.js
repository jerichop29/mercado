import DiscoverValidator from "../../forms/validators/discoverValidator";

class DiscoverHandler {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/models/php/discoverFunctions.php`; // Update with the correct PHP file
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

    async getDiscoveries() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }

    async addDiscovery(discoveryData) {
        DiscoverValidator.validateDiscoverData(discoveryData);
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
        DiscoverValidator.validateDiscoverData(discoveryData);
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${discoveryId}`, {
            method: 'PUT',
            body: JSON.stringify(discoveryData)
        });
    }
}

export default new DiscoverHandler(); 