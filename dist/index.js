"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./config/logger"));
const PORT = process.env.BACKEND_PORT || 3000;
app_1.default.listen(PORT, () => {
    logger_1.default.info(`Server started successfully`, {
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
        url: `http://localhost:${PORT}/`,
    });
});
process.on('uncaughtException', (error) => {
    logger_1.default.error('Uncaught Exception:', { error: error.message, stack: error.stack });
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    logger_1.default.error('Unhandled Rejection:', { reason, promise });
    process.exit(1);
});
