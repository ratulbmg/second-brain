import { Request } from "express";
import { apiError } from "../utils/apiError";
import { repositoryWrapper } from "../repository/repositoryWrapper";
import logger from "../config/logger";
import { ContentRegisterRequest, ContentResponse } from "../model/contentModel";

class ContentService {
    constructor(contentData: Request) {
        // this.userData = userData;
    }

    async registerContent(req: ContentRegisterRequest): Promise<ContentResponse> {
        logger.info('Content registration attempt', { uniqueId: req.uniqueId, title: req.title, content: req.content, url: req.url, tagId: req.tagId, linkId: req.linkId });

        const isUniqueIdExist = await repositoryWrapper.contentRepository.findContent({ uniqueId: req.uniqueId });
        if (isUniqueIdExist) {
            logger.warn('Content Registration failed: Unique Id already exists', { uniqueId: req.uniqueId });
            throw new apiError("Content with unique Id already exists", 409);
       }

       const content = await repositoryWrapper.contentRepository.create({
        uniqueId: req.uniqueId,
        title: req.title,
        content: req.content,
        url: req.url,
        tagId: req.tagId,
        linkId: req.linkId,
       })

       logger.info('Content registered successfully', { uniqueId: req.uniqueId, title: req.title, content: req.content, url: req.url, tagId: req.tagId, linkId: req.linkId });

    //    const tag = await repositoryWrapper.tagRepository.findTag({ id: req.tagId });
    //    const link = await repositoryWrapper.linkRepository.findLink({ id: req.linkId });

       return {
        uniqueId: content.uniqueId!,
        title: content.title,
        content: content.content,
        url: content.url,
        tag: "link", // TODO: get tag from the database
        link: "sherelink", // TODO: get link from the database
       }
    }

}