import express from "express";
import authController from "../controllers/member.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import type { Request, Response, NextFunction } from "express";
import type { ExstendedRequest } from "../libs/types/member.js";
import memberController from "../controllers/member.controller.js";

const routerAuth = express.Router();

routerAuth.post("/signup", memberController.postSignUp);

routerAuth.post("/login", memberController.postLogin);

routerAuth.get("/test", authMiddleware, (req: Request, res: Response) => {
	res.send("OK");
});

routerAuth.post("/refresh", memberController.refreshToken);

routerAuth.post("/logout", authMiddleware, memberController.logout);

export default routerAuth;
