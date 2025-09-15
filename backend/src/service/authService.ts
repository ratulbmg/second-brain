import { Request } from "express";
import { createToken } from "../lib/jwt";
import { apiError } from "../utils/apiError";
import { UserLoginResponse, UserRegisterRequest, UserLoginRequest } from "../model/userModel";
import { repositoryWrapper } from "../repository/repositoryWrapper";
import logger from "../config/logger";

class AuthService {
    constructor(userData: Request) {
        // this.userData = userData;
    }

    async registerUser(req: UserRegisterRequest): Promise<UserLoginResponse> {
        logger.info('User registration attempt', { email: req.email, name: req.name });

        const isEmailExist = await repositoryWrapper.userRepository.findUser({ email: req.email });
        if (isEmailExist) {
            logger.warn('Registration failed: Email already exists', { email: req.email });
            throw new apiError("User with email already exists", 409);
        }

        const token = await createToken({ name: req.name }, "7d");
        if (!token) {
            logger.error('Token generation failed during registration');
            throw new apiError("Token generation failed", 500);
        }

        // Implement Password hashing here before saving to DB TODO
        await repositoryWrapper.userRepository.create({
            name: req.name,
            email: req.email,
            password: req.password,
        });

        logger.info('User registered successfully', { email: req.email, name: req.name });

        return {
            name: req.name,
            token,
        };
    }

    async loginUser(req: UserLoginRequest): Promise<UserLoginResponse> {
        logger.info('User login attempt', { email: req.email });

        const isUserExist = await repositoryWrapper.userRepository.findUser({ email: req.email, password: req.password });
        if (!isUserExist) {
            logger.warn('Login failed: Invalid credentials', { email: req.email });
            throw new apiError("Unauthorized user", 401);
        }

        const token = await createToken({ name: isUserExist.name }, "7d");
        if (!token) {
            logger.error('Token generation failed during login');
            throw new apiError("Token generation failed", 500);
        }

        logger.info('User logged in successfully', { email: req.email, name: isUserExist.name });

        return {
            name: isUserExist.name,
            token,
        };
    }
}

export default AuthService;