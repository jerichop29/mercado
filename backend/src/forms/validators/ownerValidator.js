class OwnerValidator {
    static validateUserData(data) {
        const errors = [];

        if (!data.Person_Id || typeof data.Person_Id !== 'string' || !data.Person_Id.trim()) {
            errors.push('Person_Id is required and must be a non-empty string.');
        }

        if (!data.Admin_Id || typeof data.Admin_Id !== 'string' || !data.Admin_Id.trim()) {
            errors.push('Admin_Id is required and must be a non-empty string.');
        }

        if (!data.Date_Start || isNaN(Date.parse(data.Date_Start))) {
            errors.push('Date_Start is required and must be a valid date.');
        }

        if (!data.username || typeof data.username !== 'string' || !data.username.trim()) {
            errors.push('username is required and must be a non-empty string.');
        }
        if (!data.role || typeof data.role !== 'string' || !data.role.trim()) {
            errors.push('role is required and must be a non-empty string.');
        }
        if (!data.password || typeof data.password !== 'string' || data.password.length < 8) {
            errors.push('Password is required and must be at least 8 characters long.');
        }

        if (errors.length > 0) {
            throw new Error(errors.join(' '));
        }
    }
}

export default OwnerValidator;
