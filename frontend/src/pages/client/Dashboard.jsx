import React from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegAddressBook } from "react-icons/fa";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const cardClasses =
    "p-4 sm:p-6 rounded-2xl border border-gray-200 bg-white text-center shadow-sm hover:shadow-md transition flex items-center justify-center hover:text-gray-700 cursor-pointer";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-6">
      <Link to={"/myaccount/myorders"}>
        <div className={cardClasses}>
          <div>
            <IoBagCheckOutline className="text-4xl sm:text-5xl mb-3 mx-auto" />
            <h2 className="text-md sm:text-lg font-semibold">Orders</h2>
            <p className="text-xs sm:text-sm mt-1">
              Check the history of all your orders
            </p>
          </div>
        </div>
      </Link>

      <Link to={"/myaccount/mywishlist"}>
        <div className={cardClasses}>
          <div>
            <FaRegHeart className="text-4xl sm:text-5xl mb-3 mx-auto" />
            <h2 className="text-md sm:text-lg font-semibold">Wishlist</h2>
            <p className="text-xs sm:text-sm mt-1">Check your Wishlist</p>
          </div>
        </div>
      </Link>

      <Link to={"/myaccount/myaddresses"}>
        <div className={cardClasses}>
          <div>
            <FaRegAddressBook className="text-4xl sm:text-5xl mb-3 mx-auto" />
            <h2 className="text-md sm:text-lg font-semibold">Address</h2>
            <p className="text-xs sm:text-sm mt-1">
              View and manage your shipping addresses
            </p>
          </div>
        </div>
      </Link>

      <Link to={"/myaccount/details"}>
        <div className={cardClasses}>
          <div>
            <RiAccountPinCircleLine className="text-4xl sm:text-5xl mb-3 mx-auto" />
            <h2 className="text-md sm:text-lg font-semibold">Account Details</h2>
            <p className="text-xs sm:text-sm mt-1">
              Update your personal details
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
