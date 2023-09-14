import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // For Checking If User Is Logged In
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  // For Displaying The Option According To Role
  const role = useSelector((state) => state?.auth?.role);

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";
  }

  async function handleLogout(e) {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success) {
      navigate("/");
    }
  }

  return (
    <>
      <div className="min-h-[90vh]">
        <div className="drawer absolute left-0 z-50 w-fit">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="cursor-pointer relative">
              <FiMenu
                size={"32px"}
                className="font-bold text-black m-4"
                onClick={changeWidth}
              />
            </label>
          </div>
          <div className="drawer-side w-0">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 sm:w-80 w-48 min-h-full bg-base-300 text-base-content relative">
              <li className="w-fit absolute right-2 z-50">
                <button onClick={hideDrawer}>
                  <AiFillCloseCircle size={24} />
                </button>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              {isLoggedIn && role == "ADMIN" && (
                <li>
                  <Link to="/admin/dashboard">Admin DashBoard</Link>
                </li>
              )}
              <li>
                <Link to="/courses">All Courses</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              {!isLoggedIn && (
                <li className="absolute bottom-8 w-[90%]">
                  <div className="w-full flex items-center justify-center">
                    <button className="btn-primary px-4 py-2 font-bold rounded-md w-full">
                      <Link to="/login">LogIn</Link>
                    </button>

                    <button className="btn-success px-4 py-2 font-bold rounded-md w-full">
                      <Link to="/signup">SignUp</Link>
                    </button>
                  </div>
                </li>
              )}

              {isLoggedIn && (
                <li className="absolute bottom-8 w-[90%]">
                  <div className="w-full flex items-center justify-center">
                    <button className="btn-primary px-4 py-2 font-bold rounded-md w-full">
                      <Link to="/user/profile">Profile</Link>
                    </button>

                    <button className="btn-success px-4 py-2 font-bold rounded-md w-full">
                      <Link onClick={handleLogout}>LogOut</Link>
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>

        {children}

        <Footer />
      </div>
    </>
  );
}

export default HomeLayout;
