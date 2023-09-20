import { Router } from "express";
import {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureToCourseById,
  updateLectureOfCourseById,
  deleteLectureOfCourseById,
} from "../controllers/course.controller.js";
import {
  authorizeSubscriber,
  authorizedRoles,
  isLoggedIn,
} from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const courseRouter = Router();

courseRouter
  .route("/") // From this we can made multiple types of request once
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"), // From this we can get data in req.body although we send data in form data and content-type is multipart/form-data
    createCourse
  )
  .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteLectureOfCourseById);

courseRouter
  .route("/:id")
  .get(isLoggedIn, authorizeSubscriber, getLecturesByCourseId)
  .put(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    updateCourse
  )
  .delete(isLoggedIn, authorizedRoles("ADMIN"), removeCourse)
  .post(
    isLoggedIn,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    addLectureToCourseById
  );

// courseRouter
//   .route("/:id1/:id2")
//   .put(isLoggedIn, authorizedRoles("ADMIN"), updateLectureOfCourseById)
//   .delete(isLoggedIn, authorizedRoles("ADMIN"), deleteLectureOfCourseById);

export default courseRouter;
