import product1 from "../../assets/footwear-1.jpg";
import product2 from "../../assets/footwear-2.jpg";
import product3 from "../../assets/footwear-3.jpg";
import product4 from "../../assets/footwear-4.jpg";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { MdFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";
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
  const [productDetails, setProductDetails] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  const fetchProductDetails = async (productId) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/admin/product/${productId}`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Fetching Product Details failed");
      }

      setProductDetails(data.product);
      setMainImage(data.product.images?.[0]?.url || null);
    } catch (error) {
      console.error("Fetching Product Details Error:", error.message);
    } finally {
      setLoading(false);
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

  // Calculate discount percentage
  const discountPercentage = productDetails.price && productDetails.discountPrice 
    ? Math.round(((productDetails.price - productDetails.discountPrice) / productDetails.price) * 100)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-8">
            
            {/* Images Section */}
            <div className="lg:sticky lg:top-8 self-start">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Thumbnails - Left on large screens, bottom on smaller */}
                <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 lg:w-24">
                  {productDetails.images?.map((imgObj, index) => (
                    <div
                      key={index}
                      onClick={() => setMainImage(imgObj.url)}
                      className={`flex-shrink-0 w-20 h-20 lg:w-20 lg:h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                        mainImage === imgObj.url
                          ? "  opacity-100"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={imgObj.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Main Image */}
                <div className="order-1 lg:order-2 flex-1">
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden aspect-square">
                    <img
                      src={mainImage}
                      alt="Main Product"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-start space-y-6">
              
              {/* Brand and Title */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {productDetails.brand}
                  </span>
                  <Chip
                    className="!bg-green-100 !text-green-700 !font-medium"
                    size="small"
                    label="IN STOCK"
                  />
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {productDetails.name}
                </h1>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-red-600">
                    {discountPrice}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded-full">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  MRP <span className="line-through text-gray-500">{price}</span> 
                  <span className="ml-2">Inclusive of all taxes</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {productDetails.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <QuantityBox quantity={quantity} setQuantity={setQuantity} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="!bg-black hover:!bg-gray-800 !text-white !rounded-xl !py-3 !font-semibold !text-base !transition-all !duration-200 !shadow-lg hover:!shadow-xl !transform hover:!scale-105"
                    size="large"
                  >
                    <MdOutlineShoppingCart className="text-xl mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button
                    onClick={handleAddToWishlist}
                    variant="outlined"
                    className="!border-2 !border-gray-300 hover:!border-gray-400 !text-gray-700 hover:!text-gray-900 !rounded-xl !py-3 !font-semibold !text-base !transition-all !duration-200 hover:!shadow-md"
                    size="large"
                  >
                    <FaRegHeart className="text-xl mr-2" />
                    Add to Wishlist
                  </Button>
                </div>
              </div>

              {/* Features/Benefits */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-gray-900">Why choose this product?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Free shipping over ₹499</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Easy returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Secure payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Authentic products</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-8">
          <Features />
        </div>
      </div>
    </div>
  );
}
