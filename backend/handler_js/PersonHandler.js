class PersonHandler {
    constructor() {
        this.baseUrl = 'http://localhost/mercado/backend/handler_php/person/Function/personFunctions.php'; // Update with the correct PHP file
    }

    async fetchWithErrorHandling(url, options = {}) {
        // ... existing fetchWithErrorHandling method ...
    }

    async getPersons() {
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=get`);
    }

    async addPerson(personData) {
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
        return this.fetchWithErrorHandling(`${this.baseUrl}?action=update&id=${personId}`, {
            method: 'PUT',
            body: JSON.stringify(personData)
        });
    }
}

export default new PersonHandler(); 