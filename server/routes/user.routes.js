import { Router } from "express";
import {
  register,
  signin,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser,
} from "../controllers/user.contollers.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const userRoutes = Router();

userRoutes.post("/register", upload.single("avatar"), register);
userRoutes.post("/signin", signin);
userRoutes.get("/logout", logout);
userRoutes.get("/me", isLoggedIn, getProfile);
userRoutes.post("/reset", forgotPassword);
userRoutes.post("/reset/:resetToken", resetPassword);
userRoutes.post("/change-password", isLoggedIn, changePassword);
userRoutes.put("/update/:id", isLoggedIn, upload.single("avatar"), updateUser);

export default userRoutes;
