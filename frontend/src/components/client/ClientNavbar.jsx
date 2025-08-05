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
import { useAuth } from "../../store/AuthContext";
import { Divider, Menu, MenuItem } from "@mui/material";
import { RxAvatar } from "react-icons/rx";
import { TbLogout } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoBagCheckOutline } from "react-icons/io5";
import { useCartCtx } from "../../store/CartContext";

export default function ClientNavbar() {
  const { cart } = useCartCtx();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { user, logout } = useAuth();

  const [openMyAccMenu, setopenMyAccMenu] = useState(null);
  const openMenu = Boolean(openMyAccMenu);
  const handleOpenMyAccMenu = (event) => {
    setopenMyAccMenu(event.currentTarget);
  };
  const handleCloseMyAccMenu = () => {
    setopenMyAccMenu(null);
  };

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
                {user ? (
                  <li className="list-none">
                    {user.avatar.url ? (
                      <IconButton onClick={handleOpenMyAccMenu}>
                        <img
                          className="w-8 h-8 rounded-full"
                          src={user.avatar.url}
                          alt=""
                        />
                      </IconButton>
                    ) : (
                      <IconButton onClick={handleOpenMyAccMenu}>
                        <RxAvatar className=" text-[25px] text-black" />
                      </IconButton>
                    )}
                    <Menu
                      anchorEl={openMyAccMenu}
                      id="account-menu"
                      open={openMenu}
                      onClose={handleCloseMyAccMenu}
                      onClick={handleCloseMyAccMenu}
                      slotProps={{
                        paper: {
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&::before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem>
                        <Link to={"/myaccount"}>
                          <div className="flex items-center gap-3">
                            <FaRegUser className="text-[20px] text-black" />
                            <span className="text-[15px]">My Account</span>
                          </div>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to={"/myaccount/myorders"}>
                          <div className="flex items-center gap-3">
                            <IoBagCheckOutline className="text-[20px] text-black" />
                            <span className="text-[15px]">Orders</span>
                          </div>
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to={"/myaccount/myaddresses"}>
                          <div className="flex items-center gap-3">
                            <IoLocationOutline className="text-[20px] text-black" />
                            <span className="text-[15px]">Address</span>
                          </div>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={logout}>
                        <div className="flex items-center gap-3">
                          <TbLogout className="text-[20px] text-black" />
                          <span className="text-[15px]">Logout</span>
                        </div>
                      </MenuItem>
                    </Menu>
                  </li>
                ) : (
                  <li className="list-none">
                    <NavLink to={"/auth/login"}>
                      <IconButton>
                        <CgProfile className="link text-[25px] text-black" />
                      </IconButton>
                    </NavLink>
                  </li>
                )}
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
                      <Badge
                        badgeContent={cart?.items?.length || 0}
                        color="primary"
                      >
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
