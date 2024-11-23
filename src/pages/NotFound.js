import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex justify-center items-center lg:px-0 md:px-0 px-4">
      <div className="bg-white shadow-new z-10 p-10 rounded-2xl lg:min-w-[388px] lg:min-h-[238px]">
        <div className="flex justify-center items-center gap-4 flex-col">
          <h1 className="font-poppins font-extrabold text-[100px] italic text-center text-primary">
            404
          </h1>
          <p className="font-poppins font-medium text-base text-black">
            The Resource that you are looking for not present
          </p>
          <Link
            to={"/"}
            className="font-poppins font-normal text-base text-white bg-primary hover:bg-blue-600 inline-block p-3 rounded-lg"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
