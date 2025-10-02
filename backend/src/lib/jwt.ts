import jwt from "jsonwebtoken";
import { apiError } from "../utils/apiError";

export interface JWTPayload {
    name: string;
    uniqueId: string;
}

export const createToken = async (data: JWTPayload, validity: string = "1h"): Promise<string> => {
    const token = jwt.sign(
        data,
        process.env.JWT_SECRET as string,
        { expiresIn: validity }
    );
    return token;
}

export const verifyToken = async (token: string): Promise<JWTPayload> => {
    try {
        // clean the token (removing the Bearer prefix)
        token = token.startsWith('Bearer ') ? token.slice(7) : token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
        return decoded;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new apiError('Token expired', 401);
        } else if (error instanceof jwt.JsonWebTokenError){
            throw new apiError('Invalid token', 401);
        } else{
            throw new apiError('Token verification failed', 401);
        }
    }
}