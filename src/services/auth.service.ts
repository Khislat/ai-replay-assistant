import { resolve } from "dns";
import type { Member } from "../libs/types/member.js";
import jwt from "jsonwebtoken";
import { AUTH_TIMER } from "../utils/config.js";
import Errors, { HttpCode, Message } from "../utils/Errors.js";

class AuthService {
	private readonly secretToken;
	constructor() {
		this.secretToken = process.env.SECRET_TOKEN as string;
	}

	public async createToken(payload: Member) {
		return new Promise((resolve, reject) => {
			const duration = `${AUTH_TIMER}h`;
			jwt.sign(
				payload,
				process.env.SECRET_TOKEN as string,
				{ expiresIn: duration },
				(err, token) => {
					if (err)
						reject(
							new Errors(HttpCode.UNAUTHORIZED, Message.TOKEN_CREATION_FAILED)
						);
					else resolve(token as string);
				}
			);
		});
	}

	public async checkAuth(token: string): Promise<Member> {
		const result = (await jwt.verify(token, this.secretToken)) as Member;
		console.log(`---[AUTH] memberNick: ${result.memberNick} ---`);
		return result;
	}
}

export default AuthService;
