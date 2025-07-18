import React from 'react'
import { FiArrowUpRight } from "react-icons/fi";

export default function Banner({item_classes  , banner_title , btn_title , btn_classes , banner_image}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden ` + item_classes}>
                  <div className="image overflow-hidden h-[100%]">
                    <img
                      src={banner_image}
                      alt="banner"
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="content absolute top-6 left-6 text-white z-10">
                    <div className="box-title text-3xl font-semibold mb-4">
                      <div className="">{banner_title}</div>
                    </div>
                    <div className="box-btn">
                    <button className={`flex bg-white text-black items-center gap-2 px-4 py-2 font-semibold rounded-full hover:bg-gray-200 transition cursor-pointer ` +  btn_classes}>{btn_title} <FiArrowUpRight/> </button>
                    </div>
                  </div>
                </div>
  )
}