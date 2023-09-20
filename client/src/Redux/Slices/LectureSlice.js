import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  lectures: [],
};

export const getCourseLecture = createAsyncThunk(
  "/course/lecture/get",
  async (cid) => {
    try {
      const response = axiosInstance.get(`/courses/${cid}`);
      toast.promise(response, {
        loading: "Fetching Course Lectures",
        success: "Lectures Fetched Successfully",
        error: "Failed to Load the Lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const addCourseLecture = createAsyncThunk(
  "/course/lecture/add",
  async (data) => {
    try {
      const formData = new FormData();
      formData.append("lecture", data.lecture);
      formData.append("title", data.title);
      formData.append("description", data.description);

      const response = axiosInstance.post(`/courses/${data.id}`, formData);
      toast.promise(response, {
        loading: "Adding Course Lectures",
        success: "Lectures Added Successfully",
        error: "Failed to Add the Lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const deleteCourseLecture = createAsyncThunk(
  "/course/lecture/delete",
  async (data) => {
    try {
      const response = axiosInstance.delete(
        `/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`
      );
      toast.promise(response, {
        loading: "Deleting Course Lectures",
        success: "Lectures Deleted Successfully",
        error: "Failed to Delete the Lectures",
      });
      return (await response).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseLecture.fulfilled, (state, action) => {
        console.log(action);
        state.lectures = action?.payload?.lecture; // note
      })
      .addCase(addCourseLecture.fulfilled, (state, action) => {
        console.log(action);
        state.lectures = action?.payload?.course?.lecture; // note
      });
  },
});

export default lectureSlice.reducer;
