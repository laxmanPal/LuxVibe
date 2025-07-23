import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? "ml-[18%]" : "ml-[5%]"
        }`}
      >
        {/* Header */}

        <Header toggleSidebar={() => setIsOpen(!isOpen)} />
        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-100 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
