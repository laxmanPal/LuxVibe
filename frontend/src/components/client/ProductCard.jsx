import React from "react";

import { MdOutlineShoppingCart } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Button } from "@mui/material";
import { convertUsdToInr } from "../../config/currency-converter";
import { useCartCtx } from "../../store/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({
  image,
  title,
  price,
  discountPrice,
  productId,
}) {
  const { addToCart } = useCartCtx();
  return (
    <div className="card-product relative p-4 w-full max-w-xs cursor-pointer group">
      {/* Link wrapping image and buttons */}
      <Link
        to={`/product/${productId}`}
        className="block relative rounded-xl bg-gray-100 overflow-hidden"
      >
        <img
          className="img-product w-full h-auto object-contain transition-transform duration-300 group-hover:scale-110"
          src={image}
          alt="image-product"
          loading="lazy"
        />

        {/* Action buttons: absolute overlay, hidden by default, fade in on hover */}
        <ul
          className="  list-product-btn
    absolute inset-0
    flex items-center justify-center gap-3
    bg-black/20
    opacity-0
    translate-y-6
    scale-90
    pointer-events-none
    group-hover:opacity-100
    group-hover:translate-y-0
    group-hover:scale-100
    group-hover:pointer-events-auto
    transition-all duration-300 ease-in-out"
        >
          <li>
            <Tooltip arrow title="Add to Cart" placement="top">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart({ productId, quantity: 1 });
                }}
                className="!bg-white !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black"
                size="small"
              >
                <MdOutlineShoppingCart />
              </Button>
            </Tooltip>
          </li>
          <li>
            <Tooltip arrow title="Add to Wishlist" placement="top">
              <Button
                onClick={(e) => e.stopPropagation()}
                className="!bg-white !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black"
                size="small"
              >
                <FaRegHeart />
              </Button>
            </Tooltip>
          </li>
          <li>
            <Tooltip arrow title="View" placement="top">
              <Button
                onClick={(e) => e.stopPropagation()}
                className="!bg-white !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black"
                size="small"
              >
                <MdOutlineRemoveRedEye />
              </Button>
            </Tooltip>
          </li>
        </ul>
      </Link>

      {/* Product info outside link so only image area navigates */}
      <div className="card-product-info mt-4 text-center">
        <Link
          to={`/product/${productId}`}
          className="name-product link text-md font-medium text-gray-900 hover:underline"
        >
          {title}
        </Link>
        <p className="price-wrap flex justify-center items-center gap-2 mt-1">
          <span className="price-new text-red-500 font-semibold">
            {convertUsdToInr(discountPrice)}
          </span>
          <span className="price-old line-through text-gray-400 text-sm">
            {convertUsdToInr(price)}
          </span>
        </p>
      </div>
    </div>
  );
}
