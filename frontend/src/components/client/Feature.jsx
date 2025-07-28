import React from "react";

const Feature = ({ icon, title, discription }) => {
  return (
    <div className="feature  flex flex-col items-center">
      <div className="box-icon w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 mb-4 text-2xl">
        {icon}
      </div>
      <div className="content">
        <div className="title font-semibold text-lg"> {title} </div>
        <p className="text-gray-500 text-sm mt-1">{discription}</p>
      </div>
    </div>
  );
};

export default Feature;
