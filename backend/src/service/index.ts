import { request } from "express";
import AuthService from "./authService";

const authService = new AuthService(request);

export {
    authService
}