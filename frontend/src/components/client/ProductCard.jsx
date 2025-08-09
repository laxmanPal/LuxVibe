import React from "react";

import { MdOutlineShoppingCart } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Button } from "@mui/material";
import { useCartCtx } from "../../store/CartContext";
import { Link } from "react-router-dom";
import { useWishlistCtx } from "../../store/WishListContext";
import { currencyFormatter } from "../../config/currency-formatter";

export default function ProductCard({
  image,
  title,
  price,
  discountPrice,
  productId,
}) {
  const { addToCart } = useCartCtx();
  const { addToWishlist } = useWishlistCtx();
  
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-gray-200">
      {/* Image Container */}
      <Link
        to={`/product/${productId}`}
        className="block relative bg-gradient-to-br from-gray-50 to-gray-100 aspect-square overflow-hidden"
      >
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={image}
          alt={title}
          loading="lazy"
        />

        {/* Overlay with Action Buttons */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300">
          <ul className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto">
            <li>
              <Tooltip arrow title="Add to Cart" placement="top">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCart({ productId, quantity: 1 });
                  }}
                  className="!bg-white/95 !backdrop-blur-sm !w-12 !min-w-12 !h-12 !rounded-full !text-gray-700 !shadow-lg hover:!bg-white hover:!shadow-xl hover:!scale-110 !transition-all !duration-200"
                  size="small"
                >
                  <MdOutlineShoppingCart className="text-lg" />
                </Button>
              </Tooltip>
            </li>
            <li>
              <Tooltip arrow title="Add to Wishlist" placement="top">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToWishlist({ productId });
                  }}
                  className="!bg-white/95 !backdrop-blur-sm !w-12 !min-w-12 !h-12 !rounded-full !text-red-500 !shadow-lg hover:!bg-white hover:!shadow-xl hover:!scale-110 !transition-all !duration-200"
                  size="small"
                >
                  <FaRegHeart className="text-lg" />
                </Button>
              </Tooltip>
            </li>
            <li>
              <Tooltip arrow title="Quick View" placement="top">
                <Button
                  onClick={(e) => e.stopPropagation()}
                  className="!bg-white/95 !backdrop-blur-sm !w-12 !min-w-12 !h-12 !rounded-full !text-gray-700 !shadow-lg hover:!bg-white hover:!shadow-xl hover:!scale-110 !transition-all !duration-200"
                  size="small"
                >
                  <MdOutlineRemoveRedEye className="text-lg" />
                </Button>
              </Tooltip>
            </li>
          </ul>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 space-y-3">
        <Link
          to={`/product/${productId}`}
          className="block"
        >
          <h3 className="text-gray-800 font-semibold text-base leading-tight line-clamp-2 hover:text-blue-600 transition-colors duration-200 min-h-[2.5rem]">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-center gap-3">
          <span className="text-xl font-bold text-red-500">
            {currencyFormatter(discountPrice)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {currencyFormatter(price)}
          </span>
        </div>
      </div>
    </div>
  );
}
