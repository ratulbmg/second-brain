"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meAccount = exports.loginUser = exports.registerUser = void 0;
const service_1 = require("../service");
const apiResponse_1 = require("../utils/apiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const validation_1 = require("../validation");
exports.registerUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedUserData = validation_1.registerUserSchema.parse(req.body);
    const response = yield service_1.authService.registerUser(validatedUserData);
    res.status(200).json(new apiResponse_1.ApiResponse(200, {
        name: response.name,
        token: response.token
    }, "User Registration successfully"));
}));
exports.loginUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedUserData = validation_1.loginUserSchema.parse(req.body);
    const response = yield service_1.authService.loginUser(validatedUserData);
    res.status(200).json(new apiResponse_1.ApiResponse(200, {
        name: response.name,
        token: response.token
    }, "User Login successfully"));
}));
exports.meAccount = (0, asyncHandler_1.asyncHandler)((res) => __awaiter(void 0, void 0, void 0, function* () {
}));
