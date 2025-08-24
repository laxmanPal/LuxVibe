import React from "react";
import QuantityBox from "../../components/client/QuantityBox";
import { Button, Chip, IconButton, Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/logo-2.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useOrderCtx } from "../../store/OrderContext";
import { currencyFormatter } from "../../config/currency-formatter";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import getProductImage from "../../utils/productImagePlaceholder";

const MyOrders = () => {
  const { userOrders } = useOrderCtx();

  return (
    <div className="w-full h-full py-6 md:py-8 md:col-span-2">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h2>
        <p className="text-gray-600">Track and manage your recent orders</p>
      </div>

      {/* Scrollable table container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Desktop table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white hidden sm:table">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Items Count
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {userOrders.length > 0 ? (
                userOrders.map((order, index) => {
                  let totalItems = 0;
                  order.items.forEach((item) => {
                    totalItems += item.quantity;
                  });
                  return (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            #{String(index + 1).padStart(3, '0')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link className="flex gap-2" to={`${order._id}`}>
                          <div className="flex -space-x-2 hover:space-x-1 transition-all duration-300">
                            {order.items.slice(0, 3).map((item, i) => (
                              <img
                                key={i}
                                className="w-10 h-10 object-cover rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform duration-200"
                                src={getProductImage(item.product)}
                                alt="product"
                              />
                            ))}
                            {order.items.length > 3 && (
                              <div className="w-10 h-10 bg-gray-100 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600">
                                  +{order.items.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {currencyFormatter(order.totalAmount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {totalItems} {totalItems === 1 ? 'item' : 'items'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Chip
                          className="!bg-green-100 !text-green-800 !font-medium"
                          label={order.orderStatus}
                          size="small"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/myaccount/myorders/${order._id}`}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                        >
                          <FaRegEye className="text-lg hover:scale-110 transition-transform duration-200" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="px-6 py-12 text-center text-gray-500" colSpan={7}>
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium text-gray-900 mb-1">No orders yet</p>
                      <p className="text-gray-500">When you place orders, they'll appear here</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden">
          {userOrders.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {userOrders.map((order, index) => {
                let totalItems = 0;
                order.items.forEach((item) => {
                  totalItems += item.quantity;
                });
                return (
                  <div
                    key={order._id}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Order #{String(index + 1).padStart(3, '0')}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Chip
                          className="!bg-green-100 !text-green-800 !font-medium"
                          label={order.orderStatus}
                          size="small"
                        />
                        <Link
                          to={`/myaccount/myorders/${order._id}`}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                          aria-label={`View details for order ${index + 1}`}
                        >
                          <FaRegEye className="text-xl" />
                        </Link>
                      </div>
                    </div>

                    <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
                      {order.items.map((item, i) => (
                        <img
                          key={i}
                          className="w-14 h-14 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                          src={getProductImage(item.product)}
                          alt="product"
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Total Amount</span>
                        <p className="font-semibold text-gray-900">
                          {currencyFormatter(order.totalAmount)}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Items</span>
                        <p className="font-semibold text-gray-900">
                          {totalItems} {totalItems === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-900 mb-1">No orders yet</p>
              <p className="text-gray-500">When you place orders, they'll appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
