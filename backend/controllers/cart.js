import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import User from "../models/user.js";

const calculateCartTotals = async (cart) => {
  let totalItems = 0;
  let totalPrice = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    if (!product) continue;

    totalItems += item.quantity;
    totalPrice += item.quantity * product.price;
  }

  cart.totalItems = totalItems;
  cart.totalPrice = totalPrice;
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity, size } = req.body;
    const sizeValue = size || "";

    if (!productId || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      if (product.inStock < quantity) {
        return res
          .status(400)
          .json({ message: "Insufficient stock available" });
      }
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity, size }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.product.toString() === productId && item.size === sizeValue
      );

      if (itemIndex > -1) {
        const existingQty = cart.items[itemIndex].quantity;
        if (existingQty + quantity > product.inStock) {
          return res
            .status(400)
            .json({ message: "Insufficient stock to add more" });
        }
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.items.push({ product: productId, quantity, size: sizeValue });
      }
    }

    await calculateCartTotals(cart);
    if (!cart.user) cart.user = userId;
    await cart.save();

    await User.updateOne(
      { _id: userId, cart: { $exists: false } },
      { $set: { cart: cart._id } }
    );

    const populatedCart = await Cart.findById(cart._id).populate(
      "items.product"
    );

    res
      .status(200)
      .json({ success: true, message: "Product added to cart", populatedCart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: { items: [], totalItems: 0, totalPrice: 0 },
      });
    }

    await calculateCartTotals(cart);
    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity, size } = req.body;
    const sizeValue = size || ""; 

    if (!productId || quantity == null) {
      return res.status(400).json({ message: "ProductId and quantity are required" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId && item.size === sizeValue
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity === 0) {
      // Remove item if quantity is zero
      cart.items = cart.items.filter(
        (item) => !(item.product.toString() === productId && item.size === sizeValue)
      );
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await calculateCartTotals(cart);
    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate("items.product");
    res.status(200).json({ success: true, message: "Cart updated", updatedCart });
  } catch (error) {
    console.error("Update cart item error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const removeCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, size } = req.body;
        const sizeValue = size || ""; 

    if (!productId) {
      return res
        .status(400)
        .json({ message: "Product ID is required" });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const initialLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => !(item.product.toString() === productId && item.size === sizeValue)
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    await calculateCartTotals(cart);
    await cart.save();

    res.status(200).json({ success: true, message: "Item removed", cart });
  } catch (error) {
    console.error("Remove cart item error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    if (cart.items.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "Cart is already empty", cart });
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    await cart.save();

    res.status(200).json({ success: true, message: "Cart cleared", cart });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate("user").populate("items.product");

    res.status(200).json({ success: true, carts });
  } catch (error) {
    console.error("Get all carts error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
