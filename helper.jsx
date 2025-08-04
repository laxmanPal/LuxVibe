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




import { useParams } from "react-router-dom";
import { useCategoryCtx } from "../../store/CategoryContext";
import { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import ImageUploader from "./ImageUploader";
import Modal from "../UI/Modal";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const UpdateCategory = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", slug: "" });
  const [imageFile, setImageFile] = useState(null);
  const {
    categoryAction,
    closeUpdateCategoryModal,
    categoryDetails,
    fetchCategories,
  } = useCategoryCtx();

  useEffect(() => {
    console.log("categoryAction changed:", categoryAction);
  }, [categoryAction]);

  useEffect(() => {
    console.log("categoryDetails updated:", categoryDetails);
  }, [categoryDetails]);

  useEffect(() => {
    console.log("formData changed:", formData);
  }, [formData]);

  useEffect(() => {
    console.log("🖼 imageFile changed:", imageFile);
  }, [imageFile]);

  useEffect(() => {
    console.log("🔥 useEffect triggered");

    if (categoryAction === "update-category" && categoryDetails) {
      console.log("📦 Setting form data and image");

      // Avoid unnecessary setState for formData
      setFormData((prev) => {
        if (
          prev.name !== categoryDetails.name ||
          prev.slug !== categoryDetails.slug
        ) {
          return {
            name: categoryDetails.name || "",
            slug: categoryDetails.slug || "",
          };
        }
        return prev;
      });
      console.log("categoryDetails.images:", categoryDetails.images);
      // Avoid unnecessary setState for imageFile
      setImageFile((prev) => {
        const isSame =
          JSON.stringify(prev) === JSON.stringify(categoryDetails.images || []);
        if (!isSame) {
          return categoryDetails.images || [];
        }
        return prev;
      });
    }
  }, [categoryAction, categoryDetails]);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (files) => {
    setImageFile(files);
  };

  const handleUpdateCategory = async (e, categoryId) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    imageFile.forEach((file) => {
      data.append("images", file);
    });

    try {
      const res = await fetch(`${API_URL}/admin/category/${categoryId}`, {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update category");
      }

      toast.success("✅ Category Updated");
      setFormData({ name: "", slug: "" });
      setImageFile([]);
      closeUpdateCategoryModal();
      fetchCategories();
    } catch (error) {
      console.error("Category updating failed:", error);
      toast.error(`❌ ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Modal open={categoryAction === "update-category"}>
      <form
        className="my-8"
        onSubmit={(e) => handleUpdateCategory(e, categoryDetails._id)}
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
            key={categoryDetails?._id} // ✅ Forces remount
            name={"image"}
            limit={1}
            onFileSelect={handleImageSelect}
            existingImages={categoryDetails.images}
          />
        </div>
        <div className="flex justify-end gap-5">
          <Button
            onClick={() => closeUpdateCategoryModal()}
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

export default UpdateCategory;
