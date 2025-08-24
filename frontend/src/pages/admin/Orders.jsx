import productImg from "../../assets/footwear-2.jpg";
import IconButton from "@mui/material/IconButton";
import { FaRegEye } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button, Tooltip } from "@mui/material";
import { IoIosAdd } from "react-icons/io";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import userDefaultImage from "../../assets/user.jpg";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useOrderCtx } from "../../store/OrderContext";
import { currencyFormatter } from "../../config/currency-formatter";
import FetchingData from "../../components/UI/FetchingData";

const Orders = () => {
  const { allOrders, fetching } = useOrderCtx();

  console.log(allOrders);

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'processing': 'bg-blue-100 text-blue-800 border-blue-200',
      'shipped': 'bg-purple-100 text-purple-800 border-purple-200',
      'delivered': 'bg-green-100 text-green-800 border-green-200',
      'cancelled': 'bg-red-100 text-red-800 border-red-200',
      'refunded': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return statusColors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (fetching) {
    return <FetchingData />
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mx-auto">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Orders</h2>
          <p className="text-sm text-gray-600 mt-1">Manage customer orders and track status</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Total Orders:</span>
          <span className="font-semibold text-gray-900">{allOrders.length}</span>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="relative bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full h-12 pl-4 pr-12 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
            />
            <Button className="!absolute top-1.5 right-1.5 !w-9 !min-w-9 !h-9 !rounded-md !text-gray-500 hover:!text-gray-700 hover:!bg-gray-100">
              <IoSearch className="text-lg" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allOrders.map((order, index) => {
                let totalItems = 0;
                order.items.forEach((item) => {
                  totalItems += item.quantity;
                });

                return (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-mono text-gray-900">
                        #{index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
                            src={order.user.avatar?.url || userDefaultImage}
                            alt={order.user.name}
                          />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {order.user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {currencyFormatter(order.totalAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`${order._id}`}>
                        <Tooltip title="View Details" arrow>
                          <IconButton size="small" className="!p-2 hover:!bg-blue-50">
                            <FaRegEye className="text-base text-blue-600" />
                          </IconButton>
                        </Tooltip>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="lg:hidden space-y-4 p-4">
          {allOrders.map((order, index) => {
            let totalItems = 0;
            order.items.forEach((item) => {
              totalItems += item.quantity;
            });

            return (
              <div key={order._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover flex-shrink-0"
                      src={order.user.avatar?.url || userDefaultImage}
                      alt={order.user.name}
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {order.user.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {order.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">#{index + 1}</span>
                    <Link to={`${order._id}`}>
                      <IconButton size="small" className="!p-1.5 hover:!bg-blue-50">
                        <FaRegEye className="text-sm text-blue-600" />
                      </IconButton>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-xs text-gray-500">Items:</span>
                    <div className="font-medium text-gray-900">
                      {totalItems} {totalItems === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Total:</span>
                    <div className="font-bold text-gray-900">
                      {currencyFormatter(order.totalAmount)}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Status:</span>
                    <div className="mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Date:</span>
                    <div className="font-medium text-gray-900 text-sm">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {allOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <FaRegEye className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Orders will appear here once customers start placing them</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {allOrders.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            count={10}
            color="primary"
            size="medium"
            className="!text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
