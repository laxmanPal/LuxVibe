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
  const {user} = useAuth();
  return (
    <div className="py-8 container border-b border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 flex items-center justify-center p-6">
          <div className="w-80 rounded-xl shadow-md overflow-hidden bg-white border border-gray-300 sticky top-20 self-start h-fit">
            {/* <!-- Profile Header --> */}
            <div className="flex flex-col items-center p-6">
              <img
                src={ user.avatar.url || userDefaultImage}
                alt="Profile"
                className="w-24 h-24 rounded-full bg-gray-100"
              />
              <h2 className="text-xl font-semibold mt-4"> {user.name} </h2>
              <p className="text-gray-500 text-sm"> {user.email} </p>
            </div>

            {/* <!-- Menu --> */}
            <ul className="divide-y divide-gray-200 text-sm">
              <Link to={"/myaccount"}>
                <li className="flex items-center px-6 py-4 gap-3 text-gray-600 hover:bg-gray-50 cursor-pointer hover:text-black">
                  <RxDashboard />
                  Dashboard
                </li>
              </Link>
              <Link to={"details"}>
                <li className="flex items-center px-6 py-4 gap-3 text-gray-600 hover:bg-gray-50 cursor-pointer hover:text-black">
                  <RiAccountPinCircleLine />
                  Account Details
                </li>
              </Link>
              <Link to={"myorders"}>
                <li className="flex items-center px-6 py-4 gap-3 text-gray-600 hover:bg-gray-50 cursor-pointer hover:text-black">
                  <IoBagCheckOutline />
                  Orders
                </li>
              </Link>
              <Link to={"mywishlist"}>
                <li className="flex items-center px-6 py-4 gap-3 text-gray-600 hover:bg-gray-50 cursor-pointer hover:text-black">
                  <FaRegHeart />
                  Wishlist
                </li>
              </Link>
              <Link to={"myaddresses"}>
                <li className="flex items-center px-6 py-4 gap-3 text-gray-600 hover:bg-gray-50 cursor-pointer hover:text-black">
                  <FaRegAddressBook />
                  Addresses
                </li>
              </Link>
              <Link to={"/"}>
                <li className="flex items-center px-6 py-4 gap-3 text-gray-600 hover:bg-gray-50 cursor-pointer hover:text-black">
                  <IoLogOutOutline />
                  Logout
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccount;
