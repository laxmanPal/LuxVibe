import { createContext, useContext, useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const CategoryContext = createContext();

export const useCategoryCtx = () => useContext(CategoryContext);

export const CategoryContectProvider = ({ children }) => {
  const [fetching, setFetching] = useState(false);
  const [categoryAction, setCategoryAction] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setFetching(true);
      const response = await fetch(`${API_URL}/category/all-categories`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching Users failed");
      }

      setCategories(data.categories);
    } catch (error) {
      console.error("Fetching Categories Error:", error.message);
    } finally {
      setFetching(false);
    }
  };

  const fetchCategoryById = async (categoryId) => {
    try {
      const response = await fetch(`${API_URL}/admin/category/${categoryId}`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Fetching Users failed");
      }
      setCategoryDetails(data.category);
    } catch (error) {
      console.error("Fetching Category Error:", error.message);
    }
  };

  const showCreateCategoryModal = () => {
    setCategoryAction("create-category");
  };

  const closeCreateCategoryModal = () => {
    setCategoryAction("");
  };

  const showUpdateCategoryModal = async (categoryId) => {
    await fetchCategoryById(categoryId);
    setCategoryAction("update-category");
  };

  const closeUpdateCategoryModal = () => {
    setCategoryAction("");
  };

  const categoryCtx = {
    categoryAction,
    categories,
    categoryDetails,
    showCreateCategoryModal,
    closeCreateCategoryModal,
    showUpdateCategoryModal,
    closeUpdateCategoryModal,
    fetchCategories,
    fetching,
  };
  return (
    <CategoryContext.Provider value={categoryCtx}>
      {children}
    </CategoryContext.Provider>
  );
};
