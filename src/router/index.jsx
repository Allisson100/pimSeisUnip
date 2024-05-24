import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import DefaultPage from "../components/RouterComponents/DefaultPage";
import PrivateRoute from "../components/RouterComponents/PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="/signup" element={<Signup />} /> */}

      <Route path="/" element={<DefaultPage />}>
        <Route
          index
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/financial"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/adm"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
