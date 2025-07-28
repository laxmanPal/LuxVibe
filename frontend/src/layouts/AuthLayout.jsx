import React from "react";
import { Link, Outlet } from "react-router-dom";
import banner from "../assets/footwear-1.jpg";
import logo from "../assets/logo-3.png";

const AuthLayout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Sticky Images Section */}
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="flex items-center justify-center h-full">
            <img
              src={banner}
              alt="Main Product"
              className="w-full h-full object-cover aspect-square"
            />
          </div>
        </div>

        {/* Scrollable Form */}
        <div className="auth-from bg-gray-100 h-screen overflow-y-auto flex items-center justify-center">
          <div className=" w-full flex flex-col items-center justify-center px-4 py-8">
            <Link to={"/"}>
              <img className="mb-8 w-80" src={logo} alt="" />
            </Link>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
