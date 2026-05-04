import { JwtPayload } from "jsonwebtoken";

import { AuthMember } from "./types";

declare global {
	namespace Express {
		interface Request {
			member?: AuthMember;
		}
	}
}
