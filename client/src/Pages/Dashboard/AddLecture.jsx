import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "./../../Layouts/HomeLayout";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";

function AddLecture() {
  const courseDetails = useLocation().state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    thumbnail: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;

    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function onHandleVideo(e) {
    const video = e.target.files[0];
    console.log("VIDEO >", video);

    // To Convert Video in URL|Base 64 URL
    const source = window.URL.createObjectURL(video);
    console.log(source);
    setUserInput({
      ...userInput,
      thumbnail: video,
      videoSrc: source,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!userInput.title || !userInput.description || !userInput.thumbnail) {
      toast.error("All Fields are Mandatory");
      return;
    }

    const response = await dispatch(addCourseLecture(userInput));

    if (response?.payload?.success) {
      navigate(-1);
      setUserInput({
        id: courseDetails?._id,
        thumbnail: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  }

  useEffect(() => {
    if (!courseDetails) navigate("/courses");
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex flex-col justify-center items-center mx-16 gap-10">
        <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
          <header className="flex justify-center items-center relative">
            <button
              className="absolute left-2 text-xl text-green-600"
              onClick={() => navigate(-1)}
            >
              <AiOutlineArrowLeft />
            </button>
            <h1 className="text-xl text-orange-600 font-bold">
              Add New Lecture
            </h1>
          </header>

          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              name="title"
              placeholder="Enter Title of Lecture"
              className="bg-transparent px-3 py-1 border"
              value={userInput.title}
              onChange={handleInputChange}
            />

            <textarea
              type="text"
              name="description"
              placeholder="Enter Description of Lecture"
              className="resize-none h-36 overflow-y-scroll bg-transparent px-3 py-1 border"
              value={userInput.description}
              onChange={handleInputChange}
            />

            {userInput.videoSrc ? (
              <video
                muted
                src={userInput.videoSrc}
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              ></video>
            ) : (
              <div className="h-48 border flex items-center justify-center cursor-pointer">
                <label
                  className="font-semibold text-xl cursor-pointer"
                  htmlFor="thumbnail"
                >
                  Choose Lecture Video
                </label>
                <input
                  type="file"
                  className="hidden"
                  name="thumbnail"
                  id="thumbnail"
                  onChange={onHandleVideo}
                  accept="video/mp4 video/x-mp4 video/*"
                />
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary py-2 px-2 font-semibold text-xl hover:text-white"
            >
              Add New Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AddLecture;
