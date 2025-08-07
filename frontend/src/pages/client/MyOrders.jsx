import React from "react";
import QuantityBox from "../../components/client/QuantityBox";
import { Button, Chip, IconButton, Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/logo-2.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useOrderCtx } from "../../store/OrderContext";
import { currencyFormatter } from "../../config/currency-formatter";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { userOrders } = useOrderCtx();
  return (
    <div className="w-full h-full py-8  md:col-span-2">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
      <div className="overflow-x-auto  bg-white rounded-lg shadow">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
            <tr>
              <th className="p-4">Order Id</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total Amount</th>
              <th className="p-4">Total Items</th>
              <th className="p-4">Order Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            {userOrders.length > 0 ? (
              userOrders.map((order, index) => {
                let totalItems = 0;
                order.items.forEach((item) => {
                  totalItems += item.quantity;
                });
                return (
                  <tr>
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <Link className="flex gap-2" to={`${order._id}`}>
                        {order.items.map((item, i) => (
                          <img
                            key={i}
                            className="w-10 h-10 object-cover rounded"
                            src={item.product.images?.[0]?.url || logo}
                            alt="product"
                          />
                        ))}
                      </Link>
                    </td>
                    <td className="p-4">
                      {currencyFormatter(order.totalAmount)}
                    </td>
                    <td className="p-4">{totalItems}</td>
                    <td className="p-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <Chip
                        className="mb-3 !bg-green-200 !text-green-700"
                        label={order.orderStatus}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={7}>
                  No Items In Cart
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
