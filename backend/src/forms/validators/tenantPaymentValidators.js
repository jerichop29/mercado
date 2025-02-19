class TenantPaymentValidator {
    static validateStallPaymentData(data) {
        const errors = [];

        if (!data.Stall_Id || typeof data.Stall_Id !== 'string' || !data.Stall_Id.trim()) {
            errors.push('Stall_Id is required and must be a non-empty string.');
        }

        if (!data.Owner_Id || typeof data.Owner_Id !== 'string' || !data.Owner_Id.trim()) {
            errors.push('Owner_Id is required and must be a non-empty string.');
        }

        if (data.Price === undefined || typeof data.Price !== 'number' || data.Price < 0) {
            errors.push('Price is required and must be a non-negative number.');
        }

        if (!data.DueDate || isNaN(Date.parse(data.DueDate))) {
            errors.push('DueDate is required and must be a valid date.');
        }

        if (!data.Status || typeof data.Status !== 'string' || !data.Status.trim()) {
            errors.push('Status is required and must be a non-empty string.');
        }

        if (errors.length > 0) {
            throw new Error(errors.join(' '));
        }
    }
}

export default TenantPaymentValidator;
