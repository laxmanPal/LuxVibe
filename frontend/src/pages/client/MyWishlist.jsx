import React from "react";
import QuantityBox from "../../components/client/QuantityBox";
import { Button, IconButton, Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/logo-2.png";
import defaultProductImage from "../../assets/products_placeholder_imgs/default.webp";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useWishlistCtx } from "../../store/WishListContext";
import { useCartCtx } from "../../store/CartContext";
import { currencyFormatter } from "../../config/currency-formatter";
import getProductImage from "../../utils/productImagePlaceholder";

const MyWishlist = () => {
  const { wishlist, removeWishlistItem } = useWishlistCtx();
  const { addToCart } = useCartCtx();
  const wishlistItems = wishlist?.items || [];

  const handleAddToCart = async ({ productId, quantity }) => {
    await addToCart({ productId, quantity });
    removeWishlistItem(productId);
  };

  return (
    <div className="w-full min-h-full py-6 md:py-8 md:col-span-2">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              My Wishlist
            </h2>
            <p className="text-gray-600">
              {wishlistItems.length > 0
                ? `${wishlistItems.length} ${wishlistItems.length === 1 ? 'item' : 'items'} saved for later`
                : 'Save your favorite items here'
              }
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <div className="hidden sm:block">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>
          )}
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-6">Start adding items you love to your wishlist</p>
          <div className="inline-flex items-center text-sm text-indigo-600 font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Browse products to add to wishlist
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table - Large screens only */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-100">
            <table className="min-w-full bg-white">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sr No.
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700 divide-y divide-gray-200">
                {wishlistItems.map((item, index) => (
                  <tr key={item.product._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={getProductImage(item.product)}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl border border-gray-200 shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {item.product.name}
                        </h3>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 w-fit">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          In Stock
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-lg text-gray-900">
                          {currencyFormatter(item.product.discountPrice)}
                        </span>
                        <span className="line-through text-xs text-gray-400">
                          {currencyFormatter(item.product.price)}
                        </span>
                        {item.product.price !== item.product.discountPrice && (
                          <span className="text-xs text-green-600 font-medium">
                            {Math.round(((item.product.price - item.product.discountPrice) / item.product.price) * 100)}% OFF
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Tooltip title="Add to cart" arrow>
                        <IconButton
                          onClick={() =>
                            handleAddToCart({ productId: item.product._id, quantity: 1 })
                          }
                          aria-label="Add to cart"
                          className="!bg-indigo-100 hover:!bg-indigo-200 !text-indigo-700 !rounded-xl !transition-all !duration-200"
                        >
                          <MdOutlineShoppingCart className="text-xl" />
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Tooltip title="Remove" arrow>
                        <IconButton
                          onClick={() => removeWishlistItem(item.product._id)}
                          aria-label="Remove item"
                          className="!bg-red-100 hover:!bg-red-200 !text-red-700 !rounded-xl !transition-all !duration-200"
                        >
                          <RxCross2 className="text-xl" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {wishlistItems.map((item, index) => (
              <div
                key={item.product._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="flex gap-4 p-6">
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.product.images?.[0]?.url || logo}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl border border-gray-200 shadow-sm"
                    />
                    <div className="absolute -top-2 -left-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-base text-gray-900 line-clamp-2 pr-2">
                        {item.product.name}
                      </h3>
                      <Tooltip title="Remove from wishlist" arrow>
                        <IconButton
                          onClick={() => removeWishlistItem(item.product._id)}
                          aria-label="Remove item"
                          size="small"
                          className="!text-red-600 hover:!bg-red-50 !ml-2"
                        >
                          <RxCross2 className="text-lg" />
                        </IconButton>
                      </Tooltip>
                    </div>

                    <div className="mb-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        In Stock
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-gray-900">
                          {currencyFormatter(item.product.discountPrice)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 line-through">
                            {currencyFormatter(item.product.price)}
                          </span>
                          {item.product.price !== item.product.discountPrice && (
                            <span className="text-xs text-green-600 font-medium">
                              {Math.round(((item.product.price - item.product.discountPrice) / item.product.price) * 100)}% OFF
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          handleAddToCart({ productId: item.product._id, quantity: 1 })
                        }
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg text-sm"
                        aria-label="Add to cart"
                      >
                        <MdOutlineShoppingCart className="text-base" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyWishlist;
