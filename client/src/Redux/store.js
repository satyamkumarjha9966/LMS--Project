import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice";
import RazorpaySlice from "./Slices/RazorpaySlice";
import lectureSliceReducers from "./Slices/LectureSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    razorpay: RazorpaySlice,
    lecture: lectureSliceReducers,
  },
  devTools: true,
});

export default store;
