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
const jwt_1 = require("../utils/jwt");
const apiError_1 = require("../utils/apiError");
const repositoryWrapper_1 = require("../repository/repositoryWrapper");
class AuthService {
    constructor(userData) {
    }
    registerUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const isEmailExist = yield repositoryWrapper_1.repositoryWrapper.userRepository.findOne({ email: req.email });
            if (isEmailExist) {
                throw new apiError_1.apiError("User with email already exists", 409);
            }
            const token = yield (0, jwt_1.createToken)({ username: req.name }, "7d");
            if (!token) {
                throw new apiError_1.apiError("Token generation failed", 500);
            }
            yield repositoryWrapper_1.repositoryWrapper.userRepository.create({
                name: req.name,
                email: req.email,
                password: req.password,
            });
            return {
                name: req.name,
                token,
            };
        });
    }
    loginUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("User login successfully");
            console.log(req.body.username);
        });
    }
    logoutUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("User logout successfully");
            console.log(req.body.username);
        });
    }
}
exports.default = AuthService;
