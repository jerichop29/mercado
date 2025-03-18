class AppointmentHandler {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/models/php/appointmentFunction.php`;
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
    // Get all appointments
    async getAppointments() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }
    // Add new appointment
    async addAppointment(appointmentData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            body: JSON.stringify(appointmentData)
        });
    }
    // Delete appointment
    async deleteAppointment(appointmentId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${appointmentId}`, {
            method: 'DELETE'
        });
    }
    // Update appointment
    async updateAppointment(appointmentId, appointmentData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${appointmentId}`, {
            method: 'PUT',
            body: JSON.stringify(appointmentData)
        });
    }
    
    async updateAppointmentStatus(appointmentId, appointmentData) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=status&id=${appointmentId}`, {
            method: 'PUT',
            body: JSON.stringify(appointmentData)
        });
    }
}
export default new AppointmentHandler();