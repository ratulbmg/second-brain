"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = require("../utils/apiError");
const zod_1 = require("zod");
const logger_1 = __importDefault(require("../config/logger"));
const errorHandler = (err, req, res, next) => {
    logger_1.default.error('Error handled by middleware:', {
        error: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        statusCode: err.statusCode || 500,
    });
    if (err instanceof apiError_1.apiError) {
        res.status(err.statusCode).json({
            message: err.message,
            errors: err.errors || null,
        });
    }
    else if (err instanceof zod_1.ZodError) {
        res.status(400).json({
            message: "Validation failed",
            errors: err.errors[0].message
        });
    }
    else {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message || "Something went wrong",
        });
    }
};
exports.default = errorHandler;
