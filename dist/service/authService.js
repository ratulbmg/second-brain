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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../lib/jwt");
const apiError_1 = require("../utils/apiError");
const repositoryWrapper_1 = require("../repository/repositoryWrapper");
const logger_1 = __importDefault(require("../config/logger"));
class AuthService {
    constructor(userData) {
    }
    registerUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('User registration attempt', { email: req.email, name: req.name });
            const isEmailExist = yield repositoryWrapper_1.repositoryWrapper.userRepository.findUser({ email: req.email });
            if (isEmailExist) {
                logger_1.default.warn('Registration failed: Email already exists', { email: req.email });
                throw new apiError_1.apiError("User with email already exists", 409);
            }
            const token = yield (0, jwt_1.createToken)({ name: req.name }, "7d");
            if (!token) {
                logger_1.default.error('Token generation failed during registration');
                throw new apiError_1.apiError("Token generation failed", 500);
            }
            yield repositoryWrapper_1.repositoryWrapper.userRepository.create({
                name: req.name,
                email: req.email,
                password: req.password,
            });
            logger_1.default.info('User registered successfully', { email: req.email, name: req.name });
            return {
                name: req.name,
                token,
            };
        });
    }
    loginUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('User login attempt', { email: req.email });
            const isUserExist = yield repositoryWrapper_1.repositoryWrapper.userRepository.findUser({ email: req.email, password: req.password });
            if (!isUserExist) {
                logger_1.default.warn('Login failed: Invalid credentials', { email: req.email });
                throw new apiError_1.apiError("Unauthorized user", 401);
            }
            const token = yield (0, jwt_1.createToken)({ name: isUserExist.name }, "7d");
            if (!token) {
                logger_1.default.error('Token generation failed during login');
                throw new apiError_1.apiError("Token generation failed", 500);
            }
            logger_1.default.info('User logged in successfully', { email: req.email, name: isUserExist.name });
            return {
                name: isUserExist.name,
                token,
            };
        });
    }
}
exports.default = AuthService;
