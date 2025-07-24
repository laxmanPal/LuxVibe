import express from "express";
import getUploadMiddleware from "../middlewares/upload.js";
import { verifyAccessToken, verifyAdmin } from "../middlewares/auth.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.js";

const router = express.Router();

const uploadCategoryImage = getUploadMiddleware("categories");

router.post(
  "/create-category",
  verifyAccessToken,
  verifyAdmin,
  uploadCategoryImage.single("image"),
  createCategory
);

router.put(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
  uploadCategoryImage.single("image"),
  updateCategory
);
router.delete("/:id", verifyAccessToken, verifyAdmin, deleteCategory);

router.get("/all-categories", getAllCategories);
router.get("/:id", getCategoryById);

export default router;
