import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
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
      <header className="sticky top-0 self-start bg-white z-50">
        <div className="header py-4  border-b-[1px] border-gray-300">
          <div className="container flex items-center justify-between">
            <div className="col1 w-[20%]">
              <NavLink to={"/"}>
                <img className="logo" src={logo} alt="logo" />{" "}
              </NavLink>
            </div>
            <div className="col2 w-[60%]">
              <ul className="flex items-center justify-center gap-5">
                <li className="list-none">
                  <NavLink
                    to={"/"}
                    className={`link transition text-[14px] font-[500] ${({
                      isActive,
                    }) => (isActive ? "active" : undefined)}`}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="list-none">
                  <NavLink
                    to={"/category/men"}
                     className={`link transition text-[14px] font-[500] ${({
                      isActive,
                    }) => (isActive ? "active" : undefined)}`}
                  >
                    Men
                  </NavLink>
                </li>
                <li className="list-none">
                  <NavLink
                    to={"/category/women"}
                     className={`link transition text-[14px] font-[500] ${({
                      isActive,
                    }) => (isActive ? "active" : undefined)}`}
                  >
                    Women
                  </NavLink>
                </li>
                <li className="list-none">
                  <NavLink
                    to={"/category/kids"}
                     className={`link transition text-[14px] font-[500] ${({
                      isActive,
                    }) => (isActive ? "active" : undefined)}`}
                  >
                    Kids
                  </NavLink>
                </li>
                <li className="list-none">
                  <NavLink
                    to={"/shop"}
                    className={`link transition text-[14px] font-[500] ${({
                      isActive,
                    }) => (isActive ? "active" : undefined)}`}
                  >
                    Shop
                  </NavLink>
                </li>
                <li className="list-none">
                  <NavLink
                    to={"/categories"}
                     className={`link transition text-[14px] font-[500] ${({
                      isActive,
                    }) => (isActive ? "active" : undefined)}`}
                  >
                    Category
                  </NavLink>
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
                <li className="list-none">
                  <NavLink to={"/auth/login"}>
                    <IconButton>
                      <CgProfile className="link text-[25px] text-black" />
                    </IconButton>
                  </NavLink>
                </li>
                <li className="link list-none">
                  <NavLink to={"myaccount/mywishlist"}>
                    <Tooltip title="Wishlist" arrow>
                      <Badge badgeContent={1} color="primary">
                        <FaRegHeart className="text-[25px]" />
                      </Badge>
                    </Tooltip>
                  </NavLink>
                </li>
                <li className="link list-none">
                  <NavLink to={"/cart"}>
                    <Tooltip title="Cart" arrow>
                      <Badge badgeContent={1} color="primary">
                        <MdOutlineShoppingCart className="text-[25px]" />
                      </Badge>
                    </Tooltip>
                  </NavLink>
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
