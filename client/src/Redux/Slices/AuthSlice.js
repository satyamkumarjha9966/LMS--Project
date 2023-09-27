import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "./../../Helpers/axiosInstance";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data:
    localStorage.getItem("data") != undefined
      ? JSON.parse(localStorage.getItem("data"))
      : {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);
    toast.promise(res, {
      loading: "Wait! Creating Your Account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Craete Account, Pls Try Again!",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/signin", data);
    toast.promise(res, {
      loading: "Wait! Authentication  in Progress....",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Login to Your Account, Pls Try Again!",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const reset = createAsyncThunk("/auth/reset", async (data) => {
  try {
    const res = axiosInstance.post("user/reset", data);
    toast.promise(res, {
      loading: "Wait! Sending Mail....",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Send Mail, Pls Try Again!",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const resetPasswordToken = createAsyncThunk(
  "/auth/reset-password",
  async (data) => {
    try {
      const res = axiosInstance.post(`user/reset-password/${data[1]}`, data[0]);
      toast.promise(res, {
        loading: "Wait! Checking Reset Token....",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to Verify Reset Token, Pls Try Again!",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const res = axiosInstance.get("user/logout");
    toast.promise(res, {
      loading: "Wait! Logout in Progress....",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Logout, Pls Try Again!",
    });

    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const updateProfile = createAsyncThunk(
  "/user/update/profile",
  async (data) => {
    try {
      const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
      toast.promise(res, {
        loading: "Wait! Profile Updation in Progress....",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed in Profile Updation, Pls Try Again!",
      });

      return (await res).data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const res = axiosInstance.get(`user/me`);
    return (await res).data;
  } catch (error) {
    toast.error(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  // From that we can define extra work on promise state of outer/extra reducer  (buildr is object)
  extraReducers: (builder) => {
    builder
      // action return an object
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        if (!action?.payload?.user) return;
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
