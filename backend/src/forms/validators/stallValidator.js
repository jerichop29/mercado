class StallValidator {
    static validateStallData(data) {
        const errors = [];

        if (!data.StallCode || typeof data.StallCode !== 'string' || !data.StallCode.trim()) {
            errors.push('StallCode is required and must be a non-empty string.');
        }

        if (!data.buildingName || typeof data.buildingName !== 'string' || !data.buildingName.trim()) {
            errors.push('Building name is required and must be a non-empty string.');
        }

        if (!data.type || typeof data.type !== 'string' || !data.type.trim()) {
            errors.push('Type is required and must be a non-empty string.');
        }

        if (data.size && (typeof data.size !== 'number' || data.size <= 0)) {
            errors.push('Size must be a positive number if provided.');
        }

        if (errors.length > 0) {
            throw new Error(errors.join(' '));
        }
    }
}

export default StallValidator;
