import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { contentService } from "../service";
import { authenticatedRequestSchema, contentQuerySchema, idParamSchema, registerContentSchema, updateContentSchema } from "../validation/contentValidation";


export const registerContent = asyncHandler(async (req: Request & { uniqueId?: any }, res: Response) => {
    const validatedAuth = authenticatedRequestSchema.parse({ uniqueId: req.uniqueId });
    const validatedBody = registerContentSchema.parse(req.body);

    req.uniqueId = validatedAuth.uniqueId;
    req.body = validatedBody;

    const response = await contentService.registerContent(req);
    res.status(200).json(
        new ApiResponse(200, response, "Content Registration successfully")
    );
});

export const getContentById = asyncHandler(async (req: Request & { uniqueId?: any }, res: Response) => {
    const validatedAuth = authenticatedRequestSchema.parse({ uniqueId: req.uniqueId });
    idParamSchema.parse(req.params);

    req.uniqueId = validatedAuth.uniqueId;

    const response = await contentService.getContentById(req);
    res.status(200).json(
        new ApiResponse(200, response, "Get Content By Id")
    );
});

export const getAllContentsByRangeAndTag = asyncHandler(async (req: Request & { uniqueId?: any }, res: Response) => {
    const validatedAuth = authenticatedRequestSchema.parse({ uniqueId: req.uniqueId });
    contentQuerySchema.parse(req.query);

    req.uniqueId = validatedAuth.uniqueId;

    const response = await contentService.getAllContentsByRangeAndTag(req);
    res.status(200).json(
        new ApiResponse(200, response, "Get All Contents By Range And Tag")
    );
});

export const deleteContent = asyncHandler(async (req: Request & { uniqueId?: any }, res: Response) => {
    const validatedAuth = authenticatedRequestSchema.parse({ uniqueId: req.uniqueId });
    idParamSchema.parse(req.params);

    req.uniqueId = validatedAuth.uniqueId;

    const response = await contentService.deleteContent(req);
    res.status(200).json(
        new ApiResponse(200, response, "Content Deleted")
    );
});

export const updateContent = asyncHandler(async (req: Request & { uniqueId?: any }, res: Response) => {
    const validatedAuth = authenticatedRequestSchema.parse({ uniqueId: req.uniqueId });
    updateContentSchema.parse(req.body);
    idParamSchema.parse(req.params);

    req.uniqueId = validatedAuth.uniqueId;

    const response = await contentService.updateContent(req);
    res.status(200).json(
        new ApiResponse(200, response, "Content Update successfully")
    );
});