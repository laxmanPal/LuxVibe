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
    <div className="w-full h-full py-8  md:col-span-2">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
      <div className="overflow-x-auto  bg-white rounded-lg shadow">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
            <tr>
              <th className="p-4">Sr No.</th>
              <th className="p-4">Product</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Action</th>
              <th className="p-4">Remove</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item, index) => (
                <tr key={item.product._id}>
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">
                    <img
                      src={item.product.images?.[0]?.url || "/placeholder.jpg"}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-4 font-medium">{item.product.name}</td>
                  <td className="p-4">
                    {currencyFormatter(item.product.discountPrice)} <br />
                    <span className="line-through text-xs">
                      {currencyFormatter(item.product.price)}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Tooltip title="Add to cart" arrow>
                      <IconButton
                        onClick={() =>
                          handleAddToCart({
                            productId: item.product._id,
                            quantity: 1,
                          })
                        }
                      >
                        <MdOutlineShoppingCart className=" text-black" />
                      </IconButton>
                    </Tooltip>
                  </td>
                  <td className="p-4 text-center">
                    <Tooltip title="Remove" arrow>
                      <IconButton
                        onClick={() => removeWishlistItem(item.product._id)}
                      >
                        <RxCross2 className="text-[25px] text-black" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={7}>
                  No Items In Wishlist
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWishlist;
