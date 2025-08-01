import express from "express";

import { verifyAccessToken } from "../middlewares/auth.js";
import { getAllUsers } from "../controllers/admin.js";

const router = express.Router();

router.get("/users", verifyAccessToken, getAllUsers);

export default router;
