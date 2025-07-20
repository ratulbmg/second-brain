"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerUserSchema = zod_1.default.object({
    name: zod_1.default
        .string({ message: "Please enter Name" })
        .trim()
        .min(3, { message: "Name must be at least 3 characters long." })
        .max(100, { message: "Name must be no more than 100 characters." }),
    email: zod_1.default
        .string({ message: "Please enter Email" })
        .trim()
        .email({ message: "Please enter a valid email address" })
        .max(320, { message: "Email must be no more than 320 characters." }),
    password: zod_1.default
        .string({ message: "Please enter Password" })
        .min(3, { message: "Password must be at least 3 characters long." })
        .max(255, { message: "Password must be no more than 255 characters." })
});
