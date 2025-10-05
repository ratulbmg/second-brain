import { request } from "express";
import AuthService from "./authService";
import ContentService from "./contentService";
import TagService from "./tagService";

const authService = new AuthService(request);
const contentService = new ContentService(request);
const tagService = new TagService();

export {
    authService,
    contentService,
    tagService
}