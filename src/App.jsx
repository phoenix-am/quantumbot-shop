import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes } from "react-router";
import ProductsList from "./components/ProductsList";
import { ProtectedRoute } from "./utils/guard";
import AppLayout from "./components/AppLayout";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProtectedRoute element={ProductsList} />} />
        <Route path="/checkout" element={<ProtectedRoute element={Checkout} />} />
        </Route>
    </Routes>
  );
}

export default App;
