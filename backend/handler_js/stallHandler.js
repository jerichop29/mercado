class StallHandler {
    constructor() {
        this.baseUrl = `http://localhost/mercado/backend/handler_php/stallFunctions.php`;
    }

    // Generic fetch method with error handling
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

    // Get all stalls
    async getStalls() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }

    // Add new stall
    async addStall(stallData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            body: JSON.stringify(stallData)
        });
    }

    // Delete stall
    async deleteStall(stallId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${stallId}`, {
            method: 'DELETE'
        });
    }

    // Update stall
    async updateStall(stallId, stallData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${stallId}`, {
            method: 'PUT',
            body: JSON.stringify(stallData)
        });
    }

    // Validate stall data
    validateStallData(data) {
        if (!data.stallName?.trim() || !data.buildingName?.trim() || !data.type) {
            throw new Error('All fields are required');
        }
        return true;
    }
}

export default new StallHandler();