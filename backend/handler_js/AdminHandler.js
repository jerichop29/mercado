class AdminHandler {
    constructor() {
        this.baseUrl = 'http://localhost/mercado/backend/handler_php/admin/Function/adminFunctions.php';// Update with the correct PHP file
    }

    async fetchWithErrorHandling(url, options = {}) {
        // ... existing fetchWithErrorHandling method ...
    }

    async getAdmins() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }

    async addAdmin(adminData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            body: JSON.stringify(adminData)
        });
    }

    async deleteAdmin(adminId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${adminId}`, {
            method: 'DELETE'
        });
    }

    async updateAdmin(adminId, adminData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${adminId}`, {
            method: 'PUT',
            body: JSON.stringify(adminData)
        });
    }
}

export default new AdminHandler();