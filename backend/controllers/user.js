import User from "../models/user.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcrypt";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const uploadAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete old avatar if exists
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    // Upload new avatar manually using memory buffer
    const result = await uploadToCloudinary(req.file.buffer, "avatars");

    // Save avatar details (url + public_id)
    user.avatar = {
      url: result.secure_url,
      public_id: result.public_id,
    };
    await user.save();

    res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      avatar: user.avatar.url,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Upload failed", error: err.message });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId;

    const { name, email, phone, password } = req.body;

    const updates = {};

    if (name) updates.name = name;
    if (email) updates.email = email;
    if (phone) updates.phone = phone;

    if (password && password.length >= 6) {
      const hashedPassword = await bcrypt.hash(password, 12);
      updates.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const userDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User details fetched successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error("Get User Details Error:", error);
    return res.status(500).json({
      message: "Failed to get user details",
      success: false,
    });
  }
};
