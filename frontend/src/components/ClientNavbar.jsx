import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Badge from "@mui/material/Badge";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { CgProfile } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import SearchBar from "./SearchBar";
import IconButton from "@mui/material/IconButton";

export default function ClientNavbar() {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleShowSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };
  return (
    <>
      <header>
        <div className="header py-4  border-b-[1px] border-gray-300">
          <div className="container flex items-center justify-between">
            <div className="col1 w-[20%]">
              <Link to={"/"}>
                <img className="logo" src={logo} alt="logo" />{" "}
              </Link>
            </div>
            <div className="col2 w-[60%]">
              <ul className="flex items-center justify-center gap-5">
                <li className="list-none">
                  <Link
                    to={"/"}
                    className="link transition text-[14px] font-[500]"
                  >
                    Home
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to={"/men"}
                    className="link transition text-[14px] font-[500]"
                  >
                    Men
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to={"/women"}
                    className="link transition text-[14px] font-[500]"
                  >
                    Women
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to={"/kids"}
                    className="link transition text-[14px] font-[500]"
                  >
                    Kids
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to={"/ahop"}
                    className="link transition text-[14px] font-[500]"
                  >
                    Shop
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to={"/categories"}
                    className="link transition text-[14px] font-[500]"
                  >
                    Category
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col3 w-[30%] flex items-center pl-7">
              <ul className="flex items-center justify-end gap-5 w-full">
                <li className="link list-none">
                  <IconButton onClick={handleShowSearchBar}>
                    <IoSearch className="text-[25px] text-black" />
                  </IconButton>
                </li>
                <li className=" link list-none">
                  <CgProfile className="text-[25px]" />
                </li>
                <li className="link list-none">
                  <Tooltip title="Wishlist" arrow>
                    <Badge badgeContent={1} color="primary">
                      <FaRegHeart className="text-[25px]" />
                    </Badge>
                  </Tooltip>
                </li>
                <li className="link list-none">
                  <Tooltip title="Cart" arrow>
                    <Badge badgeContent={1} color="primary">
                      <MdOutlineShoppingCart className="text-[25px]" />
                    </Badge>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {showSearchBar && <SearchBar />}
      </header>
    </>
  );
}
