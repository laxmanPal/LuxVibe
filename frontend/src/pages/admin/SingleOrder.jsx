import React from "react";
import { useOrderCtx } from "../../store/OrderContext";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { currencyFormatter } from "../../config/currency-formatter";
import { Chip } from "@mui/material";

const SingleOrder = () => {
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
    <div className="">
      <h2 className="text-2xl font-semibold mb-6">
        Order : <span className="text-sm text-gray-500">#{order._id}</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-30">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-4">Products ordered</h3>
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
          {/* Other Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-4">
              Payment
              <Chip
                size="small"
                className="ml-5 !bg-green-200 !text-green-700"
                label={order.paymentStatus?.isPaid ? "Paid" : "Un paid"}
              />
            </h3>
            <div className="">
              <div className="">
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

        {/* Right Column */}
        <div className="space-y-6">
          {/* Product Image */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-4">Customer</h3>
            <div>
              <div>
                <img src={order.user?.avatar?.url} alt="" />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-4">Pricing</h3>

            <div className="space-y-4">
              <div></div>

              <div></div>

              {/* <div>
                  <TextField
                    fullWidth
                    type="number"
                    id="name"
                    label="Off %"
                    variant="outlined"
                  />
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
