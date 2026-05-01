import { JwtPayload } from "jsonwebtoken";

declare global {
	namespace Express {
		interface Request {
			member?: {
				id: number;
				memberPhone: string;
			};
		}
	}
}
