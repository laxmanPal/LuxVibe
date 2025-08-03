import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/admin/ProductForm";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

export default function EditProduct() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [existingProductImages, setExistingProductImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    fetchProduct(productId);
  }, []);

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

  const handleUpdateProduct = async (event, formFields, productImages) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData();

    // Add text fields
    Object.entries(formFields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append multiple images
    productImages.forEach((file) => {
      formData.append("images", file);
    });
    try {
      const res = await fetch(`${API_URL}/admin/product/${productId}`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update product");
      }

      toast.success("✅ Product Updated");
      event.target.reset();
      navigation("/admin/products");
    } catch (error) {
      console.error("Category update failed:", error);
      toast.error(`❌ ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/product/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res.json();

      if (!res.ok)
        throw new Error(result.message || "Failed to delete product");

      toast.success("✅ Product deleted");
      navigation("/admin/products");
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    }
  };

  return (
    <>
      <ProductForm
        productDetails={productDetails}
        title={"Edit product"}
        redBtn={"Delete"}
        blueBtn={"Save"}
        onSubmit={handleUpdateProduct}
        submitting={submitting}
        existingImages={existingProductImages}
        redBtnAction={handleDeleteProduct}
      />
    </>
  );
}
