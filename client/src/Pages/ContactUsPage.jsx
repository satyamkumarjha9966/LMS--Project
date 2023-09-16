import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { toast } from "react-hot-toast";
import { isEmail } from "../Helpers/ragexMatcher";
import axiosInstance from "../Helpers/axiosInstance";

function ContactUsPage() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      toast.error("All Fields Are Requireds");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid Email");
      return;
    }

    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting Your Message....",
        success: "Message Submitted Successfully",
        error: "Failed To Submit The Message, Pls Try Again",
      });
      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Operation Failed");
    }
  }
  return (
    <HomeLayout>
      <div className="flex h-[100vh] items-center justify-center">
        <form
          onSubmit={onFormSubmit}
          noValidate
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-md shadow-[0_0_10px_black] w-[22rem]"
        >
          <h1 className="text-3xl font-semibold">Contact Form</h1>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              type="text"
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="name"
              placeholder="Enter Your Name"
              name="name"
              value={userInput.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">
              E-mail
            </label>
            <input
              type="email"
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="email"
              placeholder="Enter Your E-mail"
              name="email"
              value={userInput.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent border px-2 py-1 rounded-sm resize-none h-40"
              id="message"
              placeholder="Enter Your Message"
              name="message"
              value={userInput.message}
              onChange={handleInputChange}
            />
          </div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 transition-all ease-in-out duration-300 rounded font-bold p-1 hover:text-white">
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ContactUsPage;
