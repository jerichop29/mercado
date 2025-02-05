class TenantHandler {
    constructor() {
        this.baseUrl = 'http://localhost/mercado/backend/handler_php/tenant/Function/tenantFunctions.php'; // Update with the correct PHP file
    }

    async fetchWithErrorHandling(url, options = {}) {
        // ... existing fetchWithErrorHandling method ...
    }

    async getTenants() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }

    async addTenant(tenantData) {
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