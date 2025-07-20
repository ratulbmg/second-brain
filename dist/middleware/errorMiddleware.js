"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = require("../utils/apiError");
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
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
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message || "Something went wrong",
    });
};
exports.default = errorHandler;
