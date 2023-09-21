import { useEffect, useState } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [currentVideo, setCurrentVideo] = useState(0);

  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  async function onLectureDelete(courseId, lectureId) {
    console.log(courseId, lectureId);
    await dispatch(
      deleteCourseLecture({ courseId: courseId, lectureId: lectureId })
    );
    await dispatch(getCourseLecture(courseId));
  }

  useEffect(() => {
    console.log(state);
    if (!state) navigate("/courses");
    dispatch(getCourseLecture(state._id));
  }, []);
  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-9 mx-5">
        <div className="text-center text-2xl font-bold text-black">
          Course Name : <span className="text-orange-600">{state?.title}</span>
        </div>

        {lectures && lectures.length > 0 && (
          <div className="flex justify-center gap-10 w-full">
            {/* Left section for playing video and displaying course detail to admin */}
            <div className="space-y-5 w-[30rem] p-2 rounded-lg shadow-[0_0_10px_black]">
              <video
                src={lectures && lectures[currentVideo]?.thumbnail?.secure_url}
                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              ></video>
              <div>
                <h1 className="text-black font-bold">
                  Lecture Title :{"  "} <br />
                  <span className="text-orange-600 font-semibold">
                    {lectures && lectures[currentVideo]?.title}
                  </span>
                </h1>
                <hr className="m-2" />
                <h2 className="text-black font-bold">
                  Lecture Description :{"  "}
                  <span className="font-semibold text-orange-600 line-clamp-4">
                    {lectures && lectures[currentVideo]?.description}
                  </span>
                </h2>
              </div>
            </div>

            {/* Right section for displaying list of lecture*/}
            <div>
              <ul className="w-[28rem] p-4 rounded-lg shadow-[0_0_10px_black] space-y-2">
                <li className="font-semibold text-xl text-orange-600 flex items-center justify-between">
                  <p>Lectures List</p>
                  {role === "ADMIN" && (
                    <button
                      onClick={() =>
                        navigate("/course/addlecture", { state: { ...state } })
                      }
                      className="btn-primary px-3 py-2 rounded-md font-semibold"
                    >
                      Add New Lecture
                    </button>
                  )}
                </li>
                {lectures &&
                  lectures.map((lecture, idx) => {
                    return (
                      <li className="space-y-2" key={lecture._id}>
                        <p
                          className="cursor-pointer"
                          onClick={() => setCurrentVideo(idx)}
                        >
                          <span> Lecture {idx + 1} : </span>
                          {lecture?.title}
                        </p>
                        {role === "ADMIN" && (
                          <button
                            onClick={() =>
                              onLectureDelete(state?._id, lecture?._id)
                            }
                            className="btn-secondary px-3 py-2 rounded-md font-semibold"
                          >
                            Delete Lecture
                          </button>
                        )}
                        <hr className="m-2" />
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        )}

        {lectures.length < 1 && (
          <div>
            <h1 className="text-4xl font-bold text-orange-500">
              Lecture Not Uploaded Yet!
            </h1>

            {role === "ADMIN" && (
              <button
                onClick={() =>
                  navigate("/course/addlecture", { state: { ...state } })
                }
                className="btn-primary text-xl rounded-md font-bold px-2 py-2 w-full transition-all ease-in-out duration-300 mt-8 hover:text-white"
              >
                Add New Lecture
              </button>
            )}

            <button
              onClick={() => navigate(-1)}
              className="bg-orange-500 text-xl rounded-md font-bold px-2 py-2 w-full hover:bg-orange-600 transition-all ease-in-out duration-300 mt-8 hover:text-white"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default DisplayLectures;
