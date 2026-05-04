import { z } from "zod";

export const signUpSchema = z.object({
	memberNick: z.string().min(3).max(20),
	memberPhone: z.string().min(10).max(15),
	memberPassword: z.string().min(6),
});

export const loginSchema = z.object({
	memberPhone: z.string().min(10),
	memberPassword: z.string().min(6),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
