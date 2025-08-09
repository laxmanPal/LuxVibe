import { FiUsers } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import { MdCurrencyRupee } from "react-icons/md";
import StatsCard from "../../components/admin/StatsCard";
import { useOrderCtx } from "../../store/OrderContext";
import { useEffect } from "react";
import { useState } from "react";
import { useProductCtx } from "../../store/ProductContext";
import { currencyFormatter } from "../../config/currency-formatter";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const { allOrders, allRecentOrders } = useOrderCtx();
  const { products } = useProductCtx();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/users`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching Users failed");
      }

      setUsers(data.users);
      console.log(data.users);
    } catch (error) {
      console.error("Fetching All Users Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  let totalRevenue = 0;
  allOrders.forEach((order) => {
    totalRevenue += order.totalAmount;
  });

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'processing': 'bg-blue-100 text-blue-800 border-blue-200',
      'shipped': 'bg-purple-100 text-purple-800 border-purple-200',
      'delivered': 'bg-green-100 text-green-800 border-green-200',
      'cancelled': 'bg-red-100 text-red-800 border-red-200',
      'default': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return statusColors[status?.toLowerCase()] || statusColors.default;
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard
          icon={<IoBagCheckOutline />}
          title="Total Orders"
          count={allOrders.length}
          color="bg-blue-500"
          trend="+12%"
        />
        <StatsCard
          icon={<MdCurrencyRupee />}
          title="Total Revenue"
          count={currencyFormatter(totalRevenue)}
          color="bg-green-500"
          trend="+8%"
        />
        <StatsCard
          icon={<FiUsers />}
          title="Total Customers"
          count={users.length}
          color="bg-purple-500"
          trend="+15%"
        />
        <StatsCard
          icon={<BsBoxSeam />}
          title="Total Products"
          count={products.length}
          color="bg-orange-500"
          trend="+5%"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Recent Orders</h2>
              <p className="text-sm text-gray-500 mt-1">Latest customer orders and their status</p>
            </div>
            <Link
              to="/admin/orders"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span>View All Orders</span>
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Items
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Date
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allRecentOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <IoBagCheckOutline className="text-4xl text-gray-300 mb-2" />
                      <p>No recent orders found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                allRecentOrders.map((order, index) => {
                  let totalItems = 0;
                  order.items.forEach((item) => {
                    totalItems += item.quantity;
                  });
                  return (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">#{index + 1}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <img
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                            src={order.user.avatar?.url}
                            alt={order.user.name}
                            onError={(e) => {
                              e.target.src = '/default-avatar.png';
                            }}
                          />
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {order.user.name}
                            </div>
                            <div className="text-xs text-gray-500 truncate hidden sm:block">
                              {order.user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {totalItems} items
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {currencyFormatter(order.totalAmount)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/admin/orders/${order._id}`}
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        >
                          <FaRegEye className="text-lg" />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Selling Products */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Top Selling Products</h2>
            <p className="text-sm text-gray-500 mt-1">Best performing products by sales volume</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Units Sold
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <BsBoxSeam className="text-4xl text-gray-300 mb-2" />
                    <p>No sales data available</p>
                    <p className="text-xs text-gray-400 mt-1">Product sales analytics will appear here</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
