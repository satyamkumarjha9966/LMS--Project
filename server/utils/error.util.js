class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);  // Kis line me JS ka file phat gaya hai iske record ke liye
    }
}

export default AppError;

// Now you get a Enrich Error Message