import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import MyAddresses from "./MyAddresses";
const API_URL = import.meta.env.VITE_API_URL;
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AddressCard from "../../components/client/AddressCard";
import { useCartCtx } from "../../store/CartContext";
import { currencyFormatter } from "../../config/currency-formatter";
import stripeCheckout from "../../payments/StripeCheckout";
import { useAddressCtx } from "../../store/AddressContext";
import getProductImage from "../../utils/productImagePlaceholder";

const Checkout = () => {
  const { addresses, selectedAddressId } = useAddressCtx();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { cart } = useCartCtx();
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

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId);

  const handlePayment = () => {
    if (!selectedAddressId) {
      toast.error("Please select an address");
      return;
    }
    stripeCheckout({ cartItems, shippingInfo: selectedAddress });
  };

  return (
    <div className="py-8 container border-b border-gray-300">
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
        <MyAddresses />
        {/* Order Summary */}
        <div className="sticky top-20 self-start h-fit">
          <div className="bg-white rounded-lg shadow p-6">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold mb-4">Review your cart</h2>
                <span className="text-sm text-gray-500">
                  {totalItems} items
                </span>
              </div>
              <div className="space-y-4">
                {cart.items?.map((item) => {
                  const itemTotal = item.quantity * item.product.discountPrice;
                  return (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="w-24 h-24 sm:w-15 sm:h-15 rounded-lg object-cover border border-gray-200 shadow-sm"
                          src={getProductImage(item.product)}
                          alt={item.product.name}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between flex-1 gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 mb-2">
                            {item.product.name}
                          </h4>
                          <span className="text-sm font-semibold text-indigo-600">
                            {currencyFormatter(item.product.discountPrice)}
                          </span>
                          <span className="text-xs text-gray-500 line-through">
                            {currencyFormatter(item.product.price)}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-500">Qty:</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center items-start sm:items-end">
                          <span className="text-xs text-gray-500 mb-1">
                            Item Total
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            {currencyFormatter(itemTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {currencyFormatter(subtotal)}
                  </span>
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
            </div>

            {/* <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>$5.00</span>
            </div> */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total
                </span>
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

            <Button
              onClick={handlePayment}
              className="!w-full !py-4 !bg-blue-600 hover:!bg-blue-700 !text-white !rounded-lg !font-semibold !text-base !shadow-md hover:!shadow-lg !transition-all !duration-200 "
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
