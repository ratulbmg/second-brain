export class apiError extends Error {
    statusCode: number;
    errors?: any;

    constructor(message: string, statusCode: number, errors?: any) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;

        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name;

        // Capture the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}