import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { currencyFormatter } from "../../config/currency-formatter";
import { Chip } from "@mui/material";
import { useOrderCtx } from "../../store/OrderContext";
import getProductImage from "../../utils/productImagePlaceholder";
const API_URL = import.meta.env.VITE_API_URL;
const Order = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const { fetchOrderById } = useOrderCtx();

  useEffect(() => {
    fetchOrderDetails(orderId);
  }, [orderId]);

  const fetchOrderDetails = async (orderId) => {
    const orderDetails = await fetchOrderById(orderId);
    setOrder(orderDetails);
  };

  const subtotal = order.items?.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);

  const totalDiscount = order.items?.reduce((acc, item) => {
    return (
      acc + item.quantity * (item.product.price - item.product.discountPrice)
    );
  }, 0);

  return (
    <div className="w-full h-full py-6 md:py-8 md:col-span-2">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Order Details
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-sm text-gray-500">
                Order ID: <span className="font-mono font-medium text-gray-700">#{order._id}</span>
              </span>
              <span className="text-sm text-gray-500">
                Placed on: {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : "-"}
              </span>
            </div>
          </div>
          <Chip
            className="!bg-green-100 !text-green-800 !font-semibold !px-4 !py-2"
            label={order.orderStatus}
            size="medium"
          />
        </div>
      </div>

      {/* Order Items Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Order Items</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {order.items?.map((item) => {
              const itemTotal = item.quantity * item.product.discountPrice;
              return (
                <div key={item._id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <img
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover border border-gray-200 shadow-sm"
                      src={getProductImage(item.product)}
                      alt={item.product.name}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between flex-1 gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-900 mb-2">
                        {item.product.name}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-indigo-600">
                            {currencyFormatter(item.product.discountPrice)}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            {currencyFormatter(item.product.price)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-gray-500">Qty:</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-start sm:items-end">
                      <span className="text-xs text-gray-500 mb-1">Item Total</span>
                      <span className="text-xl font-bold text-gray-900">
                        {currencyFormatter(itemTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Address */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Shipping Address
            </h3>
          </div>
          <div className="p-6 space-y-3">
            <div>
              <span className="text-sm text-gray-500 block">Full Name</span>
              <p className="font-medium text-gray-900">
                {order.shippingAddress?.fullName || "Not provided"}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500 block">Street Address</span>
              <p className="font-medium text-gray-900">
                {order.shippingAddress?.streetAddress || "Not provided"}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500 block">City</span>
                <p className="font-medium text-gray-900">
                  {order.shippingAddress?.city || "Not provided"}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500 block">Pincode</span>
                <p className="font-medium text-gray-900">
                  {order.shippingAddress?.pincode || "Not provided"}
                </p>
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-500 block">Country</span>
              <p className="font-medium text-gray-900">
                {order.shippingAddress?.country || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Order Summary
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4 text-gray-800">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{currencyFormatter(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center py-2 text-green-700">
                <span>Discount</span>
                <span className="font-medium">- {currencyFormatter(totalDiscount)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Taxes & Charges</span>
                <span className="font-medium">{currencyFormatter(order.taxAmount || 0)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Delivery Charge</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>
              <hr className="border-gray-200 my-4" />
              <div className="flex justify-between items-center py-3 bg-gray-50 -mx-6 px-6 rounded-lg">
                <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                <span className="text-xl font-bold text-indigo-600">
                  {currencyFormatter(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
