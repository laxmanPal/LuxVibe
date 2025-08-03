import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import { toast } from "react-toastify";
import { useCategoryCtx } from "../../store/CategoryContext";
import Modal from "../UI/Modal";
import { useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const CreateCategory = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", slug: "" });
  const [imageFile, setImageFile] = useState([]);
  const { categoryAction, closeCreateCategoryModal, fetchCategories } =
    useCategoryCtx();

  const [uploaderKey, setUploaderKey] = useState(0);

  useEffect(() => {
    if (categoryAction === "create-category") {
      setFormData({ name: "", slug: "" });
      setImageFile([]);
      setUploaderKey((prev) => prev + 1); // this will re-render ImageUploader
    }
  }, [categoryAction]);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (files) => {
    setImageFile(files);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);

    imageFile.forEach((file) => {
      data.append("images", file);
    });

    try {
      const res = await fetch(`${API_URL}/admin/category/create-category`, {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create category");
      }

      toast.success("✅ Category Created");
      setFormData({ name: "", slug: "" });
      setImageFile([]);
      closeCreateCategoryModal();
      fetchCategories();
    } catch (error) {
      console.error("Category creation failed:", error);
      toast.error(`❌ ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Modal open={categoryAction === "create-category"}>
      <form className="my-8" onSubmit={handleCreateCategory}>
        <div className="my-3">
          <TextField
            fullWidth
            type="text"
            id="name"
            label="Category Name"
            variant="outlined"
            required
            name="name"
            value={formData.name}
            onChange={handleFormData}
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
            value={formData.slug}
            onChange={handleFormData}
          />
        </div>
        <div className="mt-8">
          <h3 className="font-semibold text-lg mb-4">Category Image</h3>
          <ImageUploader
            key={uploaderKey}
            name="image"
            limit={1}
            onFileSelect={handleImageSelect}
          />
        </div>
        <div className="flex justify-end gap-5">
          <Button
            onClick={() => closeCreateCategoryModal()}
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
