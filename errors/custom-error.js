
class CustomApiError extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode;
    }
};

const createCustomError = (msg, statusCode) => {
    return new CustomApiError(msg, statusCode);
};

export {createCustomError, CustomApiError};