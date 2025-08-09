import productImg from "../../assets/footwear-2.jpg";
import IconButton from "@mui/material/IconButton";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { Button, CircularProgress, TextField, Tooltip } from "@mui/material";
import { IoIosAdd } from "react-icons/io";
import Pagination from "@mui/material/Pagination";
const API_URL = import.meta.env.VITE_API_URL;
import { IoSearch } from "react-icons/io5";
import ImageUploader from "../../components/admin/ImageUploader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCategoryCtx } from "../../store/CategoryContext";
import CreateCategory from "../../components/admin/CreateCategory";
import UpdateCategory from "../../components/admin/UpdateCategory";

const AllCategories = () => {
  const [deletingId, setDeletingId] = useState(null);
  const {
    categoryAction,
    categories,
    showUpdateCategoryModal,
    showCreateCategoryModal,
    fetchCategories,
  } = useCategoryCtx();

  const handleDeleteCategory = async (id) => {
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/admin/category/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed to delete");

      toast.success("✅ Category deleted");
      fetchCategories();
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <CreateCategory />
      {/* <UpdateCategory /> */}
      <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Categories</h2>
            <p className="text-sm text-gray-600 mt-1">Manage your product categories</p>
          </div>
          
          <Button
            onClick={() => showCreateCategoryModal()}
            variant="outlined"
            className="!text-sm !text-gray-700 !font-medium !capitalize hover:!bg-blue-50 hover:!border-blue-300 !border-gray-300 !transition-all !duration-200 !px-4 !py-2"
          >
            <IoIosAdd className="text-lg mr-1" /> Add Category
          </Button>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="relative bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full h-12 pl-4 pr-12 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
              />
              <Button className="!absolute top-1.5 right-1.5 !w-9 !min-w-9 !h-9 !rounded-md !text-gray-500 hover:!text-gray-700 hover:!bg-gray-100">
                <IoSearch className="text-lg" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Sr No.
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={category.images[0].url}
                            alt={category.name}
                            className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200 shadow-sm"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {category.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                        {category.slug}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {/* Uncomment when edit functionality is ready
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            size="small"
                            onClick={() => showUpdateCategoryModal(category._id)}
                            className="!p-2 hover:!bg-green-50"
                          >
                            <LuPencil className="text-base text-green-600" />
                          </IconButton>
                        </Tooltip>
                        */}
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteCategory(category._id)}
                            className="!p-2 hover:!bg-red-50"
                          >
                            {deletingId === category._id ? (
                              <CircularProgress size="16px" color="inherit" />
                            ) : (
                              <FaRegTrashCan className="text-base text-red-600" />
                            )}
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-4 p-4">
            {categories.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={category.images[0].url}
                      alt={category.name}
                      className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200 shadow-sm"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 truncate">
                          {category.name}
                        </h3>
                        <span className="text-xs text-gray-500 mt-1">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">Slug:</div>
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-white text-gray-700 rounded-md border border-gray-200">
                        {category.slug}
                      </span>
                    </div>

                    <div className="flex justify-end space-x-2">
                      {/* Uncomment when edit functionality is ready
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          size="small"
                          onClick={() => showUpdateCategoryModal(category._id)}
                          className="!p-2 hover:!bg-green-50"
                        >
                          <LuPencil className="text-base text-green-600" />
                        </IconButton>
                      </Tooltip>
                      */}
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteCategory(category._id)}
                          className="!p-2 hover:!bg-red-50"
                        >
                          {deletingId === category._id ? (
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
            ))}
          </div>

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <IoIosAdd className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first category</p>
              <Button
                onClick={() => showCreateCategoryModal()}
                variant="contained"
                className="!bg-blue-600 hover:!bg-blue-700 !text-white !capitalize !px-6 !py-2"
              >
                <IoIosAdd className="text-lg mr-1" /> Add Category
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {categories.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Pagination 
              count={10} 
              color="primary"
              size="medium"
              className="!text-sm"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default AllCategories;
