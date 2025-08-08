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
  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
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
    }
  };

  let totalRevenue = 0;

  allOrders.forEach((order) => {
    totalRevenue += order.totalAmount;
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          icon={<IoBagCheckOutline />}
          title="Total Orders"
          count={allOrders.length}
        />
        <StatsCard
          icon={<MdCurrencyRupee />}
          title="Total Revenue"
          count={currencyFormatter(totalRevenue)}
        />
        <StatsCard
          icon={<FiUsers />}
          title="Total Customers"
          count={users.length}
        />
        <StatsCard
          icon={<BsBoxSeam />}
          title="Total Products"
          count={products.length}
        />
      </div>
      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
          <Link
            to={"/admin/orders"}
            variant="outlined"
            className="border p-2 !text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500]  hover:!bg-gray-100 !border-gray-300"
          >
            View Orders
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
              <tr>
                <th className="p-4">Order Id</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total Item</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {allRecentOrders.map((order, index) => {
                let totalItems = 0;
                order.items.forEach((item) => {
                  totalItems += item.quantity;
                });
                return (
                  <tr>
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <div className="flex gap-2 items-center">
                        <img
                          className="w-10 h-10 rounded-full"
                          src={order.user.avatar?.url}
                          alt=""
                        />
                        <p>
                          <span className="font-semibold">
                            {order.user.name}
                          </span>{" "}
                          <br />
                          <span className="text-sm text-gray-500">
                            {order.user.email}
                          </span>
                        </p>
                      </div>
                    </td>
                    <td className="p-4">{totalItems}</td>
                    <td className="p-4">
                      {currencyFormatter(order.totalAmount)}
                    </td>
                    <td className="p-4">{order.orderStatus}</td>
                    <td className="p-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Link to={`/admin/orders/${order._id}`}>
                        <FaRegEye className="text-xl" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Top Selling Products
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
              <tr>
                <th className="p-4">Product Id</th>
                <th className="p-4">Product</th>
                <th className="p-4">Units Sold</th>
                <th className="p-4">Revenue</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              <tr>
                <td className="p-4">1</td>
                <td className="p-4">Product 1</td>
                <td className="p-4">00</td>
                <td className="p-4">$00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
