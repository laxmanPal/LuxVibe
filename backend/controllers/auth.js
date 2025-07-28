import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Create and save user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { email: newUser.email, id: newUser.id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      token,
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const isUser = await User.findOne({ email });

    if (!isUser) {
      return res.status(401).json({
        message: "User does not exist",
        error: true,
        success: false,
      });
    }

    if (isUser.status !== "Active") {
      return res.status(400).json({
        message: "User is not Active",
        error: true,
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, isUser.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(isUser.id, isUser.isAdmin);

    const refreshToken = await generateRefreshToken(isUser.id, isUser.isAdmin);

    await User.findByIdAndUpdate(isUser.id, {
      last_login: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.status(200).json({
      message: "Login successful",
      error: false,
      success: true,
      token: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: true,
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized request",
        error: true,
        success: false,
      });
    }

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    await User.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return res.status(200).json({
      message: "Logout successful",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: true,
      success: false,
    });
  }
};
