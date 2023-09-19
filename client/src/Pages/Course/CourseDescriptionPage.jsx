import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";

function CourseDescriptionPage() {
  const navigate = useNavigate();

  const locator = useLocation();
  const { state } = locator;
  //   console.log(locator);
  //   console.log(state);

  const { role, data } = useSelector((state) => state.auth);
  console.log(role, data);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-12 px-20 flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 gap-10 py-10 relative">
          <div className="space-y-5">
            <img src={state?.thumbnail?.secure_url} className="w-full h-64" />

            <div className="space-y-4">
              <div className="flex flex-col justify-center items-center text-xl">
                <p className="font-semibold">
                  <span className="text-orange-500">Total Lectures : </span>
                  {state?.numbersOfLectures}
                </p>
                <p className="font-semibold">
                  <span className="text-orange-500">Instructor : </span>
                  {state?.createdBy}
                </p>
              </div>

              {role === "ADMIN" || data?.subscription?.status === "ACTIVE" ? (
                <button className="bg-orange-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-orange-600 transition-all ease-in-out duration-300">
                  Watch Lectures
                </button>
              ) : (
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-orange-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-orange-600 transition-all ease-in-out duration-300"
                >
                  Subscribe
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2 text-xl">
            <h1 className="text-3xl font-bold mb-5 text-center text-orange-500">
              {state?.title}
            </h1>

            <p className="text-orange-600">Course Description :</p>
            <p>{state?.description}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescriptionPage;
