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
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Products</h2>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="searchBox transition w-[50%] h-[50px] bg-gray-100 rounded-xl relative p-2 hover:border-black">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search"
            className="w-full h-[35-px] focus:outline-none bg-inherit p-2 text-[15px]"
          />
          <Button className="!absolute top-[8px] right-[5px] z-50 !w-[37px] !min-w-[37px] !h-[37px] !rounded-full !text-black">
            <IoSearch className="text-2xl text-[#4e4e4e]" />
          </Button>
        </div>
     
      </div>
      <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
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
        <div className="mt-5">
          <Pagination count={10} />
        </div>
      </div>
    </div>
  )
}

export default Orders
