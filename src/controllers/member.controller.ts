import type { NextFunction, Request, Response } from "express";
import type { T } from "../libs/types/common.js";
import type {
	AuthRequest,
	LoginInput,
	MemberInput,
} from "../libs/types/member.js";
import Errors from "../utils/Errors.js";
import MemberService from "../services/member.service.js";
import logger from "../utils/logger.js";

const memberController: T = {};
const memberService = new MemberService();

memberController.postSignUp = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	try {
		logger.info("User enter to the signup page");
		const input: MemberInput = req.body;
		const result = await memberService.postSignUp(input);
		res.json(result);
	} catch (err) {
		next(err);
	}
};

memberController.postLogin = async (req: Request, res: Response) => {
	try {
		const input: LoginInput = req.body;
		const result = await memberService.postLogin(input);

		res.json(result);
	} catch (error) {
		console.log("Error Login:", error);
		if (error instanceof Errors) res.status(error.code).json(error);
		else res.status(Errors.standart.code).json(Errors.standart);
	}
};

memberController.refreshToken = async (req: Request, res: Response) => {
	try {
		const { refreshToken } = req.body;

		const result = await memberService.refreshToken(refreshToken);

		return res.json(result);
	} catch (err) {
		return res.status(401).json({ message: "Invalid refresh token" });
	}
};

memberController.logout = async (req: AuthRequest, res: Response) => {
	try {
		const member = req.member;

		if (!member) {
			return res.status(401).json({
				message: "Not authenticated",
			});
		}

		const result = await memberService.logout(member);

		return res.json({
			message: "Logged out successfullbu y",
			data: result,
		});
	} catch (err: any) {
		return res.status(err.statusCode || 500).json({
			message: err.message || "Logout error",
		});
	}
};

export default memberController;
