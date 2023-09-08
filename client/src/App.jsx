import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import AboutUsPage from "./Pages/AboutUsPage";
import PageNotFoundPage from "./Pages/PageNotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUsPage />}></Route>

        <Route path="*" element={<PageNotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
