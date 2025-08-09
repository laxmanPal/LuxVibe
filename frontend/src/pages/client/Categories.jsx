import React from "react";
import Banner from "../../components/client/Banner";
import banner1 from "../../assets/footwear-1.jpg";
import banner2 from "../../assets/footwear-2.jpg";
import banner3 from "../../assets/footwear-3.jpg";
import banner4 from "../../assets/footwear-4.jpg";
import Title from "../../components/client/Title";
import { useCategoryCtx } from "../../store/CategoryContext";
import { Link } from "react-router-dom";
import FetchingData from "../../components/UI/FetchingData";

const Categories = () => {
  const { categories, fetching } = useCategoryCtx();

  const items = [
    { span: "col-span-2 row-span-2" },
    { span: "col-span-2 row-span-3" },
    { span: "col-span-2 row-span-2" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-1 row-span-2" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-2 row-span-1" },
    { span: "col-span-2 row-span-2" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-1 row-span-1" },
    { span: "col-span-1 row-span-1" },
  ];

  return (
    <div className="py-8 container border-b border-gray-300">
      <Title
        title="Categories"
        discription="Choose from different Categories"
      />

      {fetching ? (
        <FetchingData title={"Getiing Categories"} />
      ) : categories && categories.length > 0 ? (
        <div
          className="
          grid 
          grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 
          gap-4 
          auto-rows-[150px] sm:auto-rows-[180px] lg:auto-rows-[200px]
        "
        >
          {categories.map((category, index) => (
            <Link
              key={category._id}
              className={`relative overflow-hidden rounded-xl shadow-md 
              sm:${items[index]?.span || ""}
            `}
              to={`/category/${category.slug}`}
            >
              <img
                src={category.images[0]?.url}
                alt={category.name}
                className="w-full h-full object-cover sm:object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h2 className="text-white text-sm sm:text-lg font-bold uppercase text-center px-2">
                  {category.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div> No Categories </div>
      )}
    </div>
  );
};

export default Categories;
