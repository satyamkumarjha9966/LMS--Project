import React, { useState } from "react";
import HomeLayout from "./../Layouts/HomeLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { resetPasswordToken } from "./../Redux/Slices/AuthSlice";

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const [resetPassword, setResetPassword] = useState({
    password: "",
  });

  // Handle User Input
  function handleUserInput(e) {
    const { name, value } = e.target;
    setResetPassword({ ...resetPassword, [name]: value });
  }

  // Handle Form Submit Button
  async function onLogin(e) {
    e.preventDefault();

    // Validation
    if (!resetPassword.password) {
      toast.error("Please Fill All Details!");
      return;
    }

    // Dispatch Account Login Action
    const response = await dispatch(
      resetPasswordToken([resetPassword, resetToken])
    );

    if (response?.payload?.success)
      // On SuccessFully Signup Navigate user to home page
      navigate("/login");

    setResetPassword({
      password: "",
    });
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">
            Password Reset Page
          </h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter Your New Password"
              className="px-2 py-1 border"
              value={resetPassword.password}
              onChange={handleUserInput}
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-300 rounded-md py-2 font-semibold cursor-pointer text-lg m-2"
          >
            Change Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ResetPasswordPage;
