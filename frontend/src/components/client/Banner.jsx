import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function Banner({
  item_classes,
  banner_title,
  btn_title,
  btn_classes,
  banner_image,
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 ${item_classes}`}>
      <div className="w-full h-full min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">
        <img
          src={banner_image}
          alt={banner_title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent group-hover:from-black/60 group-hover:via-black/30 transition-all duration-300"></div>
      
      {/* Content */}
      <div className="absolute top-6 left-6 lg:top-8 lg:left-8 text-white z-10 space-y-4 lg:space-y-6">
        <h2 className="text-2xl lg:text-4xl font-bold leading-tight drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
          {banner_title}
        </h2>
        
        <button className={`inline-flex items-center gap-2 bg-white text-black px-6 py-3 lg:px-8 lg:py-4 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm lg:text-base ${btn_classes}`}>
          {btn_title} 
          <FiArrowUpRight className="text-lg lg:text-xl group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>
      
      {/* Decorative Element */}
      <div className="absolute bottom-6 right-6 w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
        <FiArrowUpRight className="text-white text-xl" />
      </div>
    </div>
  );
}
