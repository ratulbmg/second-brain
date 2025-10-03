import { Router } from "express";
import { registerContent, getContentById, getAllContentsByRangeAndTag, deleteContent, updateContent } from "../controller";
import authenticateToken from "../middleware/authMiddleware";


const contentrouter = Router();

contentrouter.post("/register-content", authenticateToken, registerContent);
contentrouter.get("/get-content-by-id/:id", authenticateToken, getContentById);
contentrouter.get("/get-all-contents-by-range-and-tag", authenticateToken, getAllContentsByRangeAndTag);
contentrouter.delete("/delete-content", authenticateToken, deleteContent);
contentrouter.put("/update-content", authenticateToken, updateContent);

export default contentrouter;