import { Router, Request, Response } from "express";
import { apiError } from "../utils/apiError";
import authrouter from "./authRoute";
import contentrouter from "./contentRoute";
import tagrouter from "./tagRoute";

const router = Router();

// Register all routers
router.use(authrouter) // Routes for authentication
router.use(contentrouter) // Routes for content
router.use(tagrouter) // Routes for tags

// Handle invalid routes
router.use((req: Request, res: Response) => {
    throw new apiError("Route not found", 404)
});

export default router;