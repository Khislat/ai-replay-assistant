import type { Request, Response } from "express";
import type { T } from "../libs/types/common.js";
import type { LoginInput, Member, MemberInput } from "../libs/types/member.js";
import Errors from "../utils/Errors.js";
import MemberService from "../services/member.service.js";
import jwt from "jsonwebtoken";
import prisma from "../libs/prisma.js";

const memberController: T = {};
const memberService = new MemberService();

memberController.postSignUp = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const input: MemberInput = req.body;
		const result = await memberService.postSignUp(input);
		res.json(result);
	} catch (err) {
		console.log("Error signup", err);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standart.code).json(Errors.standart);
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

		if (!refreshToken) {
			return res.status(401).json({ message: "No refresh token" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as {
			id: number;
		};

		const user = await prisma.member.findUnique({
			where: {
				id: decoded.id,
			},
		});

		if (!user || user.refreshToken !== refreshToken) {
			return res.status(401).json({ message: "Invalid refresh token" });
		}

		const newAccessToken = jwt.sign(
			{ id: decoded.id },
			process.env.ACCESS_SECRET!,
			{ expiresIn: "1h" }
		);

		const newRefreshToken = jwt.sign(
			{
				id: user.id,
			},
			process.env.REFRESH_SECRET!,
			{ expiresIn: "7d" }
		);

		await prisma.member.update({
			where: {
				id: user.id,
			},
			data: {
				refreshToken: newRefreshToken,
			},
		});

		return res.json({
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		});
	} catch (err) {
		return res.status(401).json({ message: "Invalid refresh token" });
	}
};

memberController.logout = async (req: Request, res: Response) => {
	try {
		if (!req.member) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const userId = req.member.id;

		await prisma.member.update({
			where: {
				id: userId,
			},
			data: {
				refreshToken: null,
			},
		});

		return res.json({
			message: "Logged out successfuly",
		});
	} catch (err) {
		return res.status(500).json({
			message: "Logout error",
		});
	}
};

export default memberController;
