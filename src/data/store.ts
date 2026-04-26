import type { Member } from "../libs/types/member.js";

export const MembersDB = new Map<string, Member>();

let memberId = 1;
export function getNextId(): number {
	return memberId++;
}
