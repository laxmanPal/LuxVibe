import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const CartContext = createContext();

export const useCartCtx = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetchCart();
    fetchAllCart();
  }, []);

  const addToCart = async ({ productId, quantity, size }) => {
    try {
      const response = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity, size: size || "" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add to cart");
      }
      toast.success("Added to cart");
      await fetchCart();
      return data;
    } catch (error) {
      console.error("Add to cart error:", error.message);
      if (error.message === "Access token missing") {
        return toast.error("Please Login");
      }
      toast.error("Failed Adding to cart " + error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_URL}/cart/cart`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching Cart failed");
      }

      setCart(data.cart || { items: [] });
    } catch (error) {
      console.error("Fetching Cart Error:", error.message);
    }
  };

  const updateCartQuantity = async (productId, quantity, size = "") => {
    try {
      const response = await fetch(`${API_URL}/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity, size }),
      });
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to update cart");

      setCart(data.updatedCart || { items: [] });
      return data;
    } catch (error) {
      console.error("Update cart quantity error:", error.message);
      throw error;
    }
  };

  const removeCartItem = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/cart/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to remove item");

      setCart(data.cart || { items: [] });
      toast.success("Item removed");
      await fetchCart();
    } catch (error) {
      console.error("Remove item error:", error.message);
      toast.error("Failed to remove item from cart");
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${API_URL}/cart/clear`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to Clear Cart");

      setCart(data.cart || { items: [] });
      toast.success("Cart Cleared");
      await fetchCart();
    } catch (error) {
      console.error("Clear Cart error:", error.message);
      toast.error("Failed to clear cart");
    }
  };

  const fetchAllCart = async () => {
    try {
      const response = await fetch(`${API_URL}/cart/all-carts`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching All Cart failed");
      }

      setCarts(data.carts);
      console.log(data);
      
    } catch (error) {
      console.error("Fetching All Cart Error:", error.message);
    }
  };

  const cartCtx = {
    cart,
    addToCart,
    updateCartQuantity,
    removeCartItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  );
};
