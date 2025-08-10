import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/admin/ProductForm";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useProductCtx } from "../../store/ProductContext";
const API_URL = import.meta.env.VITE_API_URL;

export default function EditProduct() {
  const { productId } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigate();
  const { fetchProducts, handleDeleteProduct, deleting , fetchProductDetails , productDetails , existingProductImages } = useProductCtx();

  useEffect(() => {
    fetchProductDetails(productId);
  }, []);

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
      fetchProducts();
      navigation("/admin/products");
    } catch (error) {
      console.error("Category update failed:", error);
      toast.error(`❌ ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletingProduct = async () => {
    try {
      handleDeleteProduct(productId);
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
        deleting={deleting}
        existingImages={existingProductImages}
        redBtnAction={handleDeletingProduct}
      />
    </>
  );
}
