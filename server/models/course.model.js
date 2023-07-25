import { model, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
      minLength: [8, "Title must be atleast 8 Characters"],
      maxLength: [59, "Title should be less than 60 Characters"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Description is Required"],
      minLength: [8, "Description must be atleast 8 Characters"],
      maxLength: [200, "Description should be less than 200 Characters"]
    },
    category: {
      type: String,
      required: [true, "Category is Required"],
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    lectures: [
      {
        title: {
          type: String,
          required: [true, "Title is Required"],
          minLength: [8, "Title must be atleast 8 Characters"],
          maxLength: [59, "Title should be less than 60 Characters"],
          trim: true,
        },
        description: {
          type: String,
          required: [true, "Description is Required"],
          minLength: [8, "Description must be atleast 8 Characters"],
          maxLength: [200, "Description should be less than 200 Characters"]
        },
        thumbnail: {
          public_id: {
            type: String,
          },
          secure_url: {
            type: String,
          },
        },
      },
    ],
    numbersOfLectures: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = model("Course", courseSchema);

export default Course;
