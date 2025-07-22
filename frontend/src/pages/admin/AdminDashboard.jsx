import { FiUsers } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import { MdCurrencyRupee } from "react-icons/md";
import StatsCard from "../../components/admin/StatsCard";

const AdminDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard
          icon={<IoBagCheckOutline />}
          title="Total Orders"
          count="0000"
        />
        <StatsCard
          icon={<MdCurrencyRupee />}
          title="Total Revenue"
          count="0000"
        />
        <StatsCard icon={<FiUsers />} title="Total Customers" count="0000" />
        <StatsCard icon={<BsBoxSeam />} title="Total Products" count="0000" />
      </div>
      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
          <Button
            variant="outlined"
            className="!text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] !capitalize hover:!bg-gray-100 !border-gray-300"
          >
            View Orders
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
              <tr>
                <th className="p-4">Order Id</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              <tr>
                <td className="p-4">1</td>
                <td className="p-4">Customer 1</td>
                <td className="p-4">$25.00</td>
                <td className="p-4">Delivered</td>
                <td className="p-4">01/01/2026</td>
              </tr>
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
