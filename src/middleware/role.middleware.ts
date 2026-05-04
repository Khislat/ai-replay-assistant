import type { MemberRole } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";


const requireRole = (role: MemberRole) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const member = req.member;

		if (!member) {
			return res.status(400).json({ message: "Not authenticated" });
		}

		if (member.role !== role) {
			return res.status(403).json({ message: "Access denied" });
		}

		next();
	};
};

export default requireRole;
