import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
    // fetching token from cookies
    const { token } = req.cookies;

    // Cross Check | is token available in cookies or not
    if (!token) {
        return next(new AppError('Unauthenticated, Pls Login Again', 401));
    }

    // Verifying token
    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

    // Storing Data
    req.user = userDetails;

    next();
}

export {
    isLoggedIn
}