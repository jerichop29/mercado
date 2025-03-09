import TenantValidator from "../../forms/validators/tenantValidator";

class TenantHandler {
    constructor() {
       this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/models/php/tenantFunctions.php`; // Update with the correct PHP file
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

    async getTenants() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }

    async addTenant(tenantData) {
        TenantValidator.validateTenantData(tenantData);
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            body: JSON.stringify(tenantData)
        });
    }

    async deleteTenant(tenantId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${tenantId}`, {
            method: 'DELETE'
        });
    }

    async updateTenant(tenantId, tenantData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${tenantId}`, {
            method: 'PUT',
            body: JSON.stringify(tenantData)
        });
    }
}

export default new TenantHandler(); 