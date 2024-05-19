import { Routes, Route } from "react-router-dom";
import DefaultPage from "./components/DefaultPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<Signup />} /> */}

      <Route path="/" element={<DefaultPage />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
