import React from "react";

const StatsCard = ({ icon, title, count, color = "bg-blue-500", trend }) => {
  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className={`p-2 sm:p-3 ${color} rounded-lg sm:rounded-xl text-white text-xl sm:text-2xl shadow-sm`}>
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wide">
                {title}
              </p>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 truncate">
                {count}
              </h2>
              {trend && (
                <div className="flex items-center mt-1">
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                    {trend}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10 rounded-xl overflow-hidden">
          <div className={`w-full h-full ${color} transform rotate-12 scale-150`}></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
