import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const OrderContext = createContext();

export const useOrderCtx = () => useContext(OrderContext);

export const OrderContextProvider = ({ children }) => {
  const [userOrders, setUserOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allRecentOrders, setAllResentOrders] = useState([]);

  useEffect(() => {
    fetchUserOrders();
    fetchAllOrders();
    fetchAllRecentOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/order/orders`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching Orders failed");
      }

      setUserOrders(data.orders);
    } catch (error) {
      console.error("Fetching Orders Error:", error.message);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/orders/all-orders`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching All Orders failed");
      }

      setAllOrders(data.orders);
    } catch (error) {
      console.error("Fetching All Orders Error:", error.message);
    }
  };

  const fetchAllRecentOrders = async () => {
    try {
      const response = await fetch(
        `${API_URL}/admin/orders/all-orders?limit=4`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching All Recent Orders failed");
      }

      setAllResentOrders(data.orders);
    } catch (error) {
      console.error("Fetching All Resent Orders Error:", error.message);
    }
  };

  const fetchOrderById = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/order/${orderId}`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching Orders failed");
      }
      return data.order;
    } catch (error) {
      console.error("Fetching Orders Error:", error.message);
    }
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    try {
      const response = await fetch(`${API_URL}/admin/orders/${orderId}`, {
        method: "PUT",
        body: JSON.stringify({ orderStatus }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update Order Status failed");
      }
      toast.success("✅ Order Status Updated");
    } catch (error) {
      console.error("Update Order Status Error:", error.message);
      toast.error(`❌ ${error.message}`);
    }
  };

  const orderCtx = {
    userOrders,
    allRecentOrders,
    allOrders,
    fetchOrderById,
    updateOrderStatus,
  };

  return (
    <OrderContext.Provider value={orderCtx}>{children}</OrderContext.Provider>
  );
};
