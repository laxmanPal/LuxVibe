import React from "react";
import { Link, Outlet } from "react-router-dom";
import banner from "../assets/footwear-1.jpg";
import logo from "../assets/logo-3.png";

const AuthLayout = () => {
  return (
    <div className="w-screen min-h-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Sticky Images Section */}
        <div className="hidden md:block sticky top-0 h-screen overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <img
              src={banner}
              alt="Main Product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Scrollable Form */}
        <div className="auth-form bg-gray-100 min-h-screen md:h-screen overflow-y-auto flex items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center px-4 py-8">
            <Link to={"/"}>
              <img
                className="mb-8 w-48 sm:w-56 md:w-80"
                src={logo}
                alt="Logo"
              />
            </Link>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
