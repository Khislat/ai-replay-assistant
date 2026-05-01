import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Errors, { HttpCode, Message } from "../utils/Errors.js";
import type { ExstendedRequest } from "../libs/types/member.js";
import prisma from "../libs/prisma.js";

const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader)
			throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

		const token = authHeader.split(" ")[1];

		if (!token) {
			return res.status(401).json({ message: "Token is incorect" });
		}

		const verifyToken = jwt.verify(token, process.env.ACCESS_SECRET!) as {
			id: number;
			memberPhone: string;
		};

		const memberId = verifyToken.id;

		console.log("memberID:", memberId);

		const user = await prisma.member.findUnique({
			where: {
				id: verifyToken.id,
			},
		});

		if (!user) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

		req.member = user;
		console.log("user:", user);

		next();
	} catch (err) {
		return res.status(401).json({
			message: Message.NOT_AUTHENTICATED,
		});
	}
};

export default authMiddleware;
