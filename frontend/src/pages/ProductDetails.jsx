import product1 from "../assets/footwear-1.jpg";
import product2 from "../assets/footwear-2.jpg";
import product3 from "../assets/footwear-3.jpg";
import product4 from "../assets/footwear-4.jpg";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

import { useState } from "react";
import Features from "../components/Features";
import QuantityBox from "../components/QuantityBox";
import { IconButton } from "@mui/material";

// Array of image URLs
const images = [product1, product2, product3, product4];

export default function ProductDetails() {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="py-8 container border-b border-gray-300">
      <div className="px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Sticky Images Section */}
        <div className="sticky top-20 self-start h-fit">
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 ${
                    mainImage === img
                      ? "opacity-100 grayscale-0 scale-105"
                      : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                  }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-full aspect-square object-cover rounded-xl "
              />
            </div>
          </div>
        </div>

        {/* Scrollable Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <p className="text-sm text-gray-500 font-medium">Reebok</p>
            <h1 className="text-2xl font-semibold ">
              Shoes Reebok Zig Kinetica 3{" "}
              <Chip
                className="!bg-green-200 !text-green-700"
                size="small"
                label="IN STOCK"
              />
            </h1>
          </div>

          <div className="mb-4">
            <p className="text-2xl font-bold mb-2">
              ₹697
              <span className="text-lg font-normal text-green-700 ml-4">
                59% Off
              </span>
            </p>
            <p className="text-sm text-gray-600">
              MRP <span className="line-through">₹1,699</span> Inclusive of all
              taxes
            </p>
          </div>

          <p className="text-gray-600 text-sm mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            obcaecati voluptatibus fugiat quaerat culpa maxime facilis, corporis
            eaque pariatur dolorum maiores esse cum laudantium harum saepe!
            Dicta consequuntur ratione magni.
          </p>

          {/* Sizes */}
          {/* <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Size - EU Men
            </p>
            <div className="flex flex-wrap gap-3">
              {["40.5", "41", "42", "43", "43.5", "44", "44.5", "45", "46"].map(
                (size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border rounded-lg hover:border-black text-sm"
                  >
                    {size}
                  </button>
                )
              )}
            </div>
          </div> */}

          <div className="flex  gap-4">
            {/* Quantity */}
            <QuantityBox />
            {/* Add to Cart */}
            <Button className="w-full  !bg-black !text-white !rounded-lg text-center font-medium gap-3 ">
              <MdOutlineShoppingCart className="text-2xl" />
              Add to cart
            </Button>
            {/* Add to Wishlist */}
            <Button className="w-full !border !border-gray-300  !text-black !rounded-lg text-center font-medium gap-3 ">
              <FaRegHeart className="text-2xl" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
      <Features />
    </div>
  );
}
