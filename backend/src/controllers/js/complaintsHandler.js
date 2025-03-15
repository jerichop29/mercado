class complaintsHandler {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/models/php/complaintsFunction.php`;
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
    // Get all Complaints
    async getComplaints() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }
    // Add new complaints
    async addComplaints(complaintsData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            body: JSON.stringify(complaintsData)
        });
    }
    // Delete complaints
    async deleteComplaints(complaintsId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${complaintsId}`, {
            method: 'DELETE'
        });
    }
    // Update complaints
    async updateComplaints(complaintsId, complaintsData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${complaintsId}`, {
            method: 'PUT',
            body: JSON.stringify(complaintsData)
        });
    }
    
    async updateComplaintStatus(complaintsId, complaintsData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=status&id=${complaintsId}`, {
            method: 'PUT',
            body: JSON.stringify(complaintsData)
        });
    }
}
export default new complaintsHandler();