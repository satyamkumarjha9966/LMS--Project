import { Router } from 'express';
import { getAllCourses, getLecturesByCourseId, createCourse, updateCourse, removeCourse } from '../controllers/course.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from "../middlewares/multer.middleware.js";

const courseRouter = Router();

courseRouter.route('/')            // From this we can made multiple types of request once
    .get(getAllCourses)
    .post(
        upload.single("thumbnail"),      // From this we can get data in req.body although we send data in form data and content-type is multipart/form-data
        createCourse
        );

courseRouter.route('/:id')
    .get(isLoggedIn, getLecturesByCourseId)
    .put(updateCourse)
    .delete(removeCourse);

export default courseRouter;