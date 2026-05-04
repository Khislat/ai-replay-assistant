import Errors from "../utils/Errors.js";
import MemberService from "../services/member.service.js";
const memberController = {};
const memberService = new MemberService();
memberController.postSignUp = async (req, res, next) => {
    try {
        const input = req.body;
        const result = await memberService.postSignUp(input);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
memberController.postLogin = async (req, res) => {
    try {
        const input = req.body;
        const result = await memberService.postLogin(input);
        res.json(result);
    }
    catch (error) {
        console.log("Error Login:", error);
        if (error instanceof Errors)
            res.status(error.code).json(error);
        else
            res.status(Errors.standart.code).json(Errors.standart);
    }
};
memberController.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const result = await memberService.refreshToken(refreshToken);
        return res.json(result);
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }
};
memberController.logout = async (req, res) => {
    try {
        const member = req.member;
        if (!member) {
            return res.status(401).json({
                message: "Not authenticated",
            });
        }
        const result = await memberService.logout(member);
        return res.json({
            message: "Logged out successfullbu y",
            data: result,
        });
    }
    catch (err) {
        return res.status(err.statusCode || 500).json({
            message: err.message || "Logout error",
        });
    }
};
export default memberController;
//# sourceMappingURL=member.controller.js.map