"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controller");
const authrouter = (0, express_1.Router)();
authrouter.route("/register").post(controller_1.registerUser);
authrouter.route("/login").post(controller_1.loginUser);
authrouter.route("/logout").post(controller_1.logoutUser);
exports.default = authrouter;
