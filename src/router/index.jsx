import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import DefaultPage from "../components/RouterComponents/DefaultPage";
import PrivateRoute from "../components/RouterComponents/PrivateRoute";
import Products from "../pages/Products/CreateNewProduct";
import ListProducts from "../pages/Products/ListProducts";
import CreateNewProduct from "../pages/Products/CreateNewProduct";
import EditProduct from "../pages/Products/EditProduct";
import CreateNewClient from "../pages/Clients/CreateNewClient";
import ListSales from "../pages/Financial/ListSales";

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
              <ListProducts />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/create"
          element={
            <PrivateRoute>
              <CreateNewProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/edit/:uuid"
          element={
            <PrivateRoute>
              <EditProduct />
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
          path="/clients/create"
          element={
            <PrivateRoute>
              <CreateNewClient />
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
              <ListSales />
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
