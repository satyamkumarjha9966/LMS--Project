import { Router } from "express";
import { register, signin, logout, getProfile, forgotPassword, resetPassword } from '../controllers/user.contollers.js';
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const userRoutes = Router();

userRoutes.post('/register', upload.single("avatar"), register);
userRoutes.post('/signin', signin);
userRoutes.get('/logout', logout);
userRoutes.get('/me', isLoggedIn, getProfile);
userRoutes.post('/reset', forgotPassword);
userRoutes.post('/reset/:resetToken', resetPassword);

export default userRoutes;