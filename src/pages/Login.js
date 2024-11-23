import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import logo from "../assets/svgs/logo.svg";
import eye from "../assets/svgs/eye.svg";
import eyeslash from "../assets/svgs/eyeslash.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { loginSchema } from "../utils/validations";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassowrd, setPassowrd] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const handleShowPassword = () => {
    setPassowrd(!showPassowrd);
  };

  const login = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `/api/Login/SAP_Technician_Login?UserName=${data.username}&Password=${data.password}`
      );
      if (response.data.code === 200) {
        localStorage.setItem("isLogin", true);
        setLoading(false);
        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/dashboard");
      } else {
        setLoading(false);
        toast.error(response.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="h-screen lg:bg-white md:bg-white sm:bg-tertiary-grey-50  w-full flex justify-center items-center">
      <div className="lg:w-96 md:w-96 w-full lg:h-[420px] md:h-[420px] h-full  bg-tertiary-grey-50 lg:rounded-xl md:rounded-xl  lg:border border-white md:border border-none lg:shadow-new md:shadow-new py-8  lg:px-12 md:px-12 px-6 lg:block md:block flex justify-center items-center">
        <div className="space-y-8 w-full">
          <div className="flex flex-col gap-3 items-center text-center">
            <ReactSVG src={logo} className="" />
            <div className="space-y-1">
              <h1 className="font-medium leading-8 text-2xl text-tertiary-grey-700 font-poppins">
                Welcome back
              </h1>
              <p className="font-poppins font-normal leading-5 text-base text-tertiary-grey-300">
                Login to continue
              </p>
            </div>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(login)}>
            <div className="block space-y-2">
              <label
                htmlFor="username"
                className="block font-poppins text-secondary text-xs leading-3 font-normal"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className={`w-full rounded-lg border outline-none px-4 py-2 text-tertiary-grey-700 text-base font-poppins font-normal leading-4 placeholder:font-normal placeholder:font-poppins placeholder:text-sm placeholder:leading-4 placeholder:text-tertiary-grey-700 ${
                  errors?.username ? "border-red-600" : "border-primary"
                }`}
                placeholder="Enter your username"
                {...register("username")}
              />
              {errors?.username && (
                <span className="font-poppins font-normal text-xs text-red-600">
                  {errors?.username?.message}
                </span>
              )}
            </div>
            <div className="block space-y-2">
              <label
                htmlFor="password"
                className="block font-poppins text-secondary text-xs leading-3 font-normal"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassowrd ? "password" : "text"}
                  id="password"
                  className={`w-full rounded-lg border outline-none text-tertiary-grey-700 px-4 py-2 text-base font-poppins font-normal leading-4 placeholder:font-normal placeholder:font-poppins placeholder:text-sm placeholder:leading-4 placeholder:text-tertiary-grey-700 
                  ${errors?.password ? "border-red-600" : "border-primary"}
                    
                    `}
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors?.password && (
                  <span className="font-poppins font-normal text-xs text-red-600">
                    {errors?.password?.message}
                  </span>
                )}
                {showPassowrd ? (
                  <ReactSVG
                    src={eyeslash}
                    onClick={handleShowPassword}
                    className="absolute top-3 right-3"
                  />
                ) : (
                  <ReactSVG
                    src={eye}
                    onClick={handleShowPassword}
                    className="absolute top-3 right-3"
                  />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-blue-600 w-full py-2 px-8 flex justify-center items-center rounded-md text-white font-medium text-base leading-5 font-poppins "
            >
              {loading ? (
                <span className="animate-spin size-5 rounded-full border-2 border-white"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
