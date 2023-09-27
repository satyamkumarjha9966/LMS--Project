import { Router } from "express";
import {
  contactFormController,
  userStats,
} from "../controllers/miscellaneous.controllers.js";

const miscellaneousRoutes = Router();

miscellaneousRoutes.post("/contact", contactFormController);

miscellaneousRoutes.get("/admin/stats/users", userStats);

export default miscellaneousRoutes;
