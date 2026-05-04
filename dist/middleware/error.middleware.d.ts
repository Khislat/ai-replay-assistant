import type { Request, Response, NextFunction } from "express";
declare const errorMiddleware: (err: any, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default errorMiddleware;
//# sourceMappingURL=error.middleware.d.ts.map