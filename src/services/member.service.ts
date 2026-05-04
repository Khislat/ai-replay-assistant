import type {
	AuthMember,
	LoginInput,
	LoginResponse,
	Member,
	MemberInput,
} from "../libs/types/member.js";
import bcrypt from "bcrypt";
import Errors, { HttpCode, Message } from "../utils/Errors.js";
import prisma from "../libs/prisma.js";
import jwt from "jsonwebtoken";

const saltRounds = 10;

class MemberService {
	constructor() {}
	public async postSignUp(input: MemberInput): Promise<Member> {
		try {
			const existingMember = await prisma.member.findUnique({
				where: { memberPhone: input.memberPhone },
			});

			if (existingMember) {
				throw new Error("Member has with this member phone");
			}

			const hashedPassword = (input.memberPassword = await bcrypt.hash(
				input.memberPassword,
				saltRounds
			));
			const newMember: Member = await prisma.member.create({
				data: {
					memberNick: input.memberNick,
					memberPhone: input.memberPhone,
					memberPassword: hashedPassword,
				},
			});

			newMember.memberPassword = "";

			return newMember;
		} catch (err) {
			console.error("Error, modelsignup", err);
			throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
		}
	}

	public async postLogin(input: LoginInput): Promise<LoginResponse> {
		const member = await prisma.member.findUnique({
			where: {
				memberPhone: input.memberPhone,
			},
		});

		if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_PHONE);

		const payload = {
			id: member.id,
			userphone: member.memberPhone,
		};

		const isMatch = await bcrypt.compare(
			input.memberPassword,
			member.memberPassword
		);

		if (!isMatch) throw new Errors(HttpCode.NOT_FOUND, Message.WRONG_PASSWORD);

		const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET!, {
			expiresIn: "1h",
		});

		const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET!, {
			expiresIn: "7d",
		});

		await prisma.member.update({
			where: { id: member.id },
			data: { refreshToken },
		});

		const {
			memberPassword,
			refreshToken: dbRefreshToken,
			...safeMember
		} = member;
		return {
			member: safeMember,
			accessToken,
			refreshToken,
		};
	}

	public async refreshToken(refreshToken: string) {
		if (!refreshToken) {
			throw new Errors(HttpCode.UNAUTHORIZED, Message.NO_REFRESH_TOKEN);
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN!) as {
			id: number;
		};

		const user = await prisma.member.findUnique({ where: { id: decoded.id } });

		if (!user || user.refreshToken !== refreshToken) {
			throw new Errors(HttpCode.UNAUTHORIZED, Message.INVALID_REFRESH_TOKEN);
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

		return {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		};
	}

	public async logout(member: AuthMember) {
		if (!member) {
			throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);
		}

		const updateRefreshToken = await prisma.member.update({
			where: {
				id: member.id,
			},
			data: {
				refreshToken: null,
			},
		});

		return { success: true };
	}
}

export default MemberService;
