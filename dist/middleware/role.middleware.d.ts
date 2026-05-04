import type { MemberRole } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
declare const requireRole: (role: MemberRole) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default requireRole;
//# sourceMappingURL=role.middleware.d.ts.map