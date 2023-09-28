import React, { useState } from "react";
import HomeLayout from "./../Layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { changePassword, getUserData } from "./../Redux/Slices/AuthSlice";

function ChangePasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  // Handle User Input
  function handleUserInput(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  // Handle Form Submit Button
  async function onLogin(e) {
    e.preventDefault();

    // Validation
    if (!data.oldPassword || !data.newPassword) {
      toast.error("Please Fill All Details!");
      return;
    }

    // Dispatch Change Password Action
    const response = await dispatch(changePassword(data));

    if (response?.payload?.success) navigate(-1);
    toast.success("Password Successfully Changed");

    setData({
      oldPassword: "",
      newPassword: "",
    });
  }
  return (
    <HomeLayout>
      <div className="flex flex-col items-center gap-5 justify-center h-[90vh]">
        <form
          noValidate
          onSubmit={onLogin}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">
            Password Change Page
          </h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="oldPassword" className="font-semibold">
              Old Password
            </label>
            <input
              type="password"
              required
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter Your Old Password"
              className="px-2 py-1 border"
              value={data.oldPassword}
              onChange={handleUserInput}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="newPassword" className="font-semibold">
              New Password
            </label>
            <input
              type="password"
              required
              name="newPassword"
              id="newPassword"
              placeholder="Enter Your New Password"
              className="px-2 py-1 border"
              value={data.newPassword}
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
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-300 rounded-md py-2 font-semibold cursor-pointer text-lg w-52"
        >
          Go Back
        </button>
      </div>
    </HomeLayout>
  );
}

export default ChangePasswordPage;
