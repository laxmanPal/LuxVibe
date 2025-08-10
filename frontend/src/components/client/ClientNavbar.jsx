import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import Badge from "@mui/material/Badge";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { CgProfile } from "react-icons/cg";
import { IoClose, IoMenu, IoSearch } from "react-icons/io5";
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
  // const [showSearchBar, setShowSearchBar] = useState(false);
  const { user, logout } = useAuth();

  const [openMyAccMenu, setopenMyAccMenu] = useState(null);
  const openMenu = Boolean(openMyAccMenu);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const navigationLinks = [
    { label: "Home", to: "/" },
    { label: "Men", to: "/category/men" },
    { label: "Women", to: "/category/women" },
    { label: "Kids", to: "/category/kids" },
    { label: "Shop", to: "/shop" },
    { label: "Category", to: "/categories" },
  ];

  // Account actions used in drawer only
  const accountActions = user
    ? [
        {
          to: "/myaccount",
          icon: <FaRegUser className="text-[20px] text-gray-700" />,
          label: "My Account",
        },
        {
          to: "/myaccount/myorders",
          icon: <IoBagCheckOutline className="text-[20px] text-gray-700" />,
          label: "Orders",
        },
        {
          to: "/myaccount/myaddresses",
          icon: <IoLocationOutline className="text-[20px] text-gray-700" />,
          label: "Address",
        },
        {
          onClick: logout,
          icon: <TbLogout className="text-[20px] text-red-600" />,
          label: "Logout",
        },
      ]
    : [
        {
          to: "/auth/login",
          icon: <CgProfile className="text-[20px] text-gray-700" />,
          label: "Login",
        },
      ];

  return (
    <>
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
        <nav className="container mx-auto px-2 sm:px-4 max-w-7xl">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink to="/" className="group">
                <img 
                  className="h-8 sm:h-10 lg:h-12 w-auto transition-transform duration-200 group-hover:scale-105" 
                  src={logo} 
                  alt="Logo" 
                />
              </NavLink>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex items-center gap-8">
                {navigationLinks.map((nav, i) => (
                  <li key={i}>
                    <NavLink
                      to={nav.to}
                      className={({ isActive }) =>
                        `relative py-2 px-1 transition-all duration-200 text-base font-medium hover:text-blue-600 ${
                          isActive
                            ? "text-blue-600 font-semibold"
                            : "text-gray-700"
                        } after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-200 hover:after:w-full ${
                          isActive ? "after:w-full" : ""
                        }`
                      }
                    >
                      {nav.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Action Icons - Only on desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Search */}
              {/* <Tooltip title="Search" arrow>
                <IconButton 
                  onClick={() => setShowSearchBar((s) => !s)}
                  className="!p-2 hover:!bg-gray-100 !transition-all !duration-200"
                >
                  <IoSearch className="text-2xl text-gray-700" />
                </IconButton>
              </Tooltip> */}

              {/* Profile */}
              <div>
                {user ? (
                  <Tooltip title="Account" arrow>
                    <IconButton
                      onClick={(e) => setopenMyAccMenu(e.currentTarget)}
                      className="!p-1 hover:!bg-gray-100 !transition-all !duration-200"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-blue-300 transition-all duration-200">
                        <img
                          className="w-full h-full object-cover"
                          src={user.avatar?.url || defaultAvatar}
                          alt="profile"
                        />
                      </div>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Login" arrow>
                    <NavLink to="/auth/login">
                      <IconButton className="!p-2 hover:!bg-gray-100 !transition-all !duration-200">
                        <CgProfile className="text-2xl text-gray-700" />
                      </IconButton>
                    </NavLink>
                  </Tooltip>
                )}
              </div>

              {/* Wishlist */}
              <Tooltip title="Wishlist" arrow>
                <NavLink to="/myaccount/mywishlist">
                  <IconButton className="!p-2 hover:!bg-gray-100 !transition-all !duration-200">
                    <Badge
                      badgeContent={wishlist?.items?.length || 0}
                      color="primary"
                      className="[&_.MuiBadge-badge]:bg-red-500"
                    >
                      <FaRegHeart className="text-2xl text-gray-700 hover:text-red-500 transition-colors duration-200" />
                    </Badge>
                  </IconButton>
                </NavLink>
              </Tooltip>

              {/* Cart */}
              <Tooltip title="Cart" arrow>
                <NavLink to="/cart">
                  <IconButton className="!p-2 hover:!bg-gray-100 !transition-all !duration-200">
                    <Badge
                      badgeContent={cart?.items?.length || 0}
                      color="primary"
                      className="[&_.MuiBadge-badge]:bg-blue-500"
                    >
                      <MdOutlineShoppingCart className="text-2xl text-gray-700 hover:text-blue-500 transition-colors duration-200" />
                    </Badge>
                  </IconButton>
                </NavLink>
              </Tooltip>
            </div>

            {/* Mobile Menu Icons - Just hamburger menu */}
            <div className="lg:hidden">
              <IconButton 
                onClick={() => setDrawerOpen(true)}
                className="!p-1.5"
                size="small"
              >
                <IoMenu className="text-xl text-gray-700" />
              </IconButton>
            </div>
          </div>
        </nav>

        {/* Search Bar */}
        {/* {showSearchBar && (
          <div className="border-t border-gray-200 bg-white">
            <SearchBar />
          </div>
        )} */}
      </header>

      {/* Desktop Account Menu */}
      <Menu
        anchorEl={openMyAccMenu}
        id="account-menu"
        open={openMenu}
        onClose={() => setopenMyAccMenu(null)}
        onClick={() => setopenMyAccMenu(null)}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              minWidth: "220px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              marginTop: "8px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {accountActions.map(({ to, icon, label, onClick }) =>
          onClick ? (
            <MenuItem 
              key={label} 
              onClick={onClick}
              className="!py-3 !px-4 hover:!bg-gray-50 !transition-colors !duration-200"
            >
              <div className="flex items-center gap-3">
                {icon}
                <span className="text-sm font-medium">{label}</span>
              </div>
            </MenuItem>
          ) : (
            <MenuItem 
              key={label} 
              onClick={() => setopenMyAccMenu(null)}
              className="!py-3 !px-4 hover:!bg-gray-50 !transition-colors !duration-200"
            >
              <Link to={to} className="flex items-center gap-3 w-full">
                {icon}
                <span className="text-sm font-medium">{label}</span>
              </Link>
            </MenuItem>
          )
        )}
      </Menu>

      {/* Mobile Drawer - Contains all mobile actions */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: "280px",
              background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
            }
          }
        }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              className="!p-1 hover:!bg-gray-100"
            >
              <IoClose className="text-xl text-gray-700" />
            </IconButton>
          </div>

          {/* User Profile Section */}
          {user && (
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200">
                  <img
                    className="w-full h-full object-cover"
                    src={user.avatar?.url || defaultAvatar}
                    alt="profile"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex-1 p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Navigation</h3>
            <ul className="space-y-1">
              {navigationLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActive 
                          ? "bg-gray-200 text-gray-600 border-l-4 border-gray-500" 
                          : "text-gray-700 hover:bg-white hover:shadow-sm"
                      }`
                    }
                    onClick={() => setDrawerOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Quick Actions - Cart, Wishlist, and Search */}
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 mt-6">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {/* Search in drawer for mobile */}
              {/* <button
                onClick={() => {
                  setShowSearchBar((s) => !s);
                  setDrawerOpen(false);
                }}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <IoSearch className="text-2xl text-gray-700" />
                <span className="text-xs font-medium text-gray-600">Search</span>
              </button> */}

              <NavLink
                to="/myaccount/mywishlist"
                onClick={() => setDrawerOpen(false)}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Badge
                  badgeContent={wishlist?.items?.length || 0}
                  color="primary"
                  className="[&_.MuiBadge-badge]:bg-red-500"
                >
                  <FaRegHeart className="text-2xl text-gray-700" />
                </Badge>
                <span className="text-xs font-medium text-gray-600">Wishlist</span>
              </NavLink>
              
              <NavLink
                to="/cart"
                onClick={() => setDrawerOpen(false)}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Badge
                  badgeContent={cart?.items?.length || 0}
                  color="primary"
                  className="[&_.MuiBadge-badge]:bg-blue-500"
                >
                  <MdOutlineShoppingCart className="text-2xl text-gray-700" />
                </Badge>
                <span className="text-xs font-medium text-gray-600">Cart</span>
              </NavLink>
            </div>

            {/* Account Actions */}
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Account</h3>
            <div className="space-y-1">
              {accountActions.map(({ to, icon, label, onClick }) =>
                onClick ? (
                  <button
                    className="w-full flex items-center gap-3 py-3 px-4 text-gray-700 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200"
                    key={label}
                    onClick={() => {
                      onClick();
                      setDrawerOpen(false);
                    }}
                  >
                    {icon}
                    <span className="font-medium">{label}</span>
                  </button>
                ) : (
                  <NavLink
                    to={to}
                    key={label}
                    className="flex items-center gap-3 py-3 px-4 text-gray-700 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {icon}
                    <span className="font-medium">{label}</span>
                  </NavLink>
                )
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
