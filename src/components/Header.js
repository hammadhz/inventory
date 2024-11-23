import React from "react";
import logout from "../assets/svgs/logout.svg";
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("items");
    navigate("/");
  };

  return (
    <header className="w-full lg:px-11 md:px-11 px-4 py-4 bg-primary flex justify-between items-center">
      <h1 className="font-medium font-poppins text-base leading-5 text-white">
        InVentory
      </h1>
      <ReactSVG src={logout} onClick={handleLogout} />
    </header>
  );
};

export default Header;
