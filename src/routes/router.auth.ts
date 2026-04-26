import express from "express";
import authController from "../controllers/auth.controller.js";
const routerAuth = express.Router();

routerAuth.post("/signup", authController.postSignUp);

routerAuth.post("/login", authController.postLogin);

export default routerAuth;
