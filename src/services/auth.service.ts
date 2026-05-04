import jwt from "jsonwebtoken";
import prisma from "../libs/prisma.js";
import Errors, { HttpCode, Message } from "../utils/Errors.js";

class AuthService {
	public async veritfyToken(token: string) {
		const vfToken = jwt.verify(token, process.env.ACCESS_SECRET!) as {
			id: number;
			memberPhone: string;
		};

		const user = await prisma.member.findUnique({
			where: {
				id: vfToken.id,
			},
		});

		if (!user) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

		return user;
	}
}

export default AuthService;
