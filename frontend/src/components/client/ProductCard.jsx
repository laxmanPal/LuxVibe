import React from "react";

import { MdOutlineShoppingCart } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Button } from "@mui/material";

export default function ProductCard({ image, title, price }) {
  return (
    <div className="card-product relative  p-4">
      <div className="relative rounded-xl bg-gray-100 p-4 overflow-hidden">
        <img
          className="img-product w-full h-auto object-contain hover:scale-110 transition ease-in-out"
          src={image}
          alt="image-product"
        />

        <ul className="list-product-btn  flex items-center justify-center gap-3">
          <li>
            <Tooltip arrow title="Add to Cart" placement="top">
              <Button
                className=" !bg-white !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black"
                size="small"
              >
                <MdOutlineShoppingCart />
              </Button>
            </Tooltip>
          </li>
          <li className="wishlist">
            <Tooltip arrow title="Add to Wishlist" placement="top">
              <Button
                className=" !bg-white !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black"
                size="small"
              >
                <FaRegHeart />
              </Button>
            </Tooltip>
          </li>
          <li>
            <Tooltip arrow title="View" placement="top">
              <Button
                className=" !bg-white !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black"
                size="small"
              >
                <MdOutlineRemoveRedEye />
              </Button>
            </Tooltip>
          </li>
        </ul>
      </div>

      <div className="card-product-info mt-4 text-center">
        <p className="name-product link text-md font-medium text-gray-900">
          {title}
        </p>
        <p className="price-wrap flex justify-center items-center gap-2 mt-1">
          <span className="price-new text-red-500 font-semibold">{price}</span>
          <span className="price-old line-through text-gray-400 text-sm">
            $145.00
          </span>
        </p>
      </div>
    </div>
  );
}
