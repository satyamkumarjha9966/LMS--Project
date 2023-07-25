import Course from "../models/course.model.js";
import AppError from '../utils/error.util.js';
import cloudinary from 'cloudinary';
import fs from 'fs/promises';

const getAllCourses = async (req, res, next) => {
    try {

        const courses = await Course.find({}).select('-lectures');
    
        if (!courses) {
            return next(new AppError("Courses Coming Soon", 500));
        }
    
        res.status(200).json({
            success: true,
            message: 'All Courses Details Here!',
            courses
        })
        
    } catch (error) {
        return next(new AppError("There is Something Wrong, Pls Try Again", 500));
    }
}

const getLecturesByCourseId = async (req, res, next) => {

    try {
        
        const { id } = req.params;
    
        const course = await Course.findById(id);

        if (!course) {
            return next(new AppError("Invalid Course Id, Try Other One", 400));
        }
    
        res.status(200).json({
            success: true,
            message: "Course Lecture Successfully Fetched",
            lecture: course.lectures
        })

    } catch (error) {
        return next(new AppError("Lecture Not Found, Pls Try Again", 500));
    }

}

const createCourse = async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
        return next(new AppError("All Fields Are Required", 400));
    }

    const course = await Course.create({
        title,
        description,
        category,
        createdBy
    });

    if (!course) {
        return next(new AppError("Course Could not be Created, Pls Try Again", 400));
    }
    
    if (req.file) {
        const result = cloudinary.v2.uploader.upload(req.file.path, {
            folder: "LMS"
        });

        if (result) {
            course.thumbnail.public_id = result.public_id;
            course.thumbnail.secure_url = result.secure_url;
        }

        fs.rm(`uploads/${req.file.filename}`)
    }
}

const updateCourse = async (req, res, next) => {

}

const removeCourse = async (req, res, next) => {

}

export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse
}