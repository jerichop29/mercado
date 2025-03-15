class PersonValidator {
    static validatePersonData(data) {
        const errors = [];

        if (!data.FName || typeof data.FName !== 'string' || !data.FName.trim() || !/^[A-Za-z\s]+$/.test(data.FName)) {
            errors.push('First name (FName) is required and must be a non-empty string.');
        }

        if (!data.LName || typeof data.LName !== 'string' || !data.LName.trim()|| !/^[A-Za-z\s]+$/.test(data.LName)) {
            errors.push('Last name (LName) is required and must be a non-empty string.');
        }

        if (data.MName && (typeof data.MName !== 'string' || !data.MName.trim())|| !/^[A-Za-z\s]+$/.test(data.MName)) {
            errors.push('Middle name (MName), if provided, must be a non-empty string.');
        }

        if (!data.Gender || !['Male', 'Female', 'Other'].includes(data.Gender)) {
            errors.push('Gender is required and must be "Male", "Female", or "Other".');
        }

        if (!data.Address || typeof data.Address !== 'string' || !data.Address.trim()) {
            errors.push('Address is required and must be a non-empty string.');
        }

        if (!data.Contact || !/^(09\d{9}|9\d{10}|\+639\d{9})$/.test(data.Contact)) {
            errors.push('Contact is required and must be a valid phone number.');
        }

        if (!data.Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.Email)) {
            errors.push('Email is required and must be a valid email address.');
        }

        if (!data.Birthdate || isNaN(Date.parse(data.Birthdate))) {
            errors.push('Birthdate is required and must be a valid date.');
        }

        if (errors.length > 0) {
            throw new Error(errors.join(' '));
        }
    }
}

export default PersonValidator;
