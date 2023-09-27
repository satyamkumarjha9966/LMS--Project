import { model, Schema } from "mongoose";

const contactFormSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      lowercase: true,
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is Required"],
    },
  },
  {
    timestamps: true,
  }
);

const contactForm = model("ContactForm", contactFormSchema);

export default contactForm;
