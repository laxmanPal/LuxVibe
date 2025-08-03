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

router.post(
  "/create-category",
  verifyAccessToken,
  verifyAdmin,
  getUploadMiddleware().array("images"),
  createCategory
);

router.put(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
    getUploadMiddleware().single("image"),
  updateCategory
);
router.delete("/:id", verifyAccessToken, verifyAdmin, deleteCategory);

router.get("/all-categories", getAllCategories);
router.get("/:id", getCategoryById);

export default router;
