class DiscoverValidator {
    static validateDiscoverData(data) {
        const errors = [];

        if (!data.Title || typeof data.Title !== 'string' || !data.Title.trim()) {
            errors.push('Title is required and must be a non-empty string.');
        }


        if (!data.Activity || typeof data.Activity !== 'string' || !data.Activity.trim()) {
            errors.push('Activity is required and must be a non-empty string.');
        }

        if (!data.Description || typeof data.Description !== 'string' || !data.Description.trim()) {
            errors.push('Description is required and must be a non-empty string.');
        }

        if (!data.Date_Start || isNaN(Date.parse(data.Date_Start))) {
            errors.push('Date_Start is required and must be a valid date.');
        }

        if (!data.Date_End || isNaN(Date.parse(data.Date_End))) {
            errors.push('Date_End is required and must be a valid date.');
        }

        if (new Date(data.Date_Start) > new Date(data.Date_End)) {
            errors.push('Date_Start cannot be later than Date_End.');
        }

        if (!data.Link || typeof data.Link !== 'string' || !data.Link.trim()) {
            errors.push('Registration form URL is required and must be a non-empty string.');
        }

        if (errors.length > 0) {
            throw new Error(errors.join(' '));
        }
    }
}

export default DiscoverValidator;
