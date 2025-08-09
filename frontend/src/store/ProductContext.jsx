import { createContext, useContext, useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const ProductContext = createContext();

export const useProductCtx = () => useContext(ProductContext);

export const ProductContextProvider = ({ children }) => {
  const [fetching , setFetching]= useState(false)
  const [latestProducts, setLatestProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchLatestProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setFetching(true)
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
    }finally{
      setFetching(false)
    }
  };

  const fetchLatestProducts = async () => {
    try {
      setFetching(true)
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
    }finally{
      setFetching(false)
    }
  };



  const productCtx = {
    products,
    latestProducts,
    fetching
  };

  return (
    <ProductContext.Provider value={productCtx}>
      {children}
    </ProductContext.Provider>
  );
};
