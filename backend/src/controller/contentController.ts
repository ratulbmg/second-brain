import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { contentService } from "../service";

export const registerContent = asyncHandler(async (req: Request, res: Response) => {
    // TODO: validate the request body if necessary
    const response = await contentService.registerContent(req);
    res.status(200).json(
        new ApiResponse(200, response, "Content Registration successfully")
    );
});

export const getContentById = asyncHandler(async (req: Request, res: Response) => {
    // TODO: validate the request body if necessary
    const response = await contentService.getContentById(req);
    res.status(200).json(
        new ApiResponse(200, response, "Get Content By Id")
    );
});

export const getAllContentsByRangeAndTag = asyncHandler(async (req: Request, res: Response) => {
    // TODO: validate the request body if necessary
    const response = await contentService.getAllContentsByRangeAndTag(req);
    res.status(200).json(
        new ApiResponse(200, response, "Get All Contents By Range And Tag")
    );
});

export const deleteContent = asyncHandler(async (req: Request, res: Response) => {
    // TODO: validate the request body if necessary
    const response = await contentService.deleteContent(req);
    res.status(200).json(
        new ApiResponse(200, response, "Content Deleted")
    );
});

export const updateContent = asyncHandler(async (req: Request, res: Response) => {
    // TODO: validate the request body if necessary
    const response = await contentService.updateContent(req);
    res.status(200).json(
        new ApiResponse(200, response, "Content Update successfully")
    );
});
