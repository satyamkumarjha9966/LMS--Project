import React, { useState } from "react";
import HomeLayout from "./../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "./../Redux/Slices/AuthSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Handle User Input
  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }

  // Handle Form Submit Button
  async function onLogin(e) {
    e.preventDefault();

    // Validation
    if (!loginData.email || !loginData.password) {
      toast.error("Please Fill All Details!");
      return;
    }

    // Dispatch Account Login Action
    const response = await dispatch(login(loginData));
    console.log(response);

    if (response?.payload?.success)
      // On SuccessFully Signup Navigate user to home page
      navigate("/");

    setLoginData({
      email: "",
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
          <h1 className="text-center text-2xl font-bold">Login Page</h1>

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
              value={loginData.email}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter Your Password"
              className="px-2 py-1 border"
              value={loginData.password}
              onChange={handleUserInput}
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-300 rounded-md py-2 font-semibold cursor-pointer text-lg m-2"
          >
            Login
          </button>

          <p className="font-semibold text-center">
            Do Not Have an Account?{" "}
            <Link to="/signup" className="link text-accent cursor-pointer">
              LogIn
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default LoginPage;
