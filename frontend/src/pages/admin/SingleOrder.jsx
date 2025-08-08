import React from "react";
import { useOrderCtx } from "../../store/OrderContext";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { currencyFormatter } from "../../config/currency-formatter";
import { Button, Chip, TextField } from "@mui/material";
import { MdMailOutline } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SingleOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const { fetchOrderById, updateOrderStatus } = useOrderCtx();

  const [orderStatus, setOrderStatus] = useState("");

  const handleChange = (event) => {
    setOrderStatus(event.target.value);
  };

  const handleOrderStatus = (event) => {
    event.preventDefault();
    updateOrderStatus(orderId, orderStatus);
  };

  useEffect(() => {
    fetchOrderDetails(orderId);
  }, [orderId]);

  const fetchOrderDetails = async (orderId) => {
    const orderDetails = await fetchOrderById(orderId);
    setOrder(orderDetails);
    setOrderStatus(orderDetails.orderStatus);
    console.log(orderDetails);
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
                <div
                  key={item.product._id}
                  className="mb-5 flex gap-3 border p-4 border-gray-300 rounded"
                >
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
              <div className="flex gap-3 items-start">
                <img
                  className="w-20 h-20 rounded-full"
                  src={order.user?.avatar?.url}
                  alt=""
                />
                <p>
                  <span>{order.user?.name}</span>
                  <span className="flex items-center gap-2 text-gray-600">
                    <MdMailOutline /> {order.user?.email}
                  </span>
                  <span className="flex items-center gap-2 text-gray-600">
                    <IoCallOutline /> {order.user?.phone}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-4">Shipping Address</h3>

            <p>Name : {order.shippingAddress?.fullName}</p>
            <p>Address : {order.shippingAddress?.streetAddress}</p>
            <p>City : {order.shippingAddress?.city}</p>
            <p>Country : {order.shippingAddress?.country}</p>
            <p>Pincode : {order.shippingAddress?.pincode}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold text-lg mb-4">Order Status</h3>
            <form onSubmit={handleOrderStatus}>
              <div className="flex justify-between">
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel>Order Status</InputLabel>
                  <Select
                    className="!w-full"
                    label="Order Status"
                    id="orderStatus"
                    value={orderStatus}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
                    <MenuItem value={"Processing"}>Processing</MenuItem>
                    <MenuItem value={"Shipped"}>Shipped</MenuItem>
                    <MenuItem value={"Delivered"}>Delivered</MenuItem>
                    <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                    <MenuItem value={"Returned"}>Returned</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  className="!bg-black hover:!bg-gray-800 !text-white !rounded-lg !px-6 !py-2 !capitalize font-semibold"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
