import React from "react";

const StatsCard = ({icon , title , count}) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-gray-200 rounded-full text-3xl">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h2 className="text-2xl font-bold text-gray-800">{count}</h2>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
