import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import AboutUsPage from "./Pages/AboutUsPage";
import PageNotFoundPage from "./Pages/PageNotFoundPage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import CourseList from "./Pages/Course/CourseList";
import ContactUsPage from "./Pages/ContactUsPage";
import DeniedPage from "./Pages/DeniedPage";
import CourseDescriptionPage from "./Pages/Course/CourseDescriptionPage";
import RequireAuth from "./Components/Auth/RequireAuth";
import CreateCourse from "./Pages/Course/CreateCourse";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUsPage />}></Route>
        <Route path="/contact" element={<ContactUsPage />}></Route>
        <Route path="/denied" element={<DeniedPage />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>

        <Route
          path="/course/description"
          element={<CourseDescriptionPage />}
        ></Route>

        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />}></Route>
        </Route>

        <Route path="*" element={<PageNotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
