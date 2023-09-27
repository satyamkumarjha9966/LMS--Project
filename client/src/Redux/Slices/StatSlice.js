import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
  allUsersCount: 0,
  subscribedUsersCount: 0,
};

export const getStatsData = createAsyncThunk("/stats/get", async () => {
  try {
    const response = axiosInstance.get("/miscellaneous/admin/stats/users");
    toast.promise(response, {
      loading: "Getting the Stats....",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Load Stats Data",
    });
    return (await response).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const statSlice = createSlice({
  name: "state",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatsData.fulfilled, (state, action) => {
      state.allUsersCount = action?.payload?.allUsersCount;
      state.subscribedUsersCount = action?.payload?.subscribedUsersCount; // NOTED POINT
    });
  },
});

export default statSlice.reducer;
