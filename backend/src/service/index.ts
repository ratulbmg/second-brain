import { request } from "express";
import AuthService from "./authService";
import ContentService from "./contentService";

const authService = new AuthService(request);
const contentService = new ContentService(request);

export {
    authService,
    contentService
}