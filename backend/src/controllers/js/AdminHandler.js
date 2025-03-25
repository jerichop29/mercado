import AdminValidator from "../../forms/validators/adminValidator";

class AdminHandler {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/models/php/adminFunctions.php`; // Update with the correct PHP file

        // Bind methods if necessary
        // this.checkUsername = this.checkUsername.bind(this);
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

    checkUsername = async (adminData) => {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=checkUsername`, {
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
    async updatePassword(adminId, adminData) {
        this.validateAdminData(adminData);
        this.validateNewPassword(adminData);
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=updatePassword&id=${adminId}`, {
            method: 'PUT',
            body: JSON.stringify(adminData)
        });
    }
    validateAdminData(data) {
        if (!data.Username?.trim() || !data.current_password?.trim()) {
           console.log('Username and password are required');
        }
        return true;
    }
    validateNewPassword(data) {
        if (data.new_password !== data.confirm_password) { // Check if new_password and confirm_password match
            throw new Error('New password and confirm password do not match');
        }
        return true;
    }
}

export default new AdminHandler();