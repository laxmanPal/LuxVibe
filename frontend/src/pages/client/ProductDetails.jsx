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
import { useProductCtx } from "../../store/ProductContext";
const API_URL = import.meta.env.VITE_API_URL;

// Array of image URLs
const images = [product1, product2, product3, product4];

import Skeleton from "@mui/material/Skeleton";
import getProductImage from "../../utils/productImagePlaceholder";

export default function ProductDetails() {
  const { addToCart } = useCartCtx();
  const { addToWishlist } = useWishlistCtx();
  const { fetchProductDetails, productDetails, fetchingProductDetails } = useProductCtx();
  const [mainImage, setMainImage] = useState(productDetails.images?.[0]?.url || getProductImage(productDetails));
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  useEffect(() => {
    if (productDetails?.images?.length > 0) {
      setMainImage(productDetails.images[0].url);
    } else {
      setMainImage(getProductImage(productDetails));
    }
  }, [productDetails]);


  const handleAddToCart = async () => {
    await addToCart({ productId, quantity });
  };

  const handleAddToWishlist = async () => {
    await addToWishlist({ productId });
  };

  const price = currencyFormatter(productDetails.price);
  const discountPrice = currencyFormatter(productDetails.discountPrice);

  const discountPercentage =
    productDetails.price && productDetails.discountPrice
      ? Math.round(
        ((productDetails.price - productDetails.discountPrice) /
          productDetails.price) *
        100
      )
      : 0;

  if (fetchingProductDetails) {
    // Skeleton UI while loading
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left side - Images */}
              <div>
                <Skeleton variant="rectangular" width="100%" height={500} />
                <div className="flex gap-3 mt-4">
                  {[1, 2, 3, 4].map((n) => (
                    <Skeleton
                      key={n}
                      variant="rectangular"
                      width={80}
                      height={80}
                      style={{ borderRadius: "8px" }}
                    />
                  ))}
                </div>
              </div>

              {/* Right side - Details */}
              <div className="space-y-4">
                <Skeleton variant="text" width={120} height={30} />
                <Skeleton variant="text" width="80%" height={40} />
                <Skeleton variant="rectangular" width="60%" height={50} />
                <Skeleton variant="rectangular" width="80%" height={80} />
                <Skeleton variant="rectangular" width="100%" height={56} />
                <Skeleton variant="rectangular" width="100%" height={56} />
                <Skeleton variant="rectangular" width="100%" height={150} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-8">
            {/* Images section */}
            <div className="lg:sticky lg:top-8 self-start">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Thumbnails */}
                <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 lg:w-24">
                  {productDetails.images?.length > 0 ? (
                    productDetails.images.map((imgObj, index) => (
                      <div
                        key={index}
                        onClick={() => setMainImage(imgObj.url)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${mainImage === imgObj.url
                          ? "opacity-100"
                          : "opacity-70 hover:opacity-100"
                          }`}
                      >
                        <img
                          src={imgObj.url}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    // Single placeholder thumb
                    <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden">
                      <img
                        src={getProductImage(productDetails)}
                        alt="Placeholder Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                </div>

                {/* Main image */}
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

            {/* Product details */}
            <div className="flex flex-col justify-start space-y-6">
              {/* Brand and title */}
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

              {/* Price */}
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
                  MRP{" "}
                  <span className="line-through text-gray-500">{price}</span>
                  <span className="ml-2">Inclusive of all taxes</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {productDetails.description}
                </p>
              </div>

              {/* Quantity and actions */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      Quantity:
                    </span>
                    <QuantityBox
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="!bg-black hover:!bg-gray-800 !text-white !rounded-xl !py-3 !font-semibold !text-base"
                    size="large"
                  >
                    <MdOutlineShoppingCart className="text-xl mr-2" />
                    Add to Cart
                  </Button>

                  <Button
                    onClick={handleAddToWishlist}
                    variant="outlined"
                    className="!rounded-xl !py-3 !font-semibold !text-base"
                    size="large"
                  >
                    <FaRegHeart className="text-xl mr-2" />
                    Add to Wishlist
                  </Button>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="font-semibold text-gray-900">
                  Why choose this product?
                </h4>
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

        {/* Extra features */}
        <div className="mt-8">
          <Features />
        </div>
      </div>
    </div>
  );
}

