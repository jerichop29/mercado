class EventValidator {
    static validateEventData(data) {
        const errors = [];

        if (!data.facilities_Id || typeof data.facilities_Id !== 'string' || !data.facilities_Id.trim()) {
            errors.push('facilities_Id is required and must be a non-empty string.');
        }

        if (!data.Event_Name || typeof data.Event_Name !== 'string' || !data.Event_Name.trim()) {
            errors.push('Event_Name is required and must be a non-empty string.');
        }

        if (!data.Event_Date || isNaN(Date.parse(data.Event_Date))) {
            errors.push('Event_Date is required and must be a valid date.');
        }

        if (errors.length > 0) {
            throw new Error(errors.join(' '));
        }
    }
}

export default EventValidator;
