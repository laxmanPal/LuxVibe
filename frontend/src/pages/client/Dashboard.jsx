import React from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegAddressBook } from "react-icons/fa";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="md:col-span-2 grid grid-cols-2 grid-rows-2 gap-4 p-6">
      <Link to={"/myaccount/myorders"}>
        <div className="my-orders col-span-1 row-span-1 p-6 rounded-2xl border border-gray-300 bg-white text-center shadow-sm hover:shadow-md transition flex items-center justify-center hover:text-gray-700 cursor-pointer">
          <div className="p-4">
            <IoBagCheckOutline className="text-5xl mb-4 mx-auto" />
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-sm mt-1">Check the history of all your orders</p>
          </div>
        </div>
      </Link>
      <Link to={"/myaccount/mywishlist"}>
        <div className="my-wishlist col-span-1 row-span-1 p-6 rounded-2xl border border-gray-200 bg-white text-center shadow-sm hover:shadow-md transition flex items-center justify-center hover:text-gray-700 cursor-pointer">
          <div className="p-4">
            <FaRegHeart className="text-5xl mb-4 mx-auto" />
            <h2 className="text-lg font-semibold">Wishlist</h2>
            <p className="text-sm text-black mt-1">Check your Whishlist</p>
          </div>
        </div>
      </Link>
      <Link to={"/myaccount/myaddresses"}>
        <div className="addresses col-span-1 row-span-1 p-6 rounded-2xl border border-gray-200 bg-white text-center shadow-sm hover:shadow-md transition flex items-center justify-center hover:text-gray-700 cursor-pointer">
          <div className="p-4">
            <FaRegAddressBook className="text-5xl mb-4 mx-auto" />
            <h2 className="text-lg font-semibold">Address</h2>
            <p className="text-sm text-black mt-1">
              Check the history of all your orders
            </p>
          </div>
        </div>
      </Link>
      <Link to={"/myaccount/details"}>
        <div className="account-details col-span-1 row-span-1 p-6 rounded-2xl border border-gray-200 bg-white text-center shadow-sm hover:shadow-md transition flex items-center justify-center hover:text-gray-700 cursor-pointer">
          <div className="p-4">
            <RiAccountPinCircleLine className="text-5xl mb-4 mx-auto" />
            <h2 className="text-lg font-semibold">Account Details</h2>
            <p className="text-sm text-black mt-1">
              Check the history of all your orders
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
