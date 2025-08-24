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
import getProductImage from "../../utils/productImagePlaceholder";
import userDefaultImage from "../../assets/user.jpg";

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

  const getStatusColor = (status) => {
    const statusColors = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Confirmed': 'bg-blue-100 text-blue-800 border-blue-200',
      'Processing': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Shipped': 'bg-purple-100 text-purple-800 border-purple-200',
      'Delivered': 'bg-green-100 text-green-800 border-green-200',
      'Cancelled': 'bg-red-100 text-red-800 border-red-200',
      'Returned': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Order Details
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Order ID:</span>
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded border">
                  #{order._id}
                </span>
                {order.orderStatus && (
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <div>Order Date: {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">

          {/* Left Column - Takes up 2/3 on large screens */}
          <div className="xl:col-span-2 space-y-6">

            {/* Products Ordered */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Products Ordered ({order.items?.length || 0} items)
                </h3>
              </div>
              <div className="p-6 space-y-4">
                {order.items?.map((item) => {
                  const itemTotal = item.quantity * item.product.discountPrice;
                  const savings = item.quantity * (item.product.price - item.product.discountPrice);

                  return (
                    <div
                      key={item.product._id}
                      className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-gray-200"
                          src={getProductImage(item.product)}
                          alt={item.product.name}
                        />
                      </div>

                      <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-3">
                        <div className="flex-1">
                          <h6 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {item.product.name}
                          </h6>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">
                                {currencyFormatter(item.product.discountPrice)}
                              </span>
                              {item.product.price > item.product.discountPrice && (
                                <span className="text-gray-500 line-through text-xs">
                                  {currencyFormatter(item.product.price)}
                                </span>
                              )}
                            </div>
                            <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded">
                              Qty: {item.quantity}
                            </span>
                          </div>
                          {savings > 0 && (
                            <div className="mt-2 text-xs text-green-600">
                              You saved {currencyFormatter(savings)}
                            </div>
                          )}
                        </div>

                        <div className="flex-shrink-0 text-right">
                          <div className="font-bold text-lg text-gray-900">
                            {currencyFormatter(itemTotal)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Payment Details
                  </h3>
                  <Chip
                    size="small"
                    className={`!font-semibold ${order.paymentStatus?.isPaid
                        ? '!bg-green-100 !text-green-800 !border-green-200'
                        : '!bg-red-100 !text-red-800 !border-red-200'
                      }`}
                    label={order.paymentStatus?.isPaid ? "Paid" : "Unpaid"}
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{currencyFormatter(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-700 font-medium">
                      - {currencyFormatter(totalDiscount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Taxes and charges</span>
                    <span className="font-medium">{currencyFormatter(order.taxAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Delivery charge</span>
                    <span className="font-medium">{currencyFormatter(0)}</span>
                  </div>
                  <hr className="my-4 border-gray-200" />
                  <div className="flex justify-between items-center py-2 bg-gray-50 px-4 rounded-lg">
                    <span className="font-bold text-lg text-gray-900">Total</span>
                    <span className="font-bold text-xl text-gray-900">
                      {currencyFormatter(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Takes up 1/3 on large screens */}
          <div className="xl:col-span-1 space-y-6">

            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Customer
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover flex-shrink-0"
                    src={order.user?.avatar?.url || userDefaultImage}
                    alt={order.user?.name}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      {order.user?.name}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MdMailOutline className="flex-shrink-0" />
                        <span className="truncate">{order.user?.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <IoCallOutline className="flex-shrink-0" />
                        <span>{order.user?.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  Shipping Address
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">
                      {order.shippingAddress?.fullName}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    {order.shippingAddress?.streetAddress}
                  </div>
                  <div className="text-gray-600">
                    {order.shippingAddress?.city}
                  </div>
                  <div className="text-gray-600">
                    {order.shippingAddress?.country}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">PIN:</span> {order.shippingAddress?.pincode}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                  Order Status
                </h3>
              </div>
              <div className="p-6">
                <form onSubmit={handleOrderStatus} className="space-y-4">
                  <FormControl fullWidth>
                    <InputLabel id="orderStatus-label">Update Order Status</InputLabel>
                    <Select
                      labelId="orderStatus-label"
                      id="orderStatus"
                      value={orderStatus}
                      label="Update Order Status"
                      onChange={handleChange}
                      className="!rounded-lg"
                    >
                      <MenuItem value="">
                        <em>Select Status</em>
                      </MenuItem>
                      <MenuItem value="Pending">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          Pending
                        </div>
                      </MenuItem>
                      <MenuItem value="Confirmed">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          Confirmed
                        </div>
                      </MenuItem>
                      <MenuItem value="Processing">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          Processing
                        </div>
                      </MenuItem>
                      <MenuItem value="Shipped">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Shipped
                        </div>
                      </MenuItem>
                      <MenuItem value="Delivered">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Delivered
                        </div>
                      </MenuItem>
                      <MenuItem value="Cancelled">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Cancelled
                        </div>
                      </MenuItem>
                      <MenuItem value="Returned">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                          Returned
                        </div>
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className="!bg-blue-600 hover:!bg-blue-700 !text-white !rounded-lg !py-3 !font-semibold !shadow-md hover:!shadow-lg !transition-all !duration-200 !mt-2"
                  >
                    Update Status
                  </Button>
                </form>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
              <h4 className="text-base font-semibold text-gray-800 mb-4">Order Summary</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-semibold text-gray-900">
                    {order.items?.reduce((acc, item) => acc + item.quantity, 0) || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className={`font-semibold ${order.paymentStatus?.isPaid ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {order.paymentStatus?.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Savings:</span>
                  <span className="font-semibold text-green-600">
                    {currencyFormatter(totalDiscount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
