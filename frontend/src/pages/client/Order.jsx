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
          className="mb-3 !bg-green-200 !text-green-700"
          label={order.orderStatus}
        />
        <h2 className="text-2xl font-semibold mb-3">
          Order Id : <span className="text-sm text-gray-500">#{order._id}</span>
        </h2>
        <span className="text-sm font-semibold ">
          Date: {new Date(order.createdAt).toLocaleDateString()}
        </span>
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <div>
            {order.items?.map((item) => {
              const itemTotal = item.quantity * item.product.discountPrice;
              return (
                <div className="mb-5 flex gap-3 border p-4 border-gray-300 rounded">
                  <img
                    className="w-20 rounded object-cover"
                    src={item.product.images[0].url}
                    alt=""
                  />
                  <div className="flex justify-between w-full">
                    <div>
                      <h6>{item.product.name}</h6>
                      <p className="">
                        <span>
                          {currencyFormatter(item.product.discountPrice)}
                        </span>
                        <span className="text-gray-600 ml-8">
                          x {item.quantity}
                        </span>
                      </p>
                      <p className="text-xs line-through">
                        {currencyFormatter(item.product.price)}
                      </p>
                    </div>
                    <p>{currencyFormatter(itemTotal)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <h2 className="text-xl font-semibold mb-4">Shiping Address</h2>
              <p>Name : {order.shippingAddress?.fullName}</p>
              <p>Address : {order.shippingAddress?.streetAddress}</p>
              <p>City : {order.shippingAddress?.city}</p>
              <p>Country : {order.shippingAddress?.country}</p>
              <p>Pincode : {order.shippingAddress?.pincode}</p>
            </div>
            <div className="col-span-1">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{currencyFormatter(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span className="text-green-700 text-sm">
                  - {currencyFormatter(totalDiscount)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes and charges</span>
                <span>{currencyFormatter(order.taxAmount)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery charge</span>
                <span>{currencyFormatter(0)}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{currencyFormatter(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
