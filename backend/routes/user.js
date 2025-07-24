import express from "express";
import { verifyAccessToken } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
import { updateUserDetails, uploadAvatar } from "../controllers/user.js";

const router = express.Router();

router.post(
  "/upload-avatar",
  verifyAccessToken,
  upload.single("avatar"),
  uploadAvatar
);

router.put("/update-user-detail", verifyAccessToken, updateUserDetails);

export default router;
