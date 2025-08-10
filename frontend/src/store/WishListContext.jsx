import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const WishlistContext = createContext();

export const useWishlistCtx = () => useContext(WishlistContext);

export const WishlistContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({ items: [] });

  useEffect(() => {
    fetchWishlist();
  }, []);

  const addToWishlist = async ({ productId }) => {
    try {
      const response = await fetch(`${API_URL}/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to Add to wishlist");
      }
      toast.success("Added to wishlist");
      await fetchWishlist();
      return data;
    } catch (error) {
      console.error("Add to wishlist error:", error.message);
      if (error.message === "Access token missing") {
        return toast.error("Please Login");
      }
      toast.error("Failed Adding to wishlist " + error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await fetch(`${API_URL}/wishlist/wishlist`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching wishlist failed");
      }

      setWishlist(data.wishlist || { items: [] });
    } catch (error) {
      console.error("Fetching wishlist Error:", error.message);
    }
  };

  const removeWishlistItem = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/wishlist/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to remove item");

      setWishlist(data.wishlist || { items: [] });
      toast.success("Item removed");
      await fetchWishlist();
    } catch (error) {
      console.error("Remove item error:", error.message);
      toast.error("Failed to remove item from wishlist");
    }
  };
  const wishlistContextCtx = {
    wishlist,
    addToWishlist,
    removeWishlistItem,
  };

  return (
    <WishlistContext.Provider value={wishlistContextCtx}>
      {children}
    </WishlistContext.Provider>
  );
};
