import type { AuthMember, LoginInput, LoginResponse, Member, MemberInput } from "../libs/types/member.js";
declare class MemberService {
    constructor();
    postSignUp(input: MemberInput): Promise<Member>;
    postLogin(input: LoginInput): Promise<LoginResponse>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(member: AuthMember): Promise<{
        success: boolean;
    }>;
}
export default MemberService;
//# sourceMappingURL=member.service.d.ts.map