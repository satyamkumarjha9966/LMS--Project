import { useNavigate } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";

function PageNotFoundPage() {
  const navigate = useNavigate();
  return (
    <HomeLayout>
      <div className="h-[90vh] w-full flex flex-col  justify-center items-center">
        <h1 className="text-9xl font-extrabold text-black">404</h1>
        <div className="text-orange-500 px-2 text-xl font-bold">
          Page Not Found ....
        </div>
        <button className="mt-5">
          <span
            onClick={() => navigate(-1)}
            className="text-lg font-bold bg-orange-500 rounded hover:bg-orange-600 px-6 py-2"
          >
            Go Back
          </span>
        </button>
      </div>
    </HomeLayout>
  );
}

export default PageNotFoundPage;
