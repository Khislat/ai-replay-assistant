import type { Request, Response, NextFunction } from "express";
import Errors from "../utils/Errors.js";

const errorMiddleware = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.error("Global Errpr:", err);

	if (err instanceof Errors) {
		return res.status(err.code).json(err);
	}

	return res.status(500).json(Errors.standart);
};

export default errorMiddleware;
