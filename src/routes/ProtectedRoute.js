import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const data = localStorage.getItem("isLogin");
  return data ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;
