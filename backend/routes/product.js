import express from "express";
import { verifyAccessToken, verifyAdmin } from "../middlewares/auth.js";
import getUploadMiddleware from "../middlewares/upload.js";
import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

router.post(
  "/create-product",
  verifyAccessToken,
  verifyAdmin,
  getUploadMiddleware().array("images", 5),
  createProduct
);

router.get("/all-products", getAllProducts);

router.get("/:id", getProductById);

router.put(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
  getUploadMiddleware().array("images", 5),
  updateProduct
);

router.delete("/:id", verifyAccessToken, verifyAdmin, deleteProduct);

router.patch("/:id/remove-image", verifyAccessToken, verifyAdmin, getUploadMiddleware().none(), deleteProductImage);

export default router;
