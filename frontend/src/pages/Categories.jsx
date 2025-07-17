import React from "react";
import Banner from "../components/Banner";
import banner1 from "../assets/footwear-1.jpg";
import banner2 from "../assets/footwear-2.jpg";
import banner3 from "../assets/footwear-3.jpg";
import banner4 from "../assets/footwear-4.jpg";
import Title from "../components/Title";

const Categories = () => {
  const items = [
    { title: "BAGS", src: banner1, span: "col-span-2 row-span-2" },
    { title: "DRESSES", src: banner2, span: "col-span-2 row-span-3" },
    {
      title: "SHIRTS & BLOUSES",
      src: banner3,
      span: "col-span-2 row-span-2",
    },
    { title: "TROUSERS", src: banner4, span: "col-span-1 row-span-1" },
    { title: "JEWELRY", src: banner1, span: "col-span-1 row-span-2" },
    { title: "SHOES", src: banner2, span: "col-span-1 row-span-1" },
    { title: "SKIRTS", src: banner3, span: "col-span-2 row-span-1" },
    {
      title: "T-SHIRTS & TOPS",
      src: banner4,
      span: "col-span-2 row-span-2",
    },
    { title: "SHORTS", src: banner2, span: "col-span-1 row-span-1" },
    { title: "SUNGLASSES", src: banner1, span: "col-span-1 row-span-1" },
    {
      title: "JACKETS & COATS",
      src: banner3,
      span: "col-span-1 row-span-1",
    },
    { title: "KNITWEAR", src: banner4, span: "col-span-1 row-span-1" },
  ];

  return (
    <div className="py-8 container border-b border-gray-300">
      <Title
        title="Categories"
        discription="Choose from different Categories"
      />
      <div className="grid grid-cols-4 gap-4 auto-rows-[150px]">
        {items.map((item, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-xl shadow-md ${item.span}`}
          >
            <img
              src={item.src}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h2 className="text-white text-lg font-bold uppercase text-center px-2">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
