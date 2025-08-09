import React from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegAddressBook } from "react-icons/fa";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const cardClasses =
    "group relative p-6 sm:p-8 rounded-3xl border border-gray-100 bg-gradient-to-br from-white via-gray-50 to-white text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer overflow-hidden backdrop-blur-sm";

  const iconClasses = "text-5xl sm:text-6xl mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:text-blue-600";
  const titleClasses = "text-lg sm:text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-700 transition-colors duration-300";
  const descriptionClasses = "text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage your account and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          <Link to={"/myaccount/myorders"} className="block">
            <div className={cardClasses}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <IoBagCheckOutline className={iconClasses} />
                <h2 className={titleClasses}>My Orders</h2>
                <p className={descriptionClasses}>
                  Track and view your complete order history with detailed status updates
                </p>
              </div>
            </div>
          </Link>

          <Link to={"/myaccount/mywishlist"} className="block">
            <div className={cardClasses}>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <FaRegHeart className={iconClasses} />
                <h2 className={titleClasses}>Wishlist</h2>
                <p className={descriptionClasses}>
                  Save and organize your favorite items for future purchases
                </p>
              </div>
            </div>
          </Link>

          <Link to={"/myaccount/myaddresses"} className="block">
            <div className={cardClasses}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <FaRegAddressBook className={iconClasses} />
                <h2 className={titleClasses}>Addresses</h2>
                <p className={descriptionClasses}>
                  Manage your shipping and billing addresses securely
                </p>
              </div>
            </div>
          </Link>

          <Link to={"/myaccount/details"} className="block">
            <div className={cardClasses}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <RiAccountPinCircleLine className={iconClasses} />
                <h2 className={titleClasses}>Account Details</h2>
                <p className={descriptionClasses}>
                  Update your profile information and account preferences
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
