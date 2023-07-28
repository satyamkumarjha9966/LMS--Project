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

const authorizedRoles = (...roles) => async (req, res, next) => {
    const currentUserRole = req.user.role;

    if (!roles.includes(currentUserRole)) {
        return next(new AppError('You are not Authorized to Access this Route!', 403));
    }

    next();
};

const authorizeSubscriber = async (req, res, next) => {
    const subscription = req.user.subscription;
    const currentUserRole = req.user.role;

    if (currentUserRole !== 'ADMIN' && subscription.status !== 'active') {
        return next(new AppError('Pls Subscribe to access this Route!', 403));
    }

    next();
}

export {
    isLoggedIn,
    authorizedRoles,
    authorizeSubscriber
}