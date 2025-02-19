import EventValidator from "../../forms/validators/facilitiesValidator";

class DiscoverHandler {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/handler/php/facilitiesFunctions.php`; // Update with the correct PHP file
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
    }

    async getFacilities(facilitiesId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get&id=${facilitiesId}`, {
            method: 'GET'
        });
    }

    async addFacilities(facilitiesData) {
        EventValidator.validateEventData(facilitiesData);
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(facilitiesData)
        });
    }

    async deleteFacilities(facilitiesId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${facilitiesId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
    }

    async updateFacilities(facilitiesId, facilitiesData) {
        EventValidator.validateEventData(facilitiesData);
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${facilitiesId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(facilitiesData)
        });
    }
}

export default new DiscoverHandler();
