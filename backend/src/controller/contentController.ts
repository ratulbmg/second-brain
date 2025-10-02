import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";

export const registerContent = asyncHandler(async (req: Request, res: Response) => {
    const response = "test register content"
    res.status(200).json(
        new ApiResponse(200, response, "Content Registration successfully")
    );
});

export const getContentById = asyncHandler(async (req: Request, res: Response) => {
    const response = "test get content by id"
    res.status(200).json(
        new ApiResponse(200, response, "Get Content By Id")
    );
});

export const getAllContentsByRangeAndTag = asyncHandler(async (req: Request, res: Response) => {
    const response = "test get all contents by range and tag"
    res.status(200).json(
        new ApiResponse(200, response, "Get All Contents By Range And Tag")
    );
});

export const deleteContent = asyncHandler(async (req: Request, res: Response) => {
    const response = "test delete content"
    res.status(200).json(
        new ApiResponse(200, response, "Content Deleted")
    );
});

export const updateContent = asyncHandler(async (req: Request, res: Response) => {
    const response = "test update content"
    res.status(200).json(
        new ApiResponse(200, response, "Content Update successfully")
    );
});
