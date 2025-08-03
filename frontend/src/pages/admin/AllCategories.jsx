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
      {categoryAction === "create-category" && <CreateCategory />}
      {/* {categoryAction === "update-category" && <UpdateCategory />} */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>

          <Button
            onClick={() => showCreateCategoryModal()}
            variant="outlined"
            className="!text-[14px] !text-[rgba(0,0,0,0.8)] !font-[500] !capitalize hover:!bg-gray-100 !border-gray-300"
          >
            <IoIosAdd className="text-2xl" /> Add Category
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
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white  rounded-lg overflow-hidden ">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase text-left">
              <tr>
                <th className="p-4">Sr No.</th>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-200">
              {categories.map((category, index) => {
                return (
                  <tr key={index}>
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <img
                        src={category.images[0].url}
                        alt={category.images[0].url}
                        className="w-20  object-cover"
                      />
                    </td>
                    <td className="p-4">{category.name}</td>
                    <td className="p-4">{category.slug}</td>
                    <td className="p-4">
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          onClick={() => showUpdateCategoryModal(category._id)}
                        >
                          <LuPencil className="text-[18px]" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          onClick={() => handleDeleteCategory(category._id)}
                        >
                          {deletingId === category._id ? (
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
    </>
  );
};

export default AllCategories;
