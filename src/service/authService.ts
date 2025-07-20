import { Request } from "express";
import { createToken } from "../lib/jwt";
import { apiError } from "../utils/apiError";
import { UserLoginResponse, UserRegisterRequest, UserLoginRequest } from "../model/userModel";
import { repositoryWrapper } from "../repository/repositoryWrapper";

class AuthService {
    // private readonly userData: Request;

    constructor(userData: Request) {
        // this.userData = userData;
    }

    async registerUser(req: UserRegisterRequest): Promise<UserLoginResponse> {
        const isEmailExist = await repositoryWrapper.userRepository.findUser({ email: req.email });
        if (isEmailExist) {
            throw new apiError("User with email already exists", 409);
        }
        const token = await createToken({ name: req.name }, "7d");
        if (!token) {
            throw new apiError("Token generation failed", 500);
        }
        // Implement Password hashing here before saving to DB TODO
        await repositoryWrapper.userRepository.create({
            name: req.name,
            email: req.email,
            password: req.password,
        });
        return {
            name: req.name,
            token,
        };
    }

    async loginUser(req: UserLoginRequest): Promise<UserLoginResponse> {
        const isUserExist = await repositoryWrapper.userRepository.findUser({ email: req.email, password: req.password });
        if (!isUserExist) {
            throw new apiError("Unauthorized user", 401);
        }
        const token = await createToken({ name: isUserExist.name }, "7d");
        if (!token) {
            throw new apiError("Token generation failed", 500);
        }
        return {
            name: isUserExist.name,
            token,
        };
    }
}

export default AuthService;