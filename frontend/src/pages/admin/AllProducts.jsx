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
import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
import CircularProgress from "@mui/material/CircularProgress";
import { currencyFormatter } from "../../config/currency-formatter";
import { useProductCtx } from "../../store/ProductContext";
import FetchingData from "../../components/UI/FetchingData";

const AllProducts = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { products, handleDeleteProduct , fetchingProducts } = useProductCtx();
  // const [products, setProducts] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletingProduct = async (id) => {
    setDeletingId(id);
    try {
      handleDeleteProduct(id);
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  if (fetchingProducts) {
   return <FetchingData/>
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Products
        </h2>
        <Link to={"/admin/create-product"}>
          <Button
            variant="outlined"
            className="!text-sm !text-gray-700 !font-medium !capitalize hover:!bg-blue-50 hover:!border-blue-300 !border-gray-300 !transition-all !duration-200"
          >
            <IoIosAdd className="text-lg mr-1" /> Add Product
          </Button>
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 gap-4">
        <div className="relative flex-1 md:flex-none md:w-80">
          <div className="relative bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full h-12 pl-4 pr-12 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
            />
            <Button className="!absolute top-1.5 right-1.5 !w-9 !min-w-9 !h-9 !rounded-md !text-gray-500 hover:!text-gray-700 hover:!bg-gray-100">
              <IoSearch className="text-lg" />
            </Button>
          </div>
        </div>

        <Button
          id="basic-button"
          variant="outlined"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          className="!text-sm !text-gray-700 !font-medium !capitalize hover:!bg-gray-50 !border-gray-300 !h-12 !px-4"
        >
          <CiFilter className="text-lg mr-2" /> Filter
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
          <MenuItem className="!text-sm !py-3" onClick={handleClose}>
            Men
          </MenuItem>
          <MenuItem className="!text-sm !py-3" onClick={handleClose}>
            Women
          </MenuItem>
          <MenuItem className="!text-sm !py-3" onClick={handleClose}>
            Kids
          </MenuItem>
        </Menu>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sr No.
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Categories
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sale Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sold
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => {
                const productImage =
                  product.images &&
                  product.images.length > 0 &&
                  product.images[0].url
                    ? product.images[0].url
                    : productImg;

                return (
                  <tr
                    key={product.name}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img
                          src={productImage}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        />
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                          {product.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {product.categories.map((category) => (
                          <Chip
                            key={category.name}
                            label={category.name}
                            variant="outlined"
                            size="small"
                            className="!text-xs"
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {currencyFormatter(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                      {currencyFormatter(product.discountPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.inStock > 10
                            ? "bg-green-100 text-green-800"
                            : product.inStock > 0
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.inStock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      00
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-1">
                        <Tooltip title="View" arrow>
                          <IconButton
                            size="small"
                            className="!p-2 hover:!bg-blue-50"
                          >
                            <FaRegEye className="text-base text-blue-600" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit" arrow>
                          <Link to={`/admin/edit-product/${product._id}`}>
                            <IconButton
                              size="small"
                              className="!p-2 hover:!bg-green-50"
                            >
                              <LuPencil className="text-base text-green-600" />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            size="small"
                            onClick={() => handleDeletingProduct(product._id)}
                            className="!p-2 hover:!bg-red-50"
                          >
                            {deletingId === product._id ? (
                              <CircularProgress size="16px" color="inherit" />
                            ) : (
                              <FaRegTrashCan className="text-base text-red-600" />
                            )}
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="lg:hidden space-y-4 p-4">
          {products.map((product, index) => {
            const productImage =
              product.images &&
              product.images.length > 0 &&
              product.images[0].url
                ? product.images[0].url
                : productImg;

            return (
              <div
                key={product.name}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={productImage}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-semibold text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2">
                        #{index + 1}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex flex-wrap gap-1">
                        {product.categories.map((category) => (
                          <Chip
                            key={category.name}
                            label={category.name}
                            variant="outlined"
                            size="small"
                            className="!text-xs"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Price:</span>
                        <div className="font-semibold text-gray-900">
                          {currencyFormatter(product.price)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Sale Price:</span>
                        <div className="font-semibold text-green-600">
                          {currencyFormatter(product.discountPrice)}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Stock:</span>
                        <span
                          className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ml-1 ${
                            product.inStock > 10
                              ? "bg-green-100 text-green-800"
                              : product.inStock > 0
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.inStock}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Sold:</span>
                        <div className="font-semibold text-gray-900">00</div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-1">
                      <Tooltip title="View" arrow>
                        <IconButton
                          size="small"
                          className="!p-2 hover:!bg-blue-50"
                        >
                          <FaRegEye className="text-base text-blue-600" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit" arrow>
                        <Link to={`/admin/edit-product/${product._id}`}>
                          <IconButton
                            size="small"
                            className="!p-2 hover:!bg-green-50"
                          >
                            <LuPencil className="text-base text-green-600" />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteProduct(product._id)}
                          className="!p-2 hover:!bg-red-50"
                        >
                          {deletingId === product._id ? (
                            <CircularProgress size="16px" color="inherit" />
                          ) : (
                            <FaRegTrashCan className="text-base text-red-600" />
                          )}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination
          count={10}
          color="primary"
          size="medium"
          className="!text-sm"
        />
      </div>
    </div>
  );
};

export default AllProducts;
