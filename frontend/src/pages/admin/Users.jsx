import productImg from "../../assets/footwear-2.jpg";
import IconButton from "@mui/material/IconButton";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button, TextField, Tooltip } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import { IoSearch } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";

const Users = () => {
  return (
      <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Customers</h2>
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
        <table className="min-w-full bg-white  rounded-lg overflow-hidden ">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
            <tr>
              <th className="p-4">Sr No.</th>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Spent</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            <tr className="">
              <td className="p-4">1</td>
              <td className="p-4">
                <img
                  src={productImg}
                  alt={productImg}
                  className="w-10 h-10 rounded-full  object-cover"
                />
              </td>
              <td className="p-4">User 1</td>
              <td className="p-4">demo@gmail.com</td>
              <td className="p-4">Active</td>
              <td className="p-4">00</td>
              <td className="p-4">
               <Tooltip title="View" arrow>
                  <IconButton>
                    <FaRegEye className="text-[20px]" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit" arrow>
                  <IconButton>
                    <LuPencil className="text-[18px]" />
                  </IconButton>
                </Tooltip>
              </td>
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

export default Users
