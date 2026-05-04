import type { Request, Response, NextFunction } from "express";
import { Message } from "../utils/Errors.js";
import AuthService from "../services/auth.service.js";

const authService = new AuthService();

const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Token is incorect" });
		}

		const member = await authService.veritfyToken(token);

		req.member = member;
		next();
	} catch (err) {
		return res.status(401).json({
			message: Message.NOT_AUTHENTICATED,
		});
	}
};

export default authMiddleware;
