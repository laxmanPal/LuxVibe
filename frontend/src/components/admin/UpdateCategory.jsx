import { useParams } from "react-router-dom";
import { useCategoryCtx } from "../../store/CategoryContext";
import { useEffect, useRef, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import ImageUploader from "./ImageUploader";
import Modal from "../UI/Modal";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const UpdateCategory = () => {
    const [submitting, setSubmitting] = useState(false);
  const {
    categoryAction,
    closeUpdateCategoryModal,
    categoryDetails,
    fetchCategories,
  } = useCategoryCtx();
  const formRef = useRef();
  const [selectedImages, setSelectedImages] = useState([]);
  const [resetKey, setResetKey] = useState(0);

  const isOpen = categoryAction === "update-category";

  // ✅ Pre-fill form when categoryDetails changes
  useEffect(() => {
    if (isOpen && categoryDetails && formRef.current) {
      formRef.current.name.value = categoryDetails.name || "";
      formRef.current.slug.value = categoryDetails.slug || "";
    }
  }, [isOpen, categoryDetails]);

  const handleUpdateCategory = async (e, categoryId) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(formRef.current);
    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(`${API_URL}/admin/category/${categoryId}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      toast.success("Category updated successfully");
      fetchCategories();
      handleClose();
    } catch (error) {
      console.error("Category update failed:", error);
      toast.error(`❌ ${error.message}`);
    }
  };

  const handleClose = () => {
    closeUpdateCategoryModal();
  };

  // ✅ Reset form and image when modal closes
  useEffect(() => {
    if (!isOpen) {
      formRef.current?.reset();
      setSelectedImages([]);
      setResetKey((prev) => prev + 1); // reset ImageUploader
    }
  }, [isOpen]);
  return (
    <Modal open={isOpen}>
      <form
        ref={formRef}
        onSubmit={(e) => handleUpdateCategory(e, categoryDetails._id)}
        className="my-8"
      >
        <div className="my-3">
          <TextField
            fullWidth
            type="text"
            id="name"
            label="Category Name"
            variant="outlined"
            required
            name="name"
          />
        </div>
        <div className="my-3">
          <TextField
            fullWidth
            type="text"
            id="slug"
            label="Category Slug"
            variant="outlined"
            required
            name="slug"
          />
        </div>
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-4">Category Image</h3>
          <ImageUploader
            limit={1}
            onFileSelect={setSelectedImages}
            resetTrigger={resetKey}
            existingImages={categoryDetails.images}
          />
        </div>
        <div className="flex justify-end gap-5">
          <Button
            onClick={handleClose}
            className="!border !border-red-600 !text-red-600 !rounded-lg text-center font-medium gap-3 !capitalize !mt-8"
          >
            Discard
          </Button>
          <Button
            type="submit"
            className="!bg-blue-500 !text-white !rounded-lg text-center font-medium gap-3 !capitalize !mt-8"
          >
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateCategory;
