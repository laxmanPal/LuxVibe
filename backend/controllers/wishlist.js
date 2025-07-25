import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";


export const addToWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        items: [{ product: productId }],
      });
    } else {
      const alreadyExists = wishlist.items.some(
        (item) => item.product.toString() === productId
      );

      if (alreadyExists) {
        return res.status(400).json({ message: "Product already in wishlist" });
      }

      wishlist.items.push({ product: productId });
    }

    await wishlist.save();
    await wishlist.populate("items.product");

    res.status(200).json({ success: true, message: "Added to wishlist", wishlist });
  } catch (error) {
    console.error("Add to wishlist error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.userId;

    const wishlist = await Wishlist.findOne({ user: userId })
      .populate("items.product");

    if (!wishlist) {
      return res.status(200).json({ 
        success: true, 
        wishlist: { user: userId, items: [] } 
      });
    }

    res.status(200).json({ success: true, wishlist });
  } catch (error) {
    console.error("Get wishlist error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    const exists = wishlist.items.some(
      (item) => item.product.toString() === productId
    );

    if (!exists) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();
    await wishlist.populate("items.product");

    res.status(200).json({ success: true, message: "Removed from wishlist", wishlist });
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const clearWishlist = async (req, res) => {
  try {
    const userId = req.userId;

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(200).json({ 
        success: true, 
        message: "Wishlist already empty", 
        wishlist: { items: [] } 
      });
    }

    wishlist.items = [];
    await wishlist.save();

    res.status(200).json({ success: true, message: "Wishlist cleared", wishlist });
  } catch (error) {
    console.error("Clear wishlist error for user:", req.userId, error);
    res.status(500).json({ message: "Server error" });
  }
};



