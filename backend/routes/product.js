import express from "express";
import { getAllProducts, getProductById } from "../controllers/product.js";

const router = express.Router();

router.get("/all-products", getAllProducts);

router.get("/:id", getProductById);

export default router;
