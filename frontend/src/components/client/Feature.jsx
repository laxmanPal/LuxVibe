import React from "react";

const Feature = ({ icon, title, description }) => {
  return (
    <div className="feature flex flex-col items-center p-4 rounded-lg hover:shadow-lg transition duration-300 bg-white">
      <div className="box-icon w-14 h-14 flex items-center justify-center rounded-full border border-gray-300 bg-gray-50 mb-3 text-2xl text-gray-700">
        {icon}
      </div>
      <div className="content">
        <div className="title font-semibold text-base text-gray-800">
          {title}
        </div>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};

export default Feature;
