import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import mainHomeImg from "../Assets/Images/mainHomeImg.jpg";

function HomePage() {
  return (
    <HomeLayout>
      <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
        <div className="w-1/2 space-y-6">
          <h1 className="text-4xl font-semibold text-black">
            Find Out Best{" "}
            <span className="text-orange-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-xl text-gray-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, sed?
            Voluptas esse similique modi voluptatem asperiores, odit cumque
            saepe rem.
          </p>
          <div className="space-x-6">
            <Link to="/courses">
              <button className="bg-orange-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-orange-600 transition-all ease-in-out duration-300">
                Explore Courses
              </button>
            </Link>

            <Link to="/contact">
              <button className="bg-orange-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-orange-600 transition-all ease-in-out duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <img src={mainHomeImg} alt="Home Page Image" />
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
