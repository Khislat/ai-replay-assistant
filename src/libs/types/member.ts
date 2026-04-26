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
