import product1 from "../../assets/footwear-1.jpg";
import product2 from "../../assets/footwear-2.jpg";
import product3 from "../../assets/footwear-3.jpg";
import product4 from "../../assets/footwear-4.jpg";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";

import { useEffect, useState } from "react";
import Features from "../../components/client/Features";
import QuantityBox from "../../components/client/QuantityBox";
import { IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { useCategoryCtx } from "../../store/CategoryContext";
import { useCartCtx } from "../../store/CartContext";
import { toast } from "react-toastify";
import { useWishlistCtx } from "../../store/WishListContext";
import { currencyFormatter } from "../../config/currency-formatter";
const API_URL = import.meta.env.VITE_API_URL;

// Array of image URLs
const images = [product1, product2, product3, product4];

export default function ProductDetails() {
  const { addToCart } = useCartCtx();
  const { addToWishlist } = useWishlistCtx();
  const [mainImage, setMainImage] = useState(null);
  const { productId } = useParams();
  console.log(productId);
  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductDetails(productId);
    console.log(productDetails);
  }, [productId]);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`${API_URL}/admin/product/${productId}`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Fetching Product Details failed");
      }
      console.log(data.product.name);

      setProductDetails(data.product);
      setMainImage(data.product.images?.[0]?.url || null);
    } catch (error) {
      console.error("Fetching  Product Details Error:", error.message);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId, quantity });
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error(error.message || "Failed to add product to cart");
    }
  };

  const handleAddToWishlist = async () => {
    await addToWishlist({ productId });
  };

  const price = currencyFormatter(productDetails.price);
  const discountPrice = currencyFormatter(productDetails.discountPrice);
  return (
    <div className="py-8 container border-b border-gray-300">
      <div className="px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Sticky Images Section */}
        <div className="sticky top-20 self-start h-fit">
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              {productDetails.images?.map((imgObj, index) => (
                <img
                  key={index}
                  src={imgObj.url}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setMainImage(imgObj.url)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 ${
                    mainImage === imgObj.url
                      ? "opacity-100 grayscale-0 scale-105"
                      : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
                  }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-full aspect-square object-cover rounded-xl "
              />
            </div>
          </div>
        </div>

        {/* Scrollable Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <p className="text-sm text-gray-500 font-medium">
              {productDetails.brand}
            </p>
            <h1 className="text-2xl font-semibold ">
              {productDetails.name}{" "}
              <Chip
                className="!bg-green-200 !text-green-700"
                size="small"
                label="IN STOCK"
              />
            </h1>
          </div>

          <div className="mb-4">
            <p className="text-2xl font-bold mb-2">
              {discountPrice}
              <span className="text-lg font-normal text-green-700 ml-4">
                59% Off
              </span>
            </p>
            <p className="text-sm text-gray-600">
              MRP <span className="line-through">{price}</span> Inclusive of all
              taxes
            </p>
          </div>

          <p className="text-gray-600 text-sm mb-6">
            {productDetails.description}
          </p>

          {/* Sizes */}
          {/* <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-2">
              Size - EU Men
            </p>
            <div className="flex flex-wrap gap-3">
              {["40.5", "41", "42", "43", "43.5", "44", "44.5", "45", "46"].map(
                (size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border rounded-lg hover:border-black text-sm"
                  >
                    {size}
                  </button>
                )
              )}
            </div>
          </div> */}

          <div className="flex  gap-4">
            {/* Quantity */}
            <QuantityBox quantity={quantity} setQuantity={setQuantity} />
            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full  !bg-black !text-white !rounded-lg text-center font-medium gap-3 "
            >
              <MdOutlineShoppingCart className="text-2xl" />
              Add to cart
            </Button>
            {/* Add to Wishlist */}
            <Button
              onClick={handleAddToWishlist}
              className="w-full !border !border-gray-300  !text-black !rounded-lg text-center font-medium gap-3 "
            >
              <FaRegHeart className="text-2xl" />
              Add to Wishlist
            </Button>
          </div>
        </div>
      </div>
      <Features />
    </div>
  );
}
