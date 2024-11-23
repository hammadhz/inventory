import React, { useState } from "react";
import barcode_scanner from "../assets/svgs/barcode_scanner.svg";
import search from "../assets/imgs/search.png";
import QRModal from "./QRModal";
import { ReactSVG } from "react-svg";

const Search = ({ searchData }) => {
  const [searchBarCode, setSearchBarCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchBarCode = (e) => {
    setSearchBarCode(e.target.value);
  };

  const handleSearch = (query) => {
    searchData(query);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getQrCode = (data) => {
    if (data) {
      setSearchBarCode(data);
      handleSearch(data);
    }
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <div className="relative lg:w-full md:w-full w-[90%]">
        <input
          type="text"
          name="search"
          className="w-full px-4 py-2 bg-tertiary-grey-40 rounded-lg outline-none font-poppins font-normal text-sm leading-5 text-tertiary-grey-700 placeholder:font-poppins placeholder:font-normal placeholder:text-tertiary-grey-700 placeholder:leading-5 placeholder:text-sm"
          placeholder="Search item availability"
          value={searchBarCode}
          onChange={handleSearchBarCode}
        />
        <ReactSVG
          src={barcode_scanner}
          onClick={handleOpenModal}
          className="absolute top-2.5 right-3 cursor-pointer"
        />
      </div>
      <div
        className="flex justify-center items-center bg-tertiary-grey-40 size-8 rounded-full"
        onClick={() => handleSearch(searchBarCode)}
      >
        <img src={search} alt="search" className="size-3" />
      </div>
      {isModalOpen && <QRModal closeModal={closeModal} getQrCode={getQrCode} />}
    </div>
  );
};

export default Search;
