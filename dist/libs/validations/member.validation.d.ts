import { z } from "zod";
export declare const signUpSchema: z.ZodObject<{
    memberNick: z.ZodString;
    memberPhone: z.ZodString;
    memberPassword: z.ZodString;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    memberPhone: z.ZodString;
    memberPassword: z.ZodString;
}, z.core.$strip>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
//# sourceMappingURL=member.validation.d.ts.map