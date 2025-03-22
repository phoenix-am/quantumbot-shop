import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element: Element }) => {
  const token = window.localStorage.getItem("token");
  const pathname = window.location.pathname;

  if (!token && ["/products", "/checkout"].includes(pathname)) {
    return <Navigate to="/login" />;
  }
  return <Element />;
};