"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const express_1 = __importDefault(require("express"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const loggerMiddleware_1 = require("./middleware/loggerMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(loggerMiddleware_1.requestLogger);
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(loggerMiddleware_1.errorLogger);
app.use(errorMiddleware_1.default);
exports.default = app;
