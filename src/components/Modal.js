import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const QRModal = ({ closeModal, data }) => {
  const [loading, setLoading] = useState(false);
  const [selectLoading, setSelectLoading] = useState(false);
  const [list, setList] = useState([]);
  const [selectMachCode, setSelectMachCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getAssetsList();
  }, []);

  async function getAssetsList() {
    try {
      setSelectLoading(true);
      const response = await axiosInstance.get("api/Masters/Get_AssetsList");
      if (response.data.message === "Success") {
        setList(response.data.data);
        setSelectLoading(false);
        toast.success("Gets machine list successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setSelectLoading(false);
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
      setSelectLoading(false);
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
  }

  const handleSelectMachineCode = (e) => {
    setSelectMachCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let body;
      let response;

      if (data?.value === "goods") {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const currentDate = `${year}${month}${day}`;
        const min = 1;
        const max = 9;
        const randomIssueNo = Math.floor(Math.random() * (max - min + 1)) + min;

        body = {
          docNum: "string",
          docDate: `${currentDate}`,
          taxDate: `${currentDate}`,
          remarks: "string",
          receiptno: "string",
          issueNo: `${randomIssueNo}`,
          oGoodsIssueandReciptDetails: [
            {
              itemCode: data?.result?.itemCode,
              itemDesc: "string",
              whsCode: data?.result?.warehouseCode,
              machine: selectMachCode,
              quantity: data?.result?.quantityAvailable,
              price: 0,
              managedByBatch: "N",
              binActivat: "N",
              oBinlocations: [
                {
                  id: 0,
                  whsCode: "string",
                  binAbsEntry: "string",
                  binCode: "string",
                  quantity: "string",
                },
              ],
            },
          ],
        };

        response = await axiosInstance.post(
          "/api/Inventory/Post_GoodsIssue",
          body
        );
        if (response.data.message === "Success") {
          setLoading(false);
          navigate("/postdoc");
          toast.success("Post GoodsIssue submitted sucessfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
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
      }
      if (data?.value === "receipt") {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const currentDate = `${year}${month}${day}`;
        const min = 1;
        const max = 9;
        const randomIssueNo = Math.floor(Math.random() * (max - min + 1)) + min;
        body = {
          docNum: "string",
          docDate: `${currentDate}`,
          taxDate: `${currentDate}`,
          remarks: "string",
          receiptno: `${randomIssueNo}`,
          issueNo: "string",
          oGoodsIssueandReciptDetails: [
            {
              itemCode: data?.result?.itemCode,
              itemDesc: "string",
              quantity: data?.result?.quantityAvailable,
              whsCode: data?.result?.warehouseCode,
              machine: selectMachCode,
              managedByBatch: "N",
              oBinlocations: [
                {
                  id: 0,
                  whsCode: "string",
                  binAbsEntry: "string",
                  binCode: "string",
                  quantity: "string",
                },
              ],
              price: 0,
              binActivat: "N",
            },
          ],
        };
        response = await axiosInstance.post(
          "/api/Inventory/Post_GoodsReceipt",
          body
        );
        if (response.data.message === "Success") {
          setLoading(false);
          navigate("/postdoc");
          toast.success("Post goods receipt submitted successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
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
              Select Machine Code
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
            <div className="block w-full space-y-3">
              <div>
                <label
                  htmlFor="selectMachCode"
                  className="block mb-2 text-sm font-medium font-poppins text-black dark:text-white"
                >
                  Select an option
                </label>
                <select
                  id="selectMachCode"
                  name="selectMachCode"
                  value={selectMachCode}
                  onChange={handleSelectMachineCode}
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value="">Choose a machine code</option>
                  {selectLoading ? (
                    <option>Loading...</option>
                  ) : (
                    <>
                      {list?.length === 0 ? (
                        <option value="">No machine codes available</option>
                      ) : (
                        <>
                          {list?.map((result, id) => {
                            return (
                              <option key={id} value={result.assetCode}>
                                {result.assetCode}
                              </option>
                            );
                          })}
                        </>
                      )}
                    </>
                  )}
                </select>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full flex justify-center items-center py-1.5 px-1 text-white bg-primary rounded-lg"
              >
                {loading ? (
                  <div className="w-full bg-primary rounded-lg shadow-new  flex justify-center items-center">
                    <svg
                      className="w-6 h-6 text-gray-300 animate-spin"
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
                        className="text-white"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default QRModal;
