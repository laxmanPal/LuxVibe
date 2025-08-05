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
import { convertUsdToInr } from "../../config/currency-converter";

const AllProducts = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [products, setProducts] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/product/all-products`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching Products failed");
      }

      setProducts(data.products);
    } catch (error) {
      console.error("Fetching Products Error:", error.message);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteProduct = async (id) => {
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/admin/product/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res.json();

      if (!res.ok)
        throw new Error(result.message || "Failed to delete product");

      toast.success("✅ Product deleted");
      fetchProducts();
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Products</h2>
        <Link to={"/admin/create-product"}>
          <Button
            variant="outlined"
            className="!text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] !capitalize hover:!bg-gray-100 !border-gray-300"
          >
            <IoIosAdd className="text-2xl" /> Add Product
          </Button>
        </Link>
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
              <th className="p-4">Price</th>
              <th className="p-4">Sale Price</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Sold</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            {products.map((product, index) => {
              const productImage =
                product.images &&
                product.images.length > 0 &&
                product.images[0].url
                  ? product.images[0].url
                  : productImg;

              return (
                <tr key={product.name}>
                  <td className="p-4"> {index + 1}</td>
                  <td className="p-4">
                    <img
                      src={productImage}
                      alt={product.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4 gap-2 grid grid-cols-3 max-w-[300px]">
                    {product.categories.map((category, index) => {
                      return (
                        <Chip
                          key={category.name}
                          label={category.name}
                          variant="outlined"
                        />
                      );
                    })}
                  </td>
                  <td className="p-4"> {convertUsdToInr(product.price)} </td>
                  <td className="p-4">
                    {convertUsdToInr(product.discountPrice)}
                  </td>
                  <td className="p-4">{product.inStock}</td>
                  <td className="p-4">00</td>
                  <td className="p-4">
                    <Tooltip title="View" arrow>
                      <IconButton>
                        <FaRegEye className="text-[20px]" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit" arrow>
                      <Link to={`/admin/edit-product/${product._id}`}>
                        <IconButton>
                          <LuPencil className="text-[18px]" />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        {deletingId === product._id ? (
                          <CircularProgress size="18px" color="inherit" />
                        ) : (
                          <FaRegTrashCan className="text-[18px]" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
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
