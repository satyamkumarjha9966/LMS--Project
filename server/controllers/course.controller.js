import Course from "../models/course.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");

    if (!courses) {
      return next(new AppError("Courses Coming Soon", 500));
    }

    res.status(200).json({
      success: true,
      message: "All Courses Details Here!",
      courses,
    });
  } catch (error) {
    return next(new AppError("There is Something Wrong, Pls Try Again", 500));
  }
};

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
      lecture: course.lectures,
    });
  } catch (error) {
    return next(new AppError("Lecture Not Found, Pls Try Again", 500));
  }
};

const createCourse = async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new AppError("All Fields Are Required", 400));
  }

  const course = await Course.create({
    title,
    description,
    category,
    createdBy,
    thumbnail: {
      public_id: "DUMMY",
      secure_url: "DUMMY",
    },
  });

  if (!course) {
    return next(
      new AppError("Course Could not be Created, Pls Try Again", 400)
    );
  }

  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 400,
        height: 400,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;

        //   // Remove File From Server/Local Device
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(new AppError("File Not Uploaded, Pls Try Again", 500));
    }
  }

  await course.save();

  res.status(200).json({
    success: true,
    message: "Course Created Successfully",
    course,
  });
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body, // Jo bhi data req.body se ayega keval usko modify karega
      },
      {
        runValidators: true,
      }
    );

    if (!course) {
      return next(new AppError("Course with given id does not Exist!", 400));
    }

    if (req.file) {
      await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);

      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          course.thumbnail.public_id = result.public_id;
          course.thumbnail.secure_url = result.secure_url;

          // Remove File From Server
          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(
          new AppError(error || "File Not Uploaded, Pls Try Again", 500)
        );
      }
    }

    res.status(200).json({
      success: true,
      message: "Course Data Updated Successfully",
      course,
    });
  } catch (error) {
    return next(new AppError("There is Some Error, Pls Try Again!", 400));
  }
};

const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Course is Not Found", 400));
    }

    await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
    });
  } catch (error) {
    return next(new AppError("There is Some Error, Pls Try Again!", 400));
  }
};

const addLectureToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return next(new AppError("All Fields Are Required", 400));
    }

    const { id } = req.params;

    if (!id) {
      return next(new AppError("Course Does Not Found With This Id", 400));
    }

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Course Does Not Found With This Id", 400));
    }

    const lectureData = {
      title,
      description,
      thumbnail: {
        public_id: "DUMMY",
        secure_url: "DUMMY",
      },
    };

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          width: 400,
          height: 400,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          lectureData.thumbnail.public_id = result.public_id;
          lectureData.thumbnail.secure_url = result.secure_url;

          // Remove File From Server/Local Device
          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(
          new AppError(error || "File Not Uploaded, Pls Try Again", 500)
        );
      }
    }

    course.lectures.push(lectureData);

    course.numbersOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture Successfully Added",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const updateLectureOfCourseById = async (req, res, next) => {
  const { id1, id2 } = req.params;

  if (!id1 || !id2) {
    return next(new AppError("Pls Select Course Id and Lecture Id", 400));
  }

  const course = await Course.findById(id1);

  if (!course) {
    return next(new AppError("Course not Found with this Id", 400));
  }

  const lecture = await Course.findByIdAndUpdate(
    id2,
    {
      $set: req.body,
    },
    {
      runValidators: true,
    }
  );

  if (!lecture) {
    return next(new AppError("Lecture not Found with this Id", 400));
  }

  res.status(200).json({
    success: true,
    message: "Lecture Data Updated Successfully",
    lecture,
  });
}; // Not Done Yet

const deleteLectureOfCourseById = async (req, res, next) => {
  try {
    // Grabbing the courseId and lectureId from req.query
    const { courseId, lectureId } = req.query;

    if (!courseId || !lectureId) {
      return next(new AppError("Pls Select Course Id and Lecture Id", 400));
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new AppError("Course not Found with this Id", 400));
    }

    const lecture = await Course.findById(lectureId);

    if (!lecture) {
      return next(new AppError("Lecture is Not Found", 400));
    }

    await Course.findByIdAndDelete(lectureId);

    res.status(200).json({
      success: true,
      message: "Lecture Deleted Successfully",
    });
  } catch (error) {
    return next(new AppError("There is Some Error, Pls Try Again!", 400));
  }
}; // Not Done Yet

export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  removeCourse,
  addLectureToCourseById,
  updateLectureOfCourseById,
  deleteLectureOfCourseById,
};
