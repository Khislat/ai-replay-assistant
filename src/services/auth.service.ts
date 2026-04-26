import { getNextId, MembersDB } from "../data/store.js";
import type { Member, MemberInput } from "../libs/types/member.js";
import bcrypt from "bcrypt";
import Errors, { HttpCode, Message } from "../utils/Errors.js";
import prisma from "../libs/prisma.js";
const saltRounds = 10;

class AuthService {
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

  public async postLogin(input: )
}

export default AuthService;
