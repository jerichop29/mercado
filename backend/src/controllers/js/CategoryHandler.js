class CategoryHandler {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/models/php/categoryFunctions.php`; // Update with the correct PHP file
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

    async getCategory() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }

    async addCategory(categoryData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            body: JSON.stringify(categoryData)
        });
    }

    async deleteCategory(categoryId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${categoryId}`, {
            method: 'DELETE'
        });
    }

    async updateCategory(categoryId, categoryData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${categoryId}`, {
            method: 'PUT',
            body: JSON.stringify(categoryData)
        });
    }
}

export default new CategoryHandler(); 