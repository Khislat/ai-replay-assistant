declare class AuthService {
    veritfyToken(token: string): Promise<{
        id: number;
        memberPhone: string;
        memberNick: string;
        memberPassword: string;
        refreshToken: string | null;
        role: import(".prisma/client").$Enums.MemberRole;
    }>;
}
export default AuthService;
//# sourceMappingURL=auth.service.d.ts.map