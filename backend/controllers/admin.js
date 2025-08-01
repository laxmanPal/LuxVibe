import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        message: "Something went wrong cannot get users.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Users fetched successfully",
      users,
      success: true,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);
    return res.status(500).json({
      message: "Failed to get users",
      success: false,
    });
  }
};
