import productImg from "../../assets/footwear-2.jpg";
import userDefaultImage from "../../assets/user.jpg";
import IconButton from "@mui/material/IconButton";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button, TextField, Tooltip } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import { IoSearch } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

import { useMemo } from "react";
import { FiUsers } from "react-icons/fi";


const Users = () => {
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-400' },
      'blocked': { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-400' }
    };
    
    const config = statusConfig[status?.toLowerCase()] || statusConfig.active;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <span className={`w-1.5 h-1.5 ${config.dot} rounded-full mr-1.5`}></span>
        {status || 'Active'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-64 sm:w-80"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Customers</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage all registered customers ({users.length} total)
            </p>
          </div>
          
          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <div className="relative bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full pl-10 pr-12 py-2.5 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm placeholder-gray-500 rounded-lg"
              />
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors duration-200">
                <IoSearch className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sr No.
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Email
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Total Spent
              </th>
              <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center">
                    <FiUsers className="text-4xl text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No customers found</h3>
                    <p className="text-gray-500">No customers have been registered yet</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id || index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar?.url || userDefaultImage}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                        onError={(e) => {
                          e.target.src = userDefaultImage;
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {user.name}
                        </div>
                        {/* Show email on mobile since email column is hidden */}
                        <div className="text-xs text-gray-500 truncate md:hidden mt-0.5">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">
                    <div className="truncate max-w-xs" title={user.email}>
                      {user.email}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 hidden lg:table-cell">
                    ₹0.00
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                      <Tooltip title="View" arrow>
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                          <FaRegEye className="w-4 h-4" />
                        </button>
                      </Tooltip>
                      <Tooltip title="Edit" arrow>
                        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                          <LuPencil className="w-4 h-4" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 sm:px-6 py-4 border-t border-gray-100 bg-gray-50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing {users.length} customers
          </div>
          <div className="flex justify-center">
            <Pagination count={10} color="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
