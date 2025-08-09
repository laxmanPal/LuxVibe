import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const ProductContext = createContext();

export const useProductCtx = () => useContext(ProductContext);

export const ProductContextProvider = ({ children }) => {
  const [fetching, setFetching] = useState(false);
  const [latestProducts, setLatestProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [deleting, setDeleting] = useState(false);
    const [productDetails, setProductDetails] = useState({});
      const [existingProductImages, setExistingProductImages] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchLatestProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setFetching(true);
      const response = await fetch(`${API_URL}/admin/product/all-products`, {
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
      setFetching(false);
    }
  };

  const fetchLatestProducts = async () => {
    try {
      setFetching(true);
      const response = await fetch(
        `${API_URL}/admin/product/all-products?limit=4`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Fetching Latest Product failed");
      }
      setLatestProducts(data.products);
    } catch (error) {
      console.error("Fetching Latest Products Error:", error.message);
    } finally {
      setFetching(false);
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
      fetchProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

   const fetchProduct = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/admin/product/${productId}`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching Users failed");
      }
      console.log(data);

      setProductDetails(data.product);
      setExistingProductImages(data.product.images);
    } catch (error) {
      console.error("Fetching Categories Error:", error.message);
    }
  };
  

  const productCtx = {
    products,
    latestProducts,
    fetching,
    fetchProducts,
    deleting,
    handleDeleteProduct,
    fetchProduct,
    existingProductImages,
    productDetails
  };

  return (
    <ProductContext.Provider value={productCtx}>
      {children}
    </ProductContext.Provider>
  );
};
