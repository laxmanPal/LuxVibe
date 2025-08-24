import React from "react";
import QuantityBox from "../../components/client/QuantityBox";
import { RxCross2 } from "react-icons/rx";
import { Button, IconButton, Tooltip } from "@mui/material";
import logo from "../../assets/logo-2.png";
import { useCartCtx } from "../../store/CartContext";
import { FaRegHeart } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { currencyFormatter } from "../../config/currency-formatter";
import { MdOutlineShoppingCart } from "react-icons/md";
import getProductImage from "../../utils/productImagePlaceholder";

const Cart = () => {
  const { cart, updateCartQuantity, removeCartItem, clearCart } = useCartCtx();
  const cartItems = cart?.items || [];

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.product.discountPrice;
  }, 0);

  const totalDiscount = cartItems.reduce((acc, item) => {
    return (
      acc + item.quantity * (item.product.price - item.product.discountPrice)
    );
  }, 0);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shopping Cart</h2>
            <p className="text-gray-600 mt-1">
              {cartItems.length > 0
                ? `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`
                : 'Your cart is empty'
              }
            </p>
          </div>

          {cartItems.length > 0 && (
            <Button
              onClick={clearCart}
              className="!text-white !rounded-lg !font-medium !gap-2 !bg-red-600 hover:!bg-red-700 !px-4 !py-2.5 !transition-all !duration-200 !shadow-md hover:!shadow-lg"
            >
              <RiDeleteBin6Line className="text-lg" />
              Clear Cart
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <MdOutlineShoppingCart className="text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
            <Link to="/shop">
              <Button className="!bg-blue-600 hover:!bg-blue-700 !text-white !px-6 !py-3 !rounded-lg !font-semibold !transition-all !duration-200">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col xl:flex-row gap-8">

            {/* Cart Items Section */}
            <div className="xl:flex-1">

              {/* Desktop Table View */}
              <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cartItems.map((item, index) => {
                        if (!item.product) return null;
                        const itemTotal = item.quantity * item.product.discountPrice;
                        const savings = item.quantity * (item.product.price - item.product.discountPrice);

                        return (
                          <tr key={item.product._id} className="hover:bg-gray-50 transition-colors duration-150">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-4">
                                <img
                                  src={getProductImage(item.product)}
                                  alt={item.product.name}
                                  className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                                />
                                <div className="max-w-xs">
                                  <div className="text-sm font-semibold text-gray-900 line-clamp-2">
                                    {item.product.name}
                                  </div>
                                  {savings > 0 && (
                                    <div className="text-xs text-green-600 mt-1">
                                      Save {currencyFormatter(savings)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-gray-900">
                                {currencyFormatter(item.product.discountPrice)}
                              </div>
                              {item.product.price > item.product.discountPrice && (
                                <div className="text-xs text-gray-500 line-through">
                                  {currencyFormatter(item.product.price)}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <QuantityBox
                                quantity={item.quantity}
                                setQuantity={(newQty) =>
                                  updateCartQuantity(item.product._id, newQty, item.size)
                                }
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                              {currencyFormatter(itemTotal)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Tooltip title="Remove from cart" arrow>
                                <IconButton
                                  onClick={() => removeCartItem(item.product._id)}
                                  size="small"
                                  className="!p-2 hover:!bg-red-50"
                                >
                                  <RxCross2 className="text-lg text-red-600" />
                                </IconButton>
                              </Tooltip>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile/Tablet Card View */}
              <div className="lg:hidden space-y-4">
                {cartItems.map((item, index) => {
                  if (!item.product) return null;
                  const itemTotal = item.quantity * item.product.discountPrice;
                  const savings = item.quantity * (item.product.price - item.product.discountPrice);

                  return (
                    <div
                      key={item.product._id}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={getProductImage(item.product)}
                            alt={item.product.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-gray-200"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900 text-base line-clamp-2 pr-2">
                              {item.product.name}
                            </h3>
                            <Tooltip title="Remove from cart" arrow>
                              <IconButton
                                onClick={() => removeCartItem(item.product._id)}
                                size="small"
                                className="!p-1.5 hover:!bg-red-50 flex-shrink-0"
                              >
                                <RxCross2 className="text-lg text-red-600" />
                              </IconButton>
                            </Tooltip>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm">
                              <div className="font-semibold text-gray-900">
                                {currencyFormatter(item.product.discountPrice)}
                              </div>
                              {item.product.price > item.product.discountPrice && (
                                <div className="text-gray-500 line-through text-xs">
                                  {currencyFormatter(item.product.price)}
                                </div>
                              )}
                            </div>

                            {savings > 0 && (
                              <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded inline-block">
                                You save {currencyFormatter(savings)}
                              </div>
                            )}

                            <div className="flex gap-4 flex-col">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Qty:</span>
                                <QuantityBox
                                  quantity={item.quantity}
                                  setQuantity={(newQty) =>
                                    updateCartQuantity(item.product._id, newQty, item.size)
                                  }
                                />
                              </div>
                              <div className="font-bold text-gray-900">
                                {currencyFormatter(itemTotal)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart Summary Sidebar */}
            <div className="xl:w-96">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
                  <span className="text-sm text-gray-500">{totalItems} items</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{currencyFormatter(subtotal)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600 font-medium">
                      - {currencyFormatter(totalDiscount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taxes & charges</span>
                    <span className="font-medium">{currencyFormatter(0)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">
                      {currencyFormatter(totalPrice)}
                    </span>
                  </div>

                  {totalDiscount > 0 && (
                    <div className="text-sm text-green-600 mt-2">
                      You saved {currencyFormatter(totalDiscount)} on this order!
                    </div>
                  )}
                </div>

                <Link to="/checkout" className="block">
                  <Button className="!w-full !py-4 !bg-blue-600 hover:!bg-blue-700 !text-white !rounded-lg !font-semibold !text-base !shadow-md hover:!shadow-lg !transition-all !duration-200">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link to="/products" className="block mt-3">
                  <Button className="!w-full !py-3 !bg-gray-100 hover:!bg-gray-200 !text-gray-800 !rounded-lg !font-medium !transition-all !duration-200">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure checkout guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
