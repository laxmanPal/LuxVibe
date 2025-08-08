import React from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegAddressBook } from "react-icons/fa";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";
import userDefaultImage from "../../assets/user.jpg";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

const MyAccount = () => {
  const { user } = useAuth();

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 container border-b border-gray-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 flex items-start justify-center lg:justify-start">
          <div className="w-full sm:w-80 rounded-xl shadow-md overflow-hidden bg-white border border-gray-300 sticky top-20 self-start">
            
            {/* Profile Header */}
            <div className="flex flex-col items-center p-6 text-center">
              <img
                src={user.avatar.url || userDefaultImage}
                alt="Profile"
                className="w-24 h-24 rounded-full bg-gray-100 object-cover"
              />
              <h2 className="text-lg sm:text-xl font-semibold mt-4">{user.name}</h2>
              <p className="text-gray-500 text-sm break-all">{user.email}</p>
            </div>

            {/* Menu */}
            <ul className="divide-y divide-gray-200 text-sm">
              {[
                { to: "/myaccount", icon: <RxDashboard />, label: "Dashboard" },
                { to: "details", icon: <RiAccountPinCircleLine />, label: "Account Details" },
                { to: "myorders", icon: <IoBagCheckOutline />, label: "Orders" },
                { to: "mywishlist", icon: <FaRegHeart />, label: "Wishlist" },
                { to: "myaddresses", icon: <FaRegAddressBook />, label: "Addresses" },
                { to: "/", icon: <IoLogOutOutline />, label: "Logout" },
              ].map((item, index) => (
                <Link to={item.to} key={index}>
                  <li className="flex items-center px-4 sm:px-6 py-3 gap-3 text-gray-600 hover:bg-gray-50 cursor-pointer hover:text-black">
                    {item.icon} {item.label}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>

        {/* Dashboard Outlet Area */}
        <div className="lg:col-span-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
