import React from "react";

const Feature = ({ icon, title, description }) => {
  return (
    <div className="feature group flex flex-col items-center p-6 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white border border-gray-100 hover:border-gray-200 hover:bg-gray-50">
      <div className="box-icon w-16 h-16 flex items-center justify-center rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 mb-4 text-3xl text-gray-600 group-hover:border-blue-300 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-blue-100 group-hover:text-blue-600 transition-all duration-300 shadow-sm group-hover:shadow-md">
        {icon}
      </div>
      <div className="content text-center">
        <div className="title font-bold text-base text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">
          {title}
        </div>
        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Feature;
