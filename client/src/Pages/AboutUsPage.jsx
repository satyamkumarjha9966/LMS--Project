import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImg from "../Assets/Images/aboutMainImg.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "./../Constant/CelebratyData";

function AboutUsPage() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-black">
        <div className="flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl text-orange-500 font-bold">
              Affordable And Quality Education
            </h1>
            <p className="text-xl text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat
              libero ut corrupti molestias reprehenderit qui minima iste
              consectetur vel. Hic?
            </p>
          </section>

          <div className="w-1/2">
            <img
              src={aboutMainImg}
              alt="About Main Image"
              id="test"
              className="drop-shadow-2xl"
              style={{ filter: "drop-shadow(0px 10px 10px rgb(0, 0, 0))" }}
            />
          </div>
        </div>
        <div className="carousel w-1/2 my-16 m-auto">
          {celebrities &&
            celebrities.map((celebrity) => (
              <CarouselSlide
                {...celebrity}
                key={celebrity.slideNumber}
                totalSlides={celebrities.length}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUsPage;
