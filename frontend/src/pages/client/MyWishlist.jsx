import React from "react";
import QuantityBox from "../../components/client/QuantityBox";
import { Button, IconButton, Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/logo-2.png";
import { MdOutlineShoppingCart } from "react-icons/md";

const MyWishlist = () => {
  return (
    <div className="w-full h-full py-8  md:col-span-2">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
      <div className="overflow-x-auto  bg-white rounded-lg shadow">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
            <tr>
              <th className="p-4">Sr No.</th>
              <th className="p-4">Product</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Total</th>
              <th className="p-4">Remove</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            <tr>
              <td className="p-4">1</td>
              <td className="p-4">
                <img
                  src={logo}
                  alt="Product"
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-4 font-medium">Classic T-Shirt</td>
              <td className="p-4">$25.00</td>
              <td className="p-4">
                <QuantityBox />
              </td>
              <td className="p-4">$25.00</td>
              <td className="p-4 text-center">
                <Button className="w-full  !bg-black !text-white !rounded-lg text-center font-medium gap-3 ">
                  <MdOutlineShoppingCart className="text-2xl" />
                  Add to cart
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWishlist;
