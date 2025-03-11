import AdminValidator from "../../forms/validators/adminValidator";

class AdminHandler {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/models/php/adminFunctions.php`; // Update with the correct PHP file

    }

    async fetchWithErrorHandling(url, options = {}) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
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
        // ... existing fetchWithErrorHandling method ...
    }

    async getAdmins() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }

    async Authadmin(adminData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=auth`, {
            method: 'POST',
            body: JSON.stringify(adminData)
        });
    }

    async addAdmin(adminData) {
        AdminValidator.validateAdminData(adminData);
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            body: JSON.stringify(adminData)
        });
    }

    async deleteAdmin(adminId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${adminId}`, {method: 'DELETE'});
    }

    async updateAdmin(adminId, adminData) {
        AdminValidator.validateAdminData(adminData);
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${adminId}`, {
            method: 'PUT',
            body: JSON.stringify(adminData)
        });
    }
}

export default new AdminHandler();