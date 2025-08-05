import React from "react";
import QuantityBox from "../../components/client/QuantityBox";
import { RxCross2 } from "react-icons/rx";
import { Button, IconButton, Tooltip } from "@mui/material";
import logo from "../../assets/logo-2.png";
import { useCartCtx } from "../../store/CartContext";
import { convertUsdToInr } from "../../config/currency-converter";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  const { cart, updateCartQuantity, removeCartItem, clearCart } = useCartCtx();
  const cartItems = cart?.items || [];

  // Calculate subtotal (sum of quantity * price)
  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.product.discountPrice;
  }, 0);
  return (
    <div className="py-8 container border-b border-gray-300">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>{" "}
        <Button
          onClick={() => clearCart()}
          className="   !text-white !rounded-lg text-center font-medium gap-3  !bg-black !p-2"
        >
          <RiDeleteBin6Line className="text-xl" />
          Clear Cart
        </Button>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="overflow-x-auto  bg-white rounded-lg shadow">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
                <tr>
                  <th className="p-4">Sr No.</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Remove</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => {
                    if (!item.product) return null; // <-- Skip invalid cart items

                    const itemTotal =
                      item.quantity * item.product.discountPrice;
                    return (
                      <tr key={item.product._id}>
                        <td className="p-4">{index + 1}</td>
                        <td className="p-4">
                          <img
                            src={
                              item.product.images?.[0]?.url ||
                              "/placeholder.jpg"
                            } // optional fallback
                            alt="Product"
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="p-4 font-medium">{item.product.name}</td>
                        <td className="p-4">
                          {convertUsdToInr(item.product.discountPrice)}
                        </td>
                        <td className="p-4">
                          <QuantityBox
                            quantity={item.quantity}
                            setQuantity={(newQty) =>
                              updateCartQuantity(
                                item.product._id,
                                newQty,
                                item.size
                              )
                            }
                          />
                        </td>
                        <td className="p-4">{convertUsdToInr(itemTotal)}</td>
                        <td className="p-4 text-center">
                          <Tooltip title="Remove" arrow>
                            <IconButton
                              onClick={() => removeCartItem(item.product._id)}
                            >
                              <RxCross2 className="text-[25px] text-black" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="p-4 text-center text-gray-500" colSpan={7}>
                      No Items In Cart
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="sticky top-20 self-start h-fit">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{convertUsdToInr(subtotal)}</span>
            </div>
            {/* <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>$5.00</span>
            </div> */}
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{convertUsdToInr(subtotal)}</span>
            </div>

            <Button className="!mt-6   !py-3 hover:bg-gray-900 transition w-full  !bg-black !text-white !rounded-lg text-center font-medium hover:opacity-80 ">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
