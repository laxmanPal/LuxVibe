import React from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegAddressBook } from "react-icons/fa";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import userDefaultImage from "../../assets/user.jpg";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

const MyAccount = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-300 overflow-hidden sticky top-6">
              {/* Profile Header with Gradient */}
              <div className="relative p-8">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative flex flex-col items-center text-center ">
                  <div className="relative mb-4">
                    <img
                      src={user.avatar.url || userDefaultImage}
                      alt="Profile"
                      className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-400 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-2 drop-shadow-sm">
                    {user.name}
                  </h2>
                  <p className=" text-sm break-all opacity-90">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Navigation Menu */}
              <div className="p-2">
                <ul className="space-y-1">
                  {[
                    { 
                      to: "/myaccount", 
                      icon: <RxDashboard className="w-5 h-5" />, 
                      label: "Dashboard",
                      color: "text-blue-600"
                    },
                    {
                      to: "details",
                      icon: <RiAccountPinCircleLine className="w-5 h-5" />,
                      label: "Account Details",
                      color: "text-green-600"
                    },
                    {
                      to: "myorders",
                      icon: <IoBagCheckOutline className="w-5 h-5" />,
                      label: "Orders",
                      color: "text-orange-600"
                    },
                    { 
                      to: "mywishlist", 
                      icon: <FaRegHeart className="w-5 h-5" />, 
                      label: "Wishlist",
                      color: "text-red-600"
                    },
                    {
                      to: "myaddresses",
                      icon: <FaRegAddressBook className="w-5 h-5" />,
                      label: "Addresses",
                      color: "text-purple-600"
                    },
                    { 
                      to: "/", 
                      icon: <IoLogOutOutline className="w-5 h-5" />, 
                      label: "Logout",
                      color: "text-gray-600"
                    },
                  ].map((item, index) => (
                    <li key={index}>
                      <NavLink
                        className={({ isActive }) =>
                          `flex items-center px-4 py-4 gap-4 rounded-xl transition-all duration-200 font-medium group relative overflow-hidden ${
                            isActive
                              ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-md border border-blue-200"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
                          }`
                        }
                        to={item.to}
                        end
                      >
                        {({ isActive }) => (
                          <>
                            <div className={`${isActive ? item.color : 'text-gray-500 group-hover:text-gray-700'} transition-colors duration-200`}>
                              {item.icon}
                            </div>
                            <span className="text-base font-medium">
                              {item.label}
                            </span>
                            {isActive && (
                              <div className="absolute right-3 w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 min-h-[600px] overflow-hidden">
              <div className="p-4 lg:p-8">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
