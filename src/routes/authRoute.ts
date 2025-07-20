import { Router } from "express";
import { registerUser, loginUser, meAccount } from "../controller";

const authrouter = Router();

authrouter.route("/register").post(registerUser);
authrouter.route("/login").post(loginUser);
authrouter.route("/me").get(meAccount)

export default authrouter;