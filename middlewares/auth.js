import helpers from "../utils/helpers.js";
import createError from "http-errors";

export default async (req, res, next) => {
    let token = req.headers.authorization || null;

    if (!token) {
        return next(createError(401, "Token not found"));
    }

    token = token.replace("Bearer ", "");

    try {
        const decoded = await helpers.verifyToken(token);

        req.userId = decoded.userId;
        next();
    } catch (err) {
        return next(err);

    }
};
