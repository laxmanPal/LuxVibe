import React, { useState } from "react";
import Filter from "./Filter";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";

const ProductListWrapper = ({ children, title , totalProducts }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="py-8 container border-b border-gray-300">
      {title}
      <div className="">
        {/* Filter */}
        {/* <div className="h-full min-w-60">
          <Filter />
        </div> */}
        <div className="product-list">
          <div className="flex bg-gray-100 w-full p-4 mb-3 rounded-md items-center justify-between">
            <p className="text-gray-700">There are {totalProducts} products.</p>
            {/* <div className="ml-auto flex items-center justify-center gap-3 pr-4">
              <span>Sort By :</span>
              <div className="flex items-center">
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-white !text-[12px] !text-black !capitalize"
                >
                  Name, A to Z
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
                  <MenuItem className="!text-[12px]" onClick={handleClose}>
                    Name, A to Z
                  </MenuItem>
                  <MenuItem className="!text-[12px]" onClick={handleClose}>
                    Name, Z to A
                  </MenuItem>
                  <MenuItem className="!text-[12px]" onClick={handleClose}>
                    Price, high to low
                  </MenuItem>
                  <MenuItem className="!text-[12px]" onClick={handleClose}>
                    Price, low to high
                  </MenuItem>
                </Menu>
              </div>
            </div> */}
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Products */}
            {children}
          </div>

          <div className="pagination flex items-center justify-center my-10">
            <Pagination count={10} shape="rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListWrapper;
