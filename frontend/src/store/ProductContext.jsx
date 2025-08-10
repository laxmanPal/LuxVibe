import { createContext, useContext, useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const ProductContext = createContext();

export const useProductCtx = () => useContext(ProductContext);

export const ProductContextProvider = ({ children }) => {
  // Separate loading states for different operations
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [fetchingLatestProducts, setFetchingLatestProducts] = useState(false);
  const [fetchingProductDetails, setFetchingProductDetails] = useState(false);
  
  const [latestProducts, setLatestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [existingProductImages, setExistingProductImages] = useState([]);

  useEffect(() => {
    // Run both fetches concurrently but with separate loading states
    const initializeData = async () => {
      await Promise.all([
        fetchProducts(),
        fetchLatestProducts()
      ]);
    };
    
    initializeData();
  }, []);

  const fetchProducts = async () => {
    try {
      setFetchingProducts(true);
      const response = await fetch(`${API_URL}/product/all-products`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Fetching Products failed");
      }
      setProducts(data.products);
    } catch (error) {
      console.error("Fetching Products Error:", error.message);
    } finally {
      setFetchingProducts(false);
    }
  };

  const fetchLatestProducts = async () => {
    try {
      setFetchingLatestProducts(true);
      const response = await fetch(`${API_URL}/product/all-products?limit=4`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Fetching Latest Product failed");
      }
      setLatestProducts(data.products);
    } catch (error) {
      console.error("Fetching Latest Products Error:", error.message);
    } finally {
      setFetchingLatestProducts(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/admin/product/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res.json();

      if (!res.ok)
        throw new Error(result.message || "Failed to delete product");
      
      // Refresh products after deletion
      await fetchProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      setFetchingProductDetails(true);
      const response = await fetch(`${API_URL}/product/${productId}`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching Product Details failed");
      }
      console.log(data);

      setProductDetails(data.product);
      setExistingProductImages(data.product.images);
    } catch (error) {
      console.error("Fetching Product Details Error:", error.message);
    } finally {
      setFetchingProductDetails(false);
    }
  };

  const productCtx = {
    products,
    latestProducts,
    fetchingProducts,
    fetchingLatestProducts,
    fetchingProductDetails,
    fetchProducts,
    deleting,
    handleDeleteProduct,
    fetchProductDetails,
    existingProductImages,
    productDetails,
  };

  return (
    <ProductContext.Provider value={productCtx}>
      {children}
    </ProductContext.Provider>
  );
};
