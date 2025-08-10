import express from "express";
import { getAllCategories, getCategoryById } from "../controllers/category.js";

const router = express.Router();

router.get("/all-categories", getAllCategories);
router.get("/:id", getCategoryById);

export default router;
