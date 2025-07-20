import jwt from "jsonwebtoken";

export const createToken = async (data: Record<string, any>, validity: string = "1h"): Promise<string> => {
    const token = jwt.sign(
        data,
        process.env.JWT_SECRET as string,
        { expiresIn: validity }
    );
    return token;
}

export const verifyToken = async () => {

}