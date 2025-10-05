import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { tagService } from "../service";

export const getAllTags = asyncHandler(async (req: Request, res: Response) => {
    const response = await tagService.getAllTags();
    res.status(200).json(
        new ApiResponse(200, response, "Get All Tags")
    );
});