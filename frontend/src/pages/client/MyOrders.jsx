import React from "react";
import QuantityBox from "../../components/client/QuantityBox";
import { Button, IconButton, Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/logo-2.png";
import { MdOutlineShoppingCart } from "react-icons/md";

const MyOrders = () => {
  return (
    <div className="w-full h-full py-8  md:col-span-2">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
      <div className="overflow-x-auto  bg-white rounded-lg shadow">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
            <tr>
              <th className="p-4">Order Id</th>
              <th className="p-4">Total Price</th>
              <th className="p-4">Total Items</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            <tr>
              <td className="p-4">1</td>
              <td className="p-4">$25.00</td>
              <td className="p-4">3</td>

              <td className="p-4">Delivered</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
