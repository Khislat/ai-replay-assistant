import type { Request, Response } from "express";
import type { T } from "../libs/types/common.js";
import type { Member, MemberInput } from "../libs/types/member.js";
import AuthService from "../services/auth.service.js";
import Errors from "../utils/Errors.js";

const authController: T = {};
const authService = new AuthService();

authController.postSignUp = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const input: MemberInput = req.body;
		const result = await authService.postSignUp(input);
		res.json(result);
	} catch (err) {
		console.log("Error signup", err);
		if (err instanceof Errors) res.status(err.code).json(err);
		else res.status(Errors.standart.code).json(Errors.standart);
	}
};

authController.postLogin = async (req: Request, res: Response) => {
  
}

export default authController;
