export var HttpCode;
(function (HttpCode) {
    HttpCode[HttpCode["OK"] = 200] = "OK";
    HttpCode[HttpCode["CREATED"] = 201] = "CREATED";
    HttpCode[HttpCode["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    HttpCode[HttpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpCode[HttpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpCode[HttpCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpCode[HttpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpCode[HttpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(HttpCode || (HttpCode = {}));
export var Message;
(function (Message) {
    Message["SOMETHING_WENT_WRONG"] = "Something went wrong!";
    Message["NO_DATA_FOUND"] = "No data is found!";
    Message["CREATE_FAILED"] = "Create is failed!";
    Message["UPDATE_FAILED"] = "Update is failed!";
    Message["USED_NICK_PHONE"] = "You are inserting already used nick or phone!";
    Message["TOKEN_CREATION_FAILED"] = "Token creation error!";
    Message["NO_MEMBER_PHONE"] = "No member with that mamber phone number!";
    Message["BLOCKED_USER"] = "You have been blocked, pleace contact with restaurant";
    Message["WRONG_PASSWORD"] = "Wrong password, pleace try again!";
    Message["NOT_AUTHENTICATED"] = "You are not authenticated, Please login first!";
    Message["NO_REFRESH_TOKEN"] = "No refresh token";
    Message["INVALID_REFRESH_TOKEN"] = "Invalid refresh token";
})(Message || (Message = {}));
class Errors extends Error {
    // Bu yerdagi errors classi Javascriptning (buil-in) Error classidan extends olyapti yani bu Inheritance (Vorislik)
    code; // Bu yerda HttpCode enumidan code ni olishimiz mumkin
    message; // Bu yerda Message enumidan message ni olishimiz mumkin
    static standart = {
        code: HttpCode.INTERNAL_SERVER_ERROR,
        message: Message.SOMETHING_WENT_WRONG,
    };
    constructor(statusCode, statusMessage) {
        super();
        this.code = statusCode;
        this.message = statusMessage;
    }
}
export default Errors;
//# sourceMappingURL=Errors.js.map