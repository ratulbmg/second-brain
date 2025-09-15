import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { apiError } from "../utils/apiError";
import { ZodError } from "zod";
import logger from "../config/logger";

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    // Log the error
    logger.error('Error handled by middleware:', {
        error: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        statusCode: err.statusCode || 500,
    });

    if (err instanceof apiError) {
        res.status(err.statusCode).json({
            message: err.message,
            errors: err.errors || null,
        });
    } else if (err instanceof ZodError) {
        res.status(400).json({
            message: "Validation failed",
            errors: err.errors[0].message
        });
    } else {
        // Handle generic errors
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message || "Something went wrong",
        });
    }
};

export default errorHandler;