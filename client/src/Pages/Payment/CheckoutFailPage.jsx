import { AiFillCloseCircle } from "react-icons/ai";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function CheckoutFailPage() {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-red-500 absolute top-0 w-full p-4 text-2xl font-bold text-center text-white">
            Payment Failed
          </h1>

          <div className="px-4 flex flex-col items-center justify-center space-y-2">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">
                Oops! Your Payment Failed
              </h2>
              <p>Please Try Again Later</p>
            </div>
            <AiFillCloseCircle className="text-red-500 text-5xl" />
          </div>

          <Link
            to="/checkout"
            className="bg-red-500 hover:bg-red-600 hover:text-white transition-all ease-in-out duration-300 absolute bottom-0 w-full py-2 text-xl font-bold text-center"
          >
            <button>Try Again</button>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutFailPage;
