import { registerUser, loginUser, meAccount } from "./authController";
import { registerContent, getContentById, getAllContentsByRangeAndTag, deleteContent, updateContent } from "./contentController";
import { getAllTags } from "./tagController";

export {
    registerUser,
    loginUser,
    meAccount,
    registerContent,
    getContentById,
    getAllContentsByRangeAndTag,
    deleteContent,
    updateContent,
    getAllTags
}