import ContactForm from "../models/contactForm.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";

export const contactFormController = async (req, res, next) => {
  try {
    // Getting Data from Frontend
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return next(new AppError("All Fields Are Required", 500));
    }

    // Making new Instance of contact model with user Data
    const formData = await ContactForm({ name, email, message });

    // Saving Data
    await formData.save();

    // Sending Response
    res.status(200).send({
      success: true,
      message: "Contact Form Successfully Submitted",
      formData,
    });
  } catch (error) {
    console.log("Some Problem Come in Sending Data", error);
  }
};

//  @USER_STATS_ADMIN
//  @ROUTE @GET {{URL}}/api/v1/admin/stats/users
//  @ACCESS Private(ADMIN ONLY)

export const userStats = async (req, res, next) => {
  const allUsersCount = await User.countDocuments();

  const subscribedUsersCount = await User.countDocuments({
    "subscription.status": "active", // subscription.status means we are going inside an object and we have to put this in quotes
  });

  res.status(200).json({
    success: true,
    message: "All registered users count",
    allUsersCount,
    subscribedUsersCount,
  });
};
