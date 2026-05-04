import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import type { Request, Response } from "express";
import memberController from "../controllers/member.controller.js";
import validate from "../middleware/validate.middleware.js";
import {
	loginSchema,
	signUpSchema,
} from "../libs/validations/member.validation.js";
import requireRole from "../middleware/role.middleware.js";
import { MemberRole } from "@prisma/client";

const routerAuth = express.Router();

routerAuth.get(
	"/admin",
	authMiddleware,
	requireRole(MemberRole.ADMIN),
	(req, res) => {
		res.json({ message: "Admin panel" });
	}
);

routerAuth.post("/signup", validate(signUpSchema), memberController.postSignUp);

routerAuth.post("/login", validate(loginSchema), memberController.postLogin);

routerAuth.get("/test", authMiddleware, (req: Request, res: Response) => {
	res.send("OK");
});

routerAuth.post("/refresh", memberController.refreshToken);

routerAuth.post("/logout", authMiddleware, memberController.logout);

export default routerAuth;
