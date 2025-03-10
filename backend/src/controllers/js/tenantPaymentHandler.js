class TenantPaymentHandler {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/models/php/tenantPaymentFunctions.php`;// Update with the correct PHP file
        
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
            //console.error('API Error:', error);
            throw error;
        }
        // ... existing fetchWithErrorHandling method ...
    }

    async getAllPayments() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }


    async addPayment(paymentData) {
        TenantPaymentValidator.validatePaymentData(paymentData);
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            body: JSON.stringify(adminData)
        });
    }

    async deketePayment(paymentId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${paymentId}`, {
            method: 'DELETE'
        });
    }

    async updatePayment(paymentId, paymentData) {
        TenantPaymentValidator.validatePaymentData(paymentData);
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${paymentId}`, {
            method: 'PUT',
            body: JSON.stringify(adminData)
        });
    }
}

export default new TenantPaymentHandler();