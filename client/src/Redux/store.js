import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import courseSliceReducer from "./Slices/CourseSlice";
import RazorpaySlice from "./Slices/RazorpaySlice";
import lectureSliceReducers from "./Slices/LectureSlice";
import statSliceReducers from "./Slices/StatSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    course: courseSliceReducer,
    razorpay: RazorpaySlice,
    lecture: lectureSliceReducers,
    stat: statSliceReducers,
  },
  devTools: true,
});

export default store;
