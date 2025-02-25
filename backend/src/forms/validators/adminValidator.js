class AdminValidator {
    static validateAdminData(data) {
        const errors = [];

        if (!data.username || typeof data.username !== 'string' || !data.username.trim()) {
            errors.push('username is required and must be a non-empty string.');
        }

        if (!data.password || typeof data.password !== 'string' || data.password.length < 8) {
            errors.push('password is required and must be at least 6 characters long.');
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
