import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { currencyFormatter } from "../../config/currency-formatter";
import { Chip } from "@mui/material";
import { useOrderCtx } from "../../store/OrderContext";
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
    <>
      <div className="w-full h-full py-8  md:col-span-2">
        <Chip
          size="small"
          className="mb-4 px-3 py-1 !bg-green-200 !text-green-700 rounded-full"
          label={order.orderStatus}
        />
        <h2 className="text-2xl font-semibold mb-2">
          Order Id: <span className="text-sm text-gray-500">#{order._id}</span>
        </h2>
        <span className="block text-sm font-semibold text-gray-700 mb-6">
          Date:{" "}
          {order.createdAt
            ? new Date(order.createdAt).toLocaleDateString()
            : "-"}
        </span>
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="space-y-4 mb-8">
            {order.items?.map((item) => {
              const itemTotal = item.quantity * item.product.discountPrice;
              return (
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-3 border border-gray-300 rounded">
                  <img
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded object-cover flex-shrink-0"
                    src={item.product.images[0].url}
                    alt={item.product.name}
                  />
                  <div className="flex flex-col sm:flex-row justify-between flex-1 w-full">
                    <div>
                      <h6 className="font-semibold text-lg">
                        {item.product.name}
                      </h6>
                      <p className="flex items-center gap-4 mt-1 text-gray-700">
                        <span className="font-medium text-primary-600">
                          {currencyFormatter(item.product.discountPrice)}
                        </span>
                        <span className="text-gray-500">x {item.quantity}</span>
                      </p>
                      <p className="text-xs text-gray-400 line-through mt-1">
                        {currencyFormatter(item.product.price)}
                      </p>
                    </div>
                    <p className="font-semibold text-lg mt-3 sm:mt-0 sm:self-center">
                      {currencyFormatter(itemTotal)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shipping Address */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <p className="mb-1">
                <span className="font-semibold">Name: </span>
                {order.shippingAddress?.fullName || "-"}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Address: </span>
                {order.shippingAddress?.streetAddress || "-"}
              </p>
              <p className="mb-1">
                <span className="font-semibold">City: </span>
                {order.shippingAddress?.city || "-"}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Country: </span>
                {order.shippingAddress?.country || "-"}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Pincode: </span>
                {order.shippingAddress?.pincode || "-"}
              </p>
            </section>
            {/* Order Summary */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 text-gray-800">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{currencyFormatter(subtotal)}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Discount</span>
                  <span>- {currencyFormatter(totalDiscount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes and charges</span>
                  <span>{currencyFormatter(order.taxAmount || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery charge</span>
                  <span>{currencyFormatter(0)}</span>
                </div>
                <hr className="border-t border-gray-300 my-4" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{currencyFormatter(order.totalAmount)}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
