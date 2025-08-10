import React, { useState } from "react";
import Filter from "./Filter";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import { useProductCtx } from "../../store/ProductContext";
import FetchingData from "../UI/FetchingData";

import { Skeleton, Box } from '@mui/material';
import ProductCardSkeleton from "../UI/ProductCardSkeleton";

const ProductListWrapper = ({ children, title, totalProducts }) => {
  const { fetchingProducts } = useProductCtx();
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // Generate array of skeleton components
  const renderSkeletons = (count = 8) => {
    return Array.from({ length: count }, (_, index) => (
      <ProductCardSkeleton key={`skeleton-${index}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          {title}
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Product Info Bar */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                {fetchingProducts ? (
                  <>
                    <Skeleton 
                      variant="rectangular" 
                      width={100} 
                      height={24} 
                      sx={{ borderRadius: '12px', bgcolor: 'grey.300' }}
                    />
                    <Skeleton variant="text" width={150} sx={{ bgcolor: 'grey.300' }} />
                  </>
                ) : (
                  <>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {totalProducts} Products
                    </span>
                    <span className="text-gray-600 text-sm">Available in our collection</span>
                  </>
                )}
              </div>
              
              {/* Uncomment when ready to use sorting */}
              {/* <div className="flex items-center gap-3">
                <span className="text-gray-700 text-sm font-medium">Sort By:</span>
                <Button
                  id="sort-button"
                  aria-controls={open ? "sort-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-white !text-sm !text-gray-700 !capitalize !shadow-sm hover:!shadow-md !transition-shadow"
                  endIcon={<MdKeyboardArrowDown />}
                >
                  Name, A to Z
                </Button>
                <Menu
                  id="sort-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby": "sort-button",
                    },
                  }}
                >
                  <MenuItem className="!text-sm" onClick={handleClose}>
                    Name, A to Z
                  </MenuItem>
                  <MenuItem className="!text-sm" onClick={handleClose}>
                    Name, Z to A
                  </MenuItem>
                  <MenuItem className="!text-sm" onClick={handleClose}>
                    Price, High to Low
                  </MenuItem>
                  <MenuItem className="!text-sm" onClick={handleClose}>
                    Price, Low to High
                  </MenuItem>
                </Menu>
              </div> */}
            </div>
          </div>

          {/* Products Grid */}
          <div className="p-6">
            {fetchingProducts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {renderSkeletons()}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {children}
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {!fetchingProducts && totalProducts > 0 && (
          <div className="flex justify-center mt-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <Pagination 
                count={10} 
                shape="rounded" 
                color="primary"
                size="large"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default ProductListWrapper;
