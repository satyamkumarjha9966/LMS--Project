import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

function UserProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);

  async function handleCancellation() {
    toast.info("Initiating Cancellation");
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success("Cancellation Completed");
    navigate("/");
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center p-4">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            className="w-40 h-40 m-auto rounded-full border border-black"
            alt="User Profle"
          />

          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>

          <div className="grid grid-cols-2">
            <p className="font-semibold">Email: </p>
            <p className="font-bold">{userData?.email}</p>

            <p className="font-semibold">Role: </p>
            <p className="font-bold">{userData?.role}</p>

            <p className="font-semibold">Subscription: </p>
            <p className="font-bold">
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Link
              to="/changepassword"
              className="w-1/2 bg-orange-500 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-300 cursor-pointer rounded-lg font-bold py-2 text-center px-1"
            >
              <button>Change Password</button>
            </Link>
            <Link
              to="/user/editprofile"
              className="w-1/2 bg-orange-500 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-300 cursor-pointer rounded-lg font-bold py-2 px-1 text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>
          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancellation}
              className="w-full bg-red-500 hover:bg-red-600 hover:text-white transition-all ease-in-out duration-300 cursor-pointer rounded-lg font-bold py-2 text-center"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default UserProfilePage;
