import { Router } from "express";
import { registerContent, getContentById, getAllContentsByRangeAndTag, deleteContent, updateContent } from "../controller";
import authenticateToken from "../middleware/authMiddleware";


const contentrouter = Router();

contentrouter.post("/register-content", registerContent);
contentrouter.get("/get-content-by-id", getContentById);
contentrouter.get("/get-all-contents-by-range-and-tag", getAllContentsByRangeAndTag);
contentrouter.delete("/delete-content", deleteContent);
contentrouter.put("/update-content", authenticateToken, updateContent);

export default contentrouter;