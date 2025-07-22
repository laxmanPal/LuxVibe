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

const AllProducts = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Products</h2>
        <Button
          variant="outlined"
          className="!text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] !capitalize hover:!bg-gray-100 !border-gray-300"
        >
          <IoIosAdd className="text-2xl" /> Add Product
        </Button>
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
        <Button
          id="basic-button"
          variant="outlined"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="!text-[15px] !text-[rgba(0,0,0,0.8)] !font-[500] !capitalize hover:!bg-gray-100 !border-gray-300"
        >
          <CiFilter className="text-2xl" /> Filter
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          <MenuItem className="!text-[15px]" onClick={handleClose}>
            Men
          </MenuItem>
          <MenuItem className="!text-[15px]" onClick={handleClose}>
            Women
          </MenuItem>
          <MenuItem className="!text-[15px]" onClick={handleClose}>
            Kids
          </MenuItem>
        </Menu>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white  rounded-lg overflow-hidden ">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
            <tr>
              <th className="p-4">Sr No.</th>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Categories</th>
              <th className="p-4">MRP</th>
              <th className="p-4">Sale Price</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Sold</th>
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
                  className="w-10 h-10 rounded-full object-cover"
                />
              </td>
              <td className="p-4">Product 1</td>
              <td className="p-4 gap-2 grid grid-cols-3 max-w-[300px]">
                <Chip label="men" variant="outlined" />
                <Chip label="topwear" variant="outlined" />
              </td>
              <td className="p-4">00</td>
              <td className="p-4">$00</td>
              <td className="p-4">00</td>
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
                <Tooltip title="Delete" arrow>
                  <IconButton>
                    <FaRegTrashCan className="text-[18px]" />
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
  );
};

export default AllProducts;
