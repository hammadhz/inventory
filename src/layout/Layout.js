import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div className="h-screen space-y-8 bg-tertiary-grey-50">
      <Header />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Layout;
