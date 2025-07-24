import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const generateAccessToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET_KEY, {
    expiresIn: "5h",
  });
  return token;
};

export const generateRefreshToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: "7d",
  });

  await User.findByIdAndUpdate(userId, {
    refresh_token: token,
  });

  return token;
};
