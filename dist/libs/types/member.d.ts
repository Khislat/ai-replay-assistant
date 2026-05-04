export interface MemberInput {
    memberNick: string;
    memberPhone: string;
    memberPassword: string;
}
export interface LoginInput {
    memberPhone: string;
    memberPassword: string;
}
export interface Member {
    id: number;
    memberNick: string;
    memberPhone: string;
    memberPassword?: string;
}
export interface LoginResponse {
    member: Omit<Member, "memberPassword">;
    accessToken: string;
    refreshToken: string;
}
export interface ExstendedRequest extends Request {
    member: {
        id: number;
        memberPhone: string;
    };
}
export interface AuthMember {
    id: number;
    memberPhone: string;
}
export interface AuthRequest extends Request {
    member?: AuthMember;
}
//# sourceMappingURL=member.d.ts.map