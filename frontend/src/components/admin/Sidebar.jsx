import logo from "../../assets/logo-4.png";
import logo2 from "../../assets/logo-2.png";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";

const Sidebar = ({ isOpen, isMobile, onClose }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: "dashboard",
      icon: <RxDashboard className="text-lg" />,
      label: "Dashboard",
      color: "text-blue-600",
    },
    {
      path: "users",
      icon: <FiUsers className="text-lg" />,
      label: "Users",
      color: "text-green-600",
    },
    {
      path: "products",
      icon: <BsBoxSeam className="text-lg" />,
      label: "Products",
      color: "text-purple-600",
    },
    {
      path: "categories",
      icon: <MdOutlineCategory className="text-lg" />,
      label: "Categories",
      color: "text-orange-600",
    },
    {
      path: "orders",
      icon: <IoBagCheckOutline className="text-lg" />,
      label: "Orders",
      color: "text-red-600",
    },
  ];

  const isActivePath = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col bg-white shadow-xl border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64 xl:w-72" : "w-16"
        }`}
      >
        {/* Logo Section */}
            <div className="py-2 w-full">
        <Link className="flex items-center justify-between" to={"/"}>
          {isOpen ? (
            <img src={logo} alt="logo" />
          ) : (
            <img className="w-20" src={logo2} alt="logo" />
          )}
        </Link>
      </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-gray-700 border-r-2 border-gray-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 ${
                        isActive
                          ? "text-gray-600"
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {isOpen && (
                      <span className="ml-3 truncate transition-opacity duration-200">
                        {item.label}
                      </span>
                    )}
                    {!isOpen && (
                      <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                        {item.label}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 md:hidden transition-transform duration-300 ease-in-out bg-white shadow-xl border-r border-gray-200 w-64 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Section */}
        <div className="py-4 px-4 border-b border-gray-200">
          <Link className="flex items-center justify-center" to={"/"} onClick={onClose}>
            <img src={logo} alt="logo" className="h-8" />
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-gray-700 border-r-2 border-gray-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 ${
                        isActive
                          ? "text-gray-600"
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="ml-3 truncate">
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
