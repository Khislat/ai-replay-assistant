import Errors from "../utils/Errors.js";
const errorMiddleware = (err, req, res, next) => {
    console.error("Global Errpr:", err);
    if (err instanceof Errors) {
        return res.status(err.code).json(err);
    }
    return res.status(500).json(Errors.standart);
};
export default errorMiddleware;
//# sourceMappingURL=error.middleware.js.map