import { Request, Response } from "express";
import { authService } from "../service";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { registerUserSchema, loginUserSchema } from "../validation";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const validatedUserData = registerUserSchema.parse(req.body)
    const response = await authService.registerUser(validatedUserData);
    res.status(200).json(
        new ApiResponse(
            200,
            {
                name: response.name,
                token: response.token
            },
            "User Registration successfully"
        )
    );
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const validatedUserData = loginUserSchema.parse(req.body)
    const response = await authService.loginUser(validatedUserData);
    res.status(200).json(
        new ApiResponse(
            200,
            {
                name: response.name,
                token: response.token
            },
            "User Login successfully"
        )
    );
});

export const meAccount = asyncHandler(async (res:Response) => {

});