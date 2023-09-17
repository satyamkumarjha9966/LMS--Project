import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    createdBy: "",
    thumbnail: null,
    previewImage: "",
  });

  function handleImageUpload(e) {
    e.preventDefault();

    const uploadedImage = e.target.files[0];
    console.log("Uploaded Image >>", uploadedImage);

    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadedImage,
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;

    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast.error("All Fields Are Mandatory");
      return;
    }

    const response = await dispatch(createNewCourse(userInput));

    if (response?.payload?.success) {
      setUserInput({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
        previewImage: "",
      });
    }

    navigate("/courses");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center items-center gap-5 rounded-lg p-4 w-[700px] my-10 shadow-[0_0_10px_black] relative"
        >
          <Link className="absolute left-5 top-6 text-2xl link text-accent cursor-pointer font-extrabold">
            <AiOutlineArrowLeft />
          </Link>

          <h1 className="text-center text-2xl font-bold">Create New Course</h1>

          <main className="grid grid-cols-2 gap-x-10">
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput?.previewImage ? (
                    <img
                      src={userInput?.previewImage}
                      className="w-full h-44 m-auto border"
                    />
                  ) : (
                    <div className="w-full p-4 h-44 m-auto flex justify-center items-center border">
                      <h1 className="font-bold text-lg">
                        Upload Your Course Thumbnail
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  className="hidden"
                  type="file"
                  name="image_uploads"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  //   value={userInput.previewImage}
                  onChange={handleImageUpload}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-lg font-semibold">
                  Course Title
                </label>
                <input
                  type="text"
                  required
                  name="title"
                  id="title"
                  className="bg-transparent px-2 py-1 border"
                  placeholder="Enter Course Title"
                  value={userInput.title}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label htmlFor="createdBy" className="text-lg font-semibold">
                  Course Instructor
                </label>
                <input
                  type="text"
                  required
                  name="createdBy"
                  id="createdBy"
                  className="bg-transparent px-2 py-1 border"
                  placeholder="Enter Course Instructor"
                  value={userInput.createdBy}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="text-lg font-semibold">
                  Course Category
                </label>
                <input
                  type="text"
                  required
                  name="category"
                  id="category"
                  className="bg-transparent px-2 py-1 border"
                  placeholder="Enter Course Category"
                  value={userInput.category}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-lg font-semibold">
                  Course Description
                </label>
                <textarea
                  type="text"
                  required
                  name="description"
                  id="description"
                  className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                  placeholder="Enter Course Description"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          <button
            type="submit"
            className="w-full rounded text-lg bg-orange-500 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-300 font-bold px-5 py-3"
            onSubmit={onFormSubmit}
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
