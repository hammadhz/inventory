import React from "react";

const PageLoading = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary"></div>
    </div>
  );
};

export default PageLoading;
