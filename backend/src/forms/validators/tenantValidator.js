class TenantValidator {
    static validateTenantData(data) {
        const errors = [];

        if (!data.Person_Id || typeof data.Person_Id !== 'string' || !data.Person_Id.trim()) {
            errors.push('Person_Id is required and must be a non-empty string.');
        }

        if (!data.Stall_Id || typeof data.Stall_Id !== 'string' || !data.Stall_Id.trim()) {
            errors.push('Stall_Id is required and must be a non-empty string.');
        }

        if (!data.Owner_Id || typeof data.Owner_Id !== 'string' || !data.Owner_Id.trim()) {
            errors.push('Owner_Id is required and must be a non-empty string.');
        }

        if (!data.Date_Start || isNaN(Date.parse(data.Date_Start))) {
            errors.push('Date_Start is required and must be a valid date.');
        }

        if (data["Market_Fee"] === undefined || typeof data["Market_Fee"] !== 'string' || !data["Market_Fee"].trim() || isNaN(Number(data["Market_Fee"])) || Number(data["Market_Fee"]) < 0) {
            errors.push('Market Fee is required and must be a non-negative number.');
        }

        if (errors.length > 0) {
            throw new Error(errors.join(' '));
        }
    }
}

export default TenantValidator;
