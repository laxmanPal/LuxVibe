import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import ImageUploader from "./ImageUploader";
import { toast } from "react-toastify";
import { useCategoryCtx } from "../../store/CategoryContext";
import Modal from "../UI/Modal";
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const CreateCategory = () => {
  const [submitting, setSubmitting] = useState(false);
  const { categoryAction, closeCreateCategoryModal, fetchCategories } =
    useCategoryCtx();
  const [resetKey, setResetKey] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const formRef = useRef(); // ✅ to reset the form
  const isOpen = categoryAction === "create-category";

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(formRef.current);
    selectedImages.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(
        `${API_URL}/admin/category/create-category`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      toast.success("Category created successfully");
      fetchCategories();
      handleClose(); // ✅ call custom close handler
    } catch (error) {
      console.error("Category creation failed:", error);
      toast.error(`❌ ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      formRef.current?.reset();
      setSelectedImages([]);
      setResetKey((prev) => prev + 1); // triggers ImageUploader reset
    }
  }, [isOpen]);

  const handleClose = () => {
    closeCreateCategoryModal(); // close modal
  };

  return (
    <Modal open={isOpen}>
      <form ref={formRef} onSubmit={handleCreateCategory} className="my-8">
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
            name="images"
            limit={1}
            onFileSelect={setSelectedImages}
            resetTrigger={resetKey}
          />
        </div>
        <div className="flex justify-end gap-5">
          <Button
            type="button"
            onClick={handleClose}
            className="!border !border-red-600 !text-red-600 !rounded-lg text-center font-medium gap-3 !capitalize !mt-8"
          >
            Discard
          </Button>
          <Button
            type="submit"
            className="!bg-blue-500 !text-white !rounded-lg text-center font-medium gap-3 !capitalize !mt-8"
          >
            {submitting ? (
              <CircularProgress size="20px" color="inherit" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateCategory;
