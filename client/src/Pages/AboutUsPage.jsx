import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImg from "../Assets/Images/aboutMainImg.png";
import mg from "../Assets/Images/mg.jpg";
import em from "../Assets/Images/em.jpg";
import nm from "../Assets/Images/nm.jpg";
import sv from "../Assets/Images/sv.jpg";
import r from "../Assets/Images/r.jpg";

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
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-2">
              <img
                src={nm}
                className="w-[450px] h-[450px] rounded-full border-2 border-black"
              />
              <p className="text-xl text-gray-500 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quae
                laboriosam adipisci.
              </p>
              <h3 className="text-2xl font-semibold text-black">
                Nalson Mandela
              </h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide5" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-2">
              <img
                src={sv}
                className="w-[450px] h-[450px] rounded-full border-2 border-black"
              />
              <p className="text-xl text-gray-500 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quae
                laboriosam adipisci.
              </p>
              <h3 className="text-2xl font-semibold text-black">
                Swami Vivekanand
              </h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-2">
              <img
                src={r}
                className="w-[450px] h-[450px] rounded-full border-2 border-black"
              />
              <p className="text-xl text-gray-500 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quae
                laboriosam adipisci.
              </p>
              <h3 className="text-2xl font-semibold text-black">Random</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-2">
              <img
                src={mg}
                className="w-[450px] h-[450px] rounded-full border-2 border-black"
              />
              <p className="text-xl text-gray-500 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quae
                laboriosam adipisci.
              </p>
              <h3 className="text-2xl font-semibold text-black">
                Mahatma Gandhi
              </h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide5" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          <div id="slide5" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-2">
              <img
                src={em}
                className="w-[450px] h-[450px] rounded-full border-2 border-black"
              />
              <p className="text-xl text-gray-500 text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quae
                laboriosam adipisci.
              </p>
              <h3 className="text-2xl font-semibold text-black">Elon Mask</h3>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUsPage;
