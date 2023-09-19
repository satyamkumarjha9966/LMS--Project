import { AiFillCheckCircle } from "react-icons/ai";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../../Redux/Slices/AuthSlice";

function CheckoutSuccessPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-green-500 absolute top-0 w-full p-4 text-2xl font-bold text-center text-white">
            Payment Successfull
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">Welcome To Pro Bundle</h2>
              <p>Now You Can Enjoy all the Courses</p>
            </div>
            <AiFillCheckCircle className="text-green-500 text-5xl" />
          </div>

          <Link
            to="/"
            className="bg-green-500 hover:bg-green-600 hover:text-white transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-xl font-bold text-center"
          >
            <button>Go To Dashboard</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutSuccessPage;
