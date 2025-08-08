import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import Badge from "@mui/material/Badge";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { CgProfile } from "react-icons/cg";
import { IoMenu, IoSearch } from "react-icons/io5";
import SearchBar from "./SearchBar";
import IconButton from "@mui/material/IconButton";
import { useAuth } from "../../store/AuthContext";
import { Divider, Drawer, Menu, MenuItem } from "@mui/material";
import { RxAvatar } from "react-icons/rx";
import { TbLogout } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoBagCheckOutline } from "react-icons/io5";
import { useCartCtx } from "../../store/CartContext";
import { useWishlistCtx } from "../../store/WishListContext";
import defaultAvatar from "../../assets/user.jpg";

export default function ClientNavbar() {
  const { cart } = useCartCtx();
  const { wishlist } = useWishlistCtx();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { user, logout } = useAuth();

  const [openMyAccMenu, setopenMyAccMenu] = useState(null);
  const openMenu = Boolean(openMyAccMenu);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigationLinks = [
    { label: "Home", to: "/" },
    { label: "Men", to: "/category/men" },
    { label: "Women", to: "/category/women" },
    { label: "Kids", to: "/category/kids" },
    { label: "Shop", to: "/shop" },
    { label: "Category", to: "/categories" },
  ];

  // Account actions used in both drawer & desktop menu
  const accountActions = user
    ? [
        {
          to: "/myaccount",
          icon: <FaRegUser className="text-[20px] text-black" />,
          label: "My Account",
        },
        {
          to: "/myaccount/myorders",
          icon: <IoBagCheckOutline className="text-[20px] text-black" />,
          label: "Orders",
        },
        {
          to: "/myaccount/myaddresses",
          icon: <IoLocationOutline className="text-[20px] text-black" />,
          label: "Address",
        },
        {
          onClick: logout,
          icon: <TbLogout className="text-[20px] text-black" />,
          label: "Logout",
        },
      ]
    : [
        {
          to: "/auth/login",
          icon: <CgProfile className="text-[20px] text-black" />,
          label: "Login",
        },
      ];

  return (
    <>
      <header className="sticky top-0 bg-white z-50 border-b border-gray-200">
        <nav className="container mx-auto px-4 max-w-7xl flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center h-full">
            <NavLink to="/">
              <img className="h-10 w-auto" src={logo} alt="Logo" />
            </NavLink>
          </div>
          {/* Desktop Nav */}
          <ul className="hidden md:flex flex-1 items-center justify-center gap-6">
            {navigationLinks.map((nav, i) => (
              <li key={i}>
                <NavLink
                  to={nav.to}
                  className={({ isActive }) =>
                    `transition text-base font-medium hover:text-blue-600 ${
                      isActive
                        ? "text-blue-700 font-semibold border-b-2 border-blue-600 pb-1"
                        : "text-gray-700"
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Desktop Action Icons */}
          <div className="hidden md:flex items-center gap-4 ">
            {/* Search */}
            <div>
              <IconButton onClick={() => setShowSearchBar((s) => !s)}>
                <IoSearch className="text-2xl text-gray-700" />
              </IconButton>
            </div>
            {/* Profile */}
            <div>
              {user ? (
                <IconButton
                  onClick={(e) => setopenMyAccMenu(e.currentTarget)}
                  className="p-1"
                >
                  {user.avatar?.url ? (
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={user.avatar.url}
                      alt="profile"
                    />
                  ) : (
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={defaultAvatar}
                      alt="profile"
                    />
                  )}
                </IconButton>
              ) : (
                <NavLink to="/auth/login">
                  <IconButton>
                    <CgProfile className="text-2xl text-gray-700" />
                  </IconButton>
                </NavLink>
              )}
            </div>
            {/* Wishlist */}
            <div>
              <NavLink to="/myaccount/mywishlist">
                <Tooltip title="Wishlist" arrow>
                  <Badge
                    badgeContent={wishlist?.items?.length || 0}
                    color="primary"
                  >
                    <FaRegHeart className="text-2xl" />
                  </Badge>
                </Tooltip>
              </NavLink>
            </div>
            {/* Cart */}
            <div>
              <NavLink to="/cart">
                <Tooltip title="Cart" arrow>
                  <Badge
                    badgeContent={cart?.items?.length || 0}
                    color="primary"
                  >
                    <MdOutlineShoppingCart className="text-2xl" />
                  </Badge>
                </Tooltip>
              </NavLink>
            </div>
          </div>{" "}
          {/* Hamburger for mobile */}
          <div className="md:hidden flex items-center">
            <IconButton onClick={() => setDrawerOpen(true)}>
              <IoMenu className="text-2xl" />
            </IconButton>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {/* {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full border-t border-gray-200 shadow-sm">
          <ul className="flex flex-col items-start px-4 py-2 gap-2">
            {navigationLinks.map((nav, i) => (
              <li key={i} className="w-full">
                <NavLink
                  to={nav.to}
                  className={({ isActive }) =>
                    `block w-full py-2 px-2 rounded-lg text-base font-medium hover:bg-blue-50 ${
                      isActive ? "font-semibold text-blue-600" : "text-gray-700"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )} */}

        {showSearchBar && <SearchBar />}
      </header>
      <Menu
        anchorEl={openMyAccMenu}
        id="account-menu"
        open={openMenu}
        onClose={() => setopenMyAccMenu(null)}
        onClick={() => setopenMyAccMenu(null)}
        slotProps={{
          paper: {
            elevation: 1,
            sx: {
              minWidth: "200px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user &&
          accountActions.map(({ to, icon, label, onClick }) =>
            onClick ? (
              <MenuItem key={label} onClick={onClick}>
                <div className="flex items-center gap-3">
                  {icon}
                  <span>{label}</span>
                </div>
              </MenuItem>
            ) : (
              <MenuItem key={label} onClick={() => setopenMyAccMenu(null)}>
                <Link to={to}>
                  <div className="flex items-center gap-3">
                    {icon}
                    <span>{label}</span>
                  </div>
                </Link>
              </MenuItem>
            )
          )}
      </Menu>
      {/* Drawer Menu (Mobile) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div className="w-64 h-full flex flex-col pt-6 px-4 gap-2 bg-white">
          {/* Close btn */}
          <button
            className="self-end pb-4"
            onClick={() => setDrawerOpen(false)}
          >
            ✕
          </button>
          {/* Actions */}
          <div className="flex items-center gap-4 mb-4">
            <IconButton
              color="default"
              onClick={() => {
                setShowSearchBar((s) => !s);
                setDrawerOpen(false);
              }}
            >
              <IoSearch className="text-xl" />
            </IconButton>
            <NavLink
              to="/myaccount/mywishlist"
              onClick={() => setDrawerOpen(false)}
            >
              <Tooltip title="Wishlist" arrow>
                <Badge
                  badgeContent={wishlist?.items?.length || 0}
                  color="primary"
                >
                  <FaRegHeart className="text-xl" />
                </Badge>
              </Tooltip>
            </NavLink>
            <NavLink to="/cart" onClick={() => setDrawerOpen(false)}>
              <Tooltip title="Cart" arrow>
                <Badge badgeContent={cart?.items?.length || 0} color="primary">
                  <MdOutlineShoppingCart className="text-xl" />
                </Badge>
              </Tooltip>
            </NavLink>
          </div>
          {/* Nav Links */}
          <ul className="flex flex-col gap-2 mb-4">
            {navigationLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className="py-2 px-2 text-gray-800 font-medium rounded hover:bg-gray-50 block"
                  onClick={() => setDrawerOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Account Actions */}
          <div className="border-t pt-4 mt-2 flex flex-col gap-2">
            {accountActions.map(({ to, icon, label, onClick }) =>
              onClick ? (
                <button
                  className="flex gap-3 px-2 py-2 text-gray-900 items-center rounded hover:bg-gray-100"
                  key={label}
                  onClick={() => {
                    onClick();
                    setDrawerOpen(false);
                  }}
                >
                  {icon} <span>{label}</span>
                </button>
              ) : (
                <NavLink
                  to={to}
                  key={label}
                  className="flex gap-3 px-2 py-2 text-gray-900 items-center rounded hover:bg-gray-100"
                  onClick={() => setDrawerOpen(false)}
                >
                  {icon} <span>{label}</span>
                </NavLink>
              )
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
}
