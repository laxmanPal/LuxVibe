import React from "react";
import QuantityBox from "../../components/client/QuantityBox";
import { Button, IconButton, Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/logo-2.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useWishlistCtx } from "../../store/WishListContext";
import { useCartCtx } from "../../store/CartContext";
import { currencyFormatter } from "../../config/currency-formatter";

const MyWishlist = () => {
  const { wishlist, removeWishlistItem } = useWishlistCtx();
  const { addToCart } = useCartCtx();
  const wishlistItems = wishlist?.items || [];

  const handleAddToCart = async ({ productId, quantity }) => {
    await addToCart({ productId, quantity });
    removeWishlistItem(productId);
  };

  return (
    <div className="w-full min-h-full py-8 md:col-span-2 px-4 md:px-0">
      <h2 className="text-3xl font-semibold mb-8 text-center md:text-left">My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-20 border border-gray-200 rounded-md shadow-sm bg-white">
          No Items In Wishlist
        </div>
      ) : (
        <>
          {/* Large screen table */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="p-4 text-left">Sr No.</th>
                  <th className="p-4 text-left">Product</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-center">Action</th>
                  <th className="p-4 text-center">Remove</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 divide-y divide-gray-200">
                {wishlistItems.map((item, index) => (
                  <tr key={item.product._id} className="hover:bg-gray-50 transition">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <img
                        src={item.product.images?.[0]?.url || "/placeholder.jpg"}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-4 font-medium">{item.product.name}</td>
                    <td className="p-4">
                      <div>
                        <span className="font-semibold text-lg">
                          {currencyFormatter(item.product.discountPrice)}
                        </span>
                      </div>
                      <div>
                        <span className="line-through text-xs text-gray-400">
                          {currencyFormatter(item.product.price)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Tooltip title="Add to cart" arrow>
                        <IconButton
                          onClick={() =>
                            handleAddToCart({ productId: item.product._id, quantity: 1 })
                          }
                          aria-label="Add to cart"
                          size="small"
                        >
                          <MdOutlineShoppingCart className="text-black text-xl" />
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td className="p-4 text-center">
                      <Tooltip title="Remove" arrow>
                        <IconButton
                          onClick={() => removeWishlistItem(item.product._id)}
                          aria-label="Remove item"
                          size="small"
                        >
                          <RxCross2 className="text-black text-xl" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Small screen cards */}
          <div className="md:hidden grid grid-cols-1 gap-6">
            {wishlistItems.map((item, index) => (
              <div
                key={item.product._id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4"
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.product.images?.[0]?.url || "/placeholder.jpg"}
                    alt={item.product.name}
                    className="w-24 h-24 rounded object-cover"
                  />
                </div>
                <div className="flex-grow w-full">
                  <h3 className="font-semibold text-lg">{item.product.name}</h3>
                  <div className="text-gray-700 mt-1">
                    <span className="font-semibold text-xl">
                      {currencyFormatter(item.product.discountPrice)}
                    </span>{" "}
                    <span className="line-through text-sm text-gray-400 ml-2">
                      {currencyFormatter(item.product.price)}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-3">
                    <Tooltip title="Add to cart" arrow>
                      <IconButton
                        onClick={() =>
                          handleAddToCart({ productId: item.product._id, quantity: 1 })
                        }
                        aria-label="Add to cart"
                        size="small"
                      >
                        <MdOutlineShoppingCart className="text-black text-xl" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove" arrow>
                      <IconButton
                        onClick={() => removeWishlistItem(item.product._id)}
                        aria-label="Remove item"
                        size="small"
                      >
                        <RxCross2 className="text-black text-xl" />
                      </IconButton>
                    </Tooltip>
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
