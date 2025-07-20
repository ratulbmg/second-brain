"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const express_1 = require("express");
const authService_1 = __importDefault(require("./authService"));
const authService = new authService_1.default(express_1.request);
exports.authService = authService;
