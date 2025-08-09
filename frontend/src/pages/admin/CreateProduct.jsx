import { useState } from "react";
import ProductForm from "../../components/admin/ProductForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useProductCtx } from "../../store/ProductContext";
const API_URL = import.meta.env.VITE_API_URL;

export default function CreateProduct() {
  const [submitting, setSubmitting] = useState(false);
  const navigation = useNavigate();
  const { fetchProducts } = useProductCtx();

  const handleCreateProduct = async (event, formFields, productImages) => {
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
      const res = await fetch(`${API_URL}/admin/product/create-product`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to create product");
      }

      toast.success("✅ Product Created");
      event.target.reset();
      fetchProducts();
      navigation("/admin/products");
    } catch (error) {
      console.error("Category creation failed:", error);
      toast.error(`❌ ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDiscard = () => {
    navigation("/admin/products");
  };

  return (
    <>
      <ProductForm
        title={"Create product"}
        redBtnAction={handleDiscard}
        redBtn={"Discard"}
        blueBtn={"Create"}
        onSubmit={handleCreateProduct}
        submitting={submitting}
      />
    </>
  );
}
