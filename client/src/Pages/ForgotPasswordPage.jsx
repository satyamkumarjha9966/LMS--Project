import React, { useState } from "react";
import HomeLayout from "./../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { reset } from "./../Redux/Slices/AuthSlice";

function ForgotPasswordPage() {
  const dispatch = useDispatch();

  const [resetData, setResetData] = useState({
    email: "",
  });

  // Handle User Input
  function handleUserInput(e) {
    const { name, value } = e.target;
    setResetData({ ...resetData, [name]: value });
  }

  // Handle Form Submit Button
  async function onLogin(e) {
    e.preventDefault();

    // Validation
    if (!resetData.email) {
      toast.error("Please Fill All Details!");
      return;
    }

    // Dispatch Account Login Action
    const response = await dispatch(reset(resetData));

    if (response?.payload?.success)
      // On SuccessFully Signup Navigate user to home page
      toast.success("Please Check Your Mail For Reset Password");

    setResetData({
      email: "",
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
            Forgot Password Page
          </h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              E-mail
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter Your E-mail"
              className="px-2 py-1 border"
              value={resetData.email}
              onChange={handleUserInput}
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-300 rounded-md py-2 font-semibold cursor-pointer text-lg m-2"
          >
            Reset Password
          </button>

          <p className="font-semibold text-center">
            Do Not Have an Account?{" "}
            <Link to="/signup" className="link text-accent cursor-pointer">
              Sign Up
            </Link>
          </p>

          <p className="font-semibold text-center">
            Have an Account?{" "}
            <Link to="/login" className="link text-accent cursor-pointer">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ForgotPasswordPage;
