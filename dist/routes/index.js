"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiError_1 = require("../utils/apiError");
const authRoute_1 = __importDefault(require("./authRoute"));
const router = (0, express_1.Router)();
router.use(authRoute_1.default);
router.use((req, res) => {
    throw new apiError_1.apiError("Route not found", 404);
});
exports.default = router;
