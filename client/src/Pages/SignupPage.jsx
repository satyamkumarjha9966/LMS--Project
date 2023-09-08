import React, { useState } from "react";
import HomeLayout from "./../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createAccount } from "./../Redux/Slices/AuthSlice";

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  // Handle User Input
  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  }

  // Handle Image Input
  function getImage(e) {
    e.preventDefault();

    // Getting the image
    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  // Handle Form Submit Button
  async function createNewAccount(e) {
    e.preventDefault();

    // Validation
    if (
      !signupData.fullName ||
      !signupData.email ||
      !signupData.password ||
      !signupData.avatar
    ) {
      toast.error("Please Fill All Details!");
      return;
    }

    // Checking name fiels length
    if (signupData.fullName.length < 5) {
      toast.error("Name Should be atleast of 5 Characters");
      return;
    }

    // Email Validation
    if (
      !signupData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Invalid E-mail");
      return;
    }

    // Validating Password
    if (
      !signupData.password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
      )
    ) {
      toast.error(
        "Password should be 6-16 characters long with a number and special Character"
      );
      return;
    }

    // Storing Data in variable
    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // Dispatch Create Account Action
    const response = await dispatch(createAccount(formData));
    console.log(response);

    if (response?.payload?.success)
      // On SuccessFully Signup Navigate user to home page
      navigate("/");

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  }
  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-black w-96 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center text-2xl font-bold">Registration Page</h1>

          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                src={previewImage}
                className="w-24 h-24 rounded-full m-auto"
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            type="file"
            className="hidden"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg, .jpeg, .png, .svg"
            onChange={getImage}
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              UserName
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter Your UserName"
              className="px-2 py-1 border"
              value={signupData.fullName}
              onChange={handleUserInput}
            />
          </div>

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
              value={signupData.email}
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
              value={signupData.password}
              onChange={handleUserInput}
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-300 rounded-md py-2 font-semibold cursor-pointer text-lg m-2"
          >
            Create Account
          </button>

          <p className="font-semibold text-center">
            Already Have an Account?{" "}
            <Link to="/login" className="link text-accent cursor-pointer">
              LogIn
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default SignupPage;
