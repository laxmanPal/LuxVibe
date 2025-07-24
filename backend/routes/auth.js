import express from "express";
import { loginUser, logout, registerUser } from "../controllers/auth.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register" , registerUser )

router.post("/login" , loginUser )

router.post("/logout" , verifyAccessToken  , logout )

export default router;