import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Scanner } from "@yudiel/react-qr-scanner";

const QRModal = ({ closeModal, getQrCode }) => {
  const [qrData, setQrData] = useState("");
  const [enviroment, setEnvironment] = useState("user");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 786) {
        setEnvironment("environment");
      } else {
        setEnvironment("user");
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScan = (data) => {
    const [values] = data;
    setQrData(values.rawValue);
    handleSubmit(values.rawValue);
  };

  const handleError = (error) => {
    console.error("QR Scanner Error:", error);
  };

  const handleSubmit = (data) => {
    if (data) {
      getQrCode(data);
      // Add additional submit logic here
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="false"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-lg max-h-full">
        {" "}
        {/* Expanded width */}
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 ">
              Scan your QR Code
            </h3>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center "
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 flex flex-col items-center gap-3">
            <div
              id="scanner"
              style={{
                height: "250px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Scanner
                onScan={(result) => {
                  handleScan(result);
                }}
                onError={(error) => handleError(error)}
                constraints={{
                  video: {
                    facingMode: enviroment,
                  },
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default QRModal;
