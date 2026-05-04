export declare enum HttpCode {
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}
export declare enum Message {
    SOMETHING_WENT_WRONG = "Something went wrong!",
    NO_DATA_FOUND = "No data is found!",
    CREATE_FAILED = "Create is failed!",
    UPDATE_FAILED = "Update is failed!",
    USED_NICK_PHONE = "You are inserting already used nick or phone!",
    TOKEN_CREATION_FAILED = "Token creation error!",
    NO_MEMBER_PHONE = "No member with that mamber phone number!",
    BLOCKED_USER = "You have been blocked, pleace contact with restaurant",
    WRONG_PASSWORD = "Wrong password, pleace try again!",
    NOT_AUTHENTICATED = "You are not authenticated, Please login first!",
    NO_REFRESH_TOKEN = "No refresh token",
    INVALID_REFRESH_TOKEN = "Invalid refresh token"
}
declare class Errors extends Error {
    code: HttpCode;
    message: Message;
    static standart: {
        code: HttpCode;
        message: Message;
    };
    constructor(statusCode: HttpCode, statusMessage: Message);
}
export default Errors;
//# sourceMappingURL=Errors.d.ts.map