import PersonValidator from "../../forms/validators/personValidator";

class PersonHandler {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.hostname}/mercado/backend/src/models/php/personFunctions.php`; // Update with the correct PHP file
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
    }

    async getPersons() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }

    async addPerson(personData) {
        PersonValidator.validatePersonData(personData);
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=add`, {
            method: 'POST',
            body: JSON.stringify(personData)
        });
    }

    async deletePerson(personId) {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=delete&id=${personId}`, {
            method: 'DELETE'
        });
    }

    async updatePerson(personId, personData) {
        PersonValidator.validatePersonData(personData);
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${personId}`, {
            method: 'PUT',
            body: JSON.stringify(personData)
        });
    }
}

export default new PersonHandler(); 