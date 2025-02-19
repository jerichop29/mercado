class AdminValidator {
    static validateAdminData(data) {
        const errors = [];

        if (!data.Username || typeof data.Username !== 'string' || !data.Username.trim()) {
            errors.push('Username is required and must be a non-empty string.');
        }

        if (!data.Password || typeof data.Password !== 'string' || data.Password.length < 8) {
            errors.push('Password is required and must be at least 6 characters long.');
        }

        if (!data.role || typeof data.role !== 'string' || !data.role.trim()) {
            errors.push('Role is required and must be a non-empty string.');
        }

        if (!data.Person_Id || typeof data.Person_Id !== 'string' || !data.Person_Id.trim()) {
            errors.push('Person_Id is required and must be a non-empty string.');
        }

        if (errors.length > 0) {
            throw new Error(errors.join(' '));
        }
    }
}

export default AdminValidator;
