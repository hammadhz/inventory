import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const PostDoc = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const rowsPerPage = 5;

  const filteredList = filterValue
    ? list.filter((item) => item.docName === filterValue)
    : list;

  const paginatedList = filteredList?.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredList.length / rowsPerPage);
  const handleFilterChange = (value) => {
    setFilterValue(value); // Update filter
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getPostDoc = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          "/api/Masters/Get_GetPostedDocuments"
        );
        if (response.data.message === "Success") {
          setLoading(false);
          setList(response.data.data);
          if (response.data.message === "Success") {
            toast.success("Posted Documents records get successfully", {
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
        toast.error(error, {
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

    getPostDoc();
  }, []);

  return (
    <div className="bg-tertiary-grey-50  w-full flex justify-center items-center">
      <div className="lg:w-1/2 md:w-1/2 w-full lg:shadow-new md:shadow-new  lg:p-10 md:p-10 p-4  mb-6 lg:bg-white md:bg-white bg-tertiary-grey-50 lg:rounded-lg md:rounded-lg rounded-none">
        <h3 className="font-poppins text-base text-black font-semibold pb-4">
          Posted Document Record
        </h3>
        <div className="mb-4">
          <label
            htmlFor="filter"
            className="block font-semibold text-sm font-poppins mb-2"
          >
            Filter by Doc Name:
          </label>
          <select
            id="filter"
            value={filterValue}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border border-primary rounded-lg px-4 py-2 font-poppins"
          >
            <option value="">All</option>
            <option value="Goods Issue">Goods IssueW</option>
            <option value="Goods Receipt">Goods Receipt</option>
          </select>
        </div>
        <div className="w-full overflow-x-auto bg-white rounded-lg shadow-new mb-8">
          <table className="min-w-full">
            <thead>
              <tr className="text-left">
                <th
                  scope="col"
                  className="p-3 text-sm text-gray-500 text-nowrap"
                >
                  Doc Num
                </th>
                <th
                  scope="col"
                  className="p-3 text-sm text-gray-500 text-nowrap"
                >
                  Doc Date
                </th>
                <th
                  scope="col"
                  className="p-3 text-sm text-gray-500 text-nowrap"
                >
                  Obj Type
                </th>
                <th
                  scope="col"
                  className="p-3 text-sm text-gray-500 text-nowrap"
                >
                  Doc Name
                </th>
                <th
                  scope="col"
                  className="p-3 text-sm text-gray-500 text-nowrap"
                >
                  Item Code
                </th>
                <th
                  scope="col"
                  className="p-3 text-sm text-gray-500 text-nowrap"
                >
                  Item Description
                </th>
                <th
                  scope="col"
                  className="p-3 text-sm text-gray-500 text-nowrap"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="p-3 text-sm text-gray-500 text-nowrap"
                >
                  uom
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="">
                  <td colSpan={8} className="py-3 bg-white mx-40">
                    <div className="flex justify-center items-center w-full">
                      <svg
                        className="w-8 h-8 text-gray-300 animate-spin"
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                      >
                        <path
                          d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        ></path>
                      </svg>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {paginatedList.length === 0 ? (
                    <tr className="">
                      <td colSpan={8} className="py-3 bg-white text-center">
                        No Posted Document Found
                      </td>
                    </tr>
                  ) : (
                    <>
                      {paginatedList?.map((result, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="p-3">
                            <p className="text-primary font-poppins font-semibold text-sm leading-5 ">
                              {result?.docNum}
                            </p>
                          </td>
                          <td className="p-2">
                            <p className="text-tertiary-grey-700 font-poppins font-normal text-xs leading-4">
                              {result?.docDate}
                            </p>
                          </td>
                          <td className="p-3">
                            <p className="text-tertiary-grey-700 font-poppins font-normal text-xs leading-4">
                              {result?.objType}
                            </p>
                          </td>
                          <td className="p-3">
                            <p className="text-tertiary-grey-700 font-poppins font-normal text-xs leading-4">
                              {result?.docName}
                            </p>
                          </td>
                          <td className="p-3">
                            <p className="text-tertiary-grey-700 font-poppins font-normal text-xs leading-4">
                              {result?.itemCode}
                            </p>
                          </td>
                          <td className="p-3">
                            <p className="text-tertiary-grey-700 font-poppins font-normal text-xs leading-4">
                              {result?.itemDescription}
                            </p>
                          </td>
                          <td className="p-3">
                            <p className="text-tertiary-grey-700 font-poppins font-normal text-xs leading-4">
                              {result?.quantity}
                            </p>
                          </td>
                          <td className="p-3">
                            <p className="text-tertiary-grey-700 font-poppins font-normal text-xs leading-4">
                              {result?.uom}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
        <div>
          <div className="flex gap-4 justify-end items-center mt-4">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {/* <div className="flex">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 mx-1 rounded ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div> */}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDoc;
