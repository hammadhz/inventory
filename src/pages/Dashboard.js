import React, { useEffect, useState } from "react";
import minus from "../assets/svgs/minus.svg";
import add from "../assets/svgs/add.svg";
import { ReactSVG } from "react-svg";
import Search from "../components/Search";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    result: null,
    value: "",
  });
  const [openGoodsModal, setOpenGoodsModal] = useState(false);
  const [openReceiptsModal, setOpenReceiptsModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const searchData = async (dataQuery) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/api/Masters/GET_ItemAgainstBarCode?BarCode=${dataQuery}`
      );
      if (response.data.message === "success") {
        const itemsWithQuantity = response.data.data.map((item) => ({
          ...item,
          maxAvailableStock: item.quantityAvailable,
          id: Math.round(Math.random() * 100),
        }));
        setItems(itemsWithQuantity);
        localStorage.setItem("items", JSON.stringify(itemsWithQuantity));
        setLoading(false);
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

  const handleGoodsIssuesModal = async (data) => {
    setData((prev) => ({
      ...prev,
      result: data,
      value: "goods",
    }));
    setOpenModal(true);
  };

  const handleGoodsReceiptModal = async (data) => {
    setData((prev) => ({
      ...prev,
      result: data,
      value: "receipt",
    }));
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const updateQuantity = (id, increment) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantityAvailable + increment;

          // Ensure the quantity stays within bounds
          if (newQuantity < 1 || newQuantity > item.maxAvailableStock) {
            return item; // Return unchanged if out of bounds
          }

          return { ...item, quantityAvailable: newQuantity };
        }
        return item;
      });

      localStorage.setItem("items", JSON.stringify(updatedItems)); // Save updated items
      return updatedItems;
    });
  };

  return (
    <div className="">
      <div className=" bg-tertiary-grey-50  w-full flex justify-center items-center">
        <div className="lg:w-1/2 md:w-1/2 w-full lg:shadow-new md:shadow-new  lg:p-10 md:p-10 p-4  mb-6 lg:bg-white md:bg-white bg-tertiary-grey-50 lg:rounded-lg md:rounded-lg rounded-none">
          <div className="space-y-8">
            <Search searchData={searchData} />

            {loading ? (
              <div className="w-full bg-white rounded-lg shadow-new py-2 px-3 flex justify-center items-center">
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
            ) : (
              <>
                {items?.length === 0 ? (
                  <></>
                ) : (
                  <>
                    <div className="bg-white rounded-lg shadow-new py-4 px-6 mb-4">
                      <h2 className="text-lg font-semibold text-primary">
                        {items[0]?.itemName}
                      </h2>
                      <p className="text-sm text-tertiary-grey-700">
                        Item Code: {items[0]?.itemCode}
                      </p>
                    </div>
                    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-new">
                      <table className="min-w-full">
                        <thead>
                          <tr className="text-left">
                            <th className="p-3 text-sm text-gray-500 text-nowrap">
                              Warehouse Code
                            </th>
                            <th className="p-3 text-sm text-gray-500 text-nowrap">
                              Warehouse Name
                            </th>
                            <th className="p-3 text-sm text-gray-500">
                              Quantity
                            </th>
                            <th className="p-3 text-sm text-gray-500 text-nowrap">
                              Bin Location
                            </th>
                            <th className="p-3 text-sm text-gray-500">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {items?.map((result, index) => {
                            return (
                              <tr
                                key={result?.id}
                                className="border-t border-gray-200"
                              >
                                <td className="p-3">
                                  <p className="text-tertiary-grey-700 font-poppins font-normal text-xs leading-4">
                                    {result.warehouseCode}
                                  </p>
                                </td>
                                <td className="p-3">
                                  <p className="text-tertiary-grey-700 font-poppins font-normal text-xs leading-4">
                                    {result.warehouseName}
                                  </p>
                                </td>
                                <td className="p-3">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() =>
                                        updateQuantity(result.id, -1)
                                      }
                                      className={`bg-tertiary-grey-40 flex justify-center items-center rounded-md px-2 py-3 
                                        ${
                                          result.quantityAvailable <= 1
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-tertiary-grey-40 text-gray-700 hover:bg-tertiary-grey-60 cursor-pointer"
                                        }
                                        `}
                                      disabled={result.quantityAvailable <= 1}
                                    >
                                      <ReactSVG src={minus} />
                                    </button>
                                    <span className="text-tertiary-grey-700 font-poppins font-normal text-xs leading-4">
                                      {result.quantityAvailable}
                                    </span>
                                    <button
                                      onClick={() =>
                                        updateQuantity(result.id, 1)
                                      }
                                      className={`bg-tertiary-grey-40 flex justify-center items-center rounded-md px-2 py-2 cursor-pointer
                                        ${
                                          result.quantityAvailable >=
                                          result.maxAvailableStock
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-tertiary-grey-40 text-gray-700 hover:bg-tertiary-grey-60 cursor-pointer"
                                        }
                                        `}
                                      disabled={
                                        result.quantityAvailable >=
                                        result.maxAvailableStock
                                      }
                                    >
                                      <ReactSVG src={add} />
                                    </button>
                                  </div>
                                </td>
                                <td className="py-3 px-4">
                                  <p className="text-tertiary-grey-700 font-poppins font-normal text-xs leading-4">
                                    {result?.binLocation
                                      ? result?.binLocation
                                      : "null"}
                                  </p>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="space-y-2">
                                    <button
                                      onClick={() =>
                                        handleGoodsIssuesModal(result)
                                      }
                                      className="py-1 px-2 whitespace-nowrap font-poppins font-medium text-xs leading-5 text-white bg-primary rounded-lg w-full"
                                    >
                                      Scan item to use
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleGoodsReceiptModal(result)
                                      }
                                      className="py-1 px-2 whitespace-nowrap font-poppins font-medium text-xs leading-5 text-white bg-primary rounded-lg w-full"
                                    >
                                      Scan item to Return
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        {openModal && <Modal closeModal={closeModal} data={data} />}
      </div>
    </div>
  );
};

export default Dashboard;
