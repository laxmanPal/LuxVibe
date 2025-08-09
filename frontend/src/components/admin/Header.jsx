import { IconButton } from "@mui/material";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Badge from "@mui/material/Badge";
import { FaBell } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import { TbLogout } from "react-icons/tb";
import { useAuth } from "../../store/AuthContext";
import userDefaultImage from "../../assets/user.jpg";
const Header = ({ toggleSidebar, isMobile, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const [openMyAccMenu, setOpenMyAccMenu] = useState(null);
  const [notifications] = useState(3); // Mock notification count

  const openMenu = Boolean(openMyAccMenu);

  const handleOpenMyAccMenu = (event) => {
    setOpenMyAccMenu(event.currentTarget);
  };

  const handleCloseMyAccMenu = () => {
    setOpenMyAccMenu(null);
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Menu Toggle */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <HiOutlineMenuAlt2 className="w-6 h-6" />
          </button>

          {/* Breadcrumb or Page Title */}
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search Button (hidden on mobile) */}
          <button className="hidden md:flex p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200">
            <FaBell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                {notifications}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={handleOpenMyAccMenu}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <img
                src={user?.avatar?.url || userDefaultImage}
                alt="Profile"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-gray-200"
                onError={(e) => {
                  e.target.src = { userDefaultImage };
                }}
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-700 truncate max-w-24">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
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
                    filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.15))",
                    mt: 1.5,
                    minWidth: isMobile ? 200 : 260,
                    borderRadius: 2,
                    border: "1px solid #e5e7eb",
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
                      border: "1px solid #e5e7eb",
                      borderRight: "none",
                      borderBottom: "none",
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* Profile Header */}
              <MenuItem onClick={handleCloseMyAccMenu} className="!py-4">
                <div className="flex items-center space-x-3 w-full">
                  <img
                    src={user?.avatar?.url || userDefaultImage}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {user?.name || "Admin User"}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || "admin@example.com"}
                    </p>
                  </div>
                </div>
              </MenuItem>

              <Divider />

              {/* Menu Items */}
              <MenuItem onClick={handleCloseMyAccMenu} className="!py-3">
                <div className="flex items-center space-x-3">
                  <RxAvatar className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">View Profile</span>
                </div>
              </MenuItem>

              <MenuItem onClick={handleCloseMyAccMenu} className="!py-3">
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">Settings</span>
                </div>
              </MenuItem>

              <Divider />

              <MenuItem onClick={logout} className="!py-3">
                <div className="flex items-center space-x-3">
                  <TbLogout className="w-5 h-5 text-red-600" />
                  <span className="text-sm text-red-600">Logout</span>
                </div>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
