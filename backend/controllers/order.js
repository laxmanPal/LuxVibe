import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    if (!orders) {
      return res.status(200).json({
        success: true,
        orders: [],
      });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product")
      .sort({ createdAt: -1 });

    if (!order) {
      return res.status(200).json({
        success: true,
        order: {},
      });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const ordersQuery = Order.find()
      .populate("items.product")
      .populate("user")
      .sort({ createdAt: -1 });

    if (limit > 0) {
      ordersQuery.limit(limit);
    }

    const orders = await ordersQuery;

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};
