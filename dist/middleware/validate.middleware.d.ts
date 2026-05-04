import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
declare const validate: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default validate;
//# sourceMappingURL=validate.middleware.d.ts.map