import React, { useEffect, useState } from "react";
import Hero from "../../components/client/Hero";
import ProductCard from "../../components/client/ProductCard";
import product1 from "../../assets/product-2.jpg";
import Title from "../../components/client/Title";
import Features from "../../components/client/Features";
import { Link } from "react-router-dom";
import { useProductCtx } from "../../store/ProductContext";
import { CircularProgress } from "@mui/material";
import FetchingData from "../../components/UI/FetchingData";
import ProductCardSkeleton from "../../components/UI/ProductCardSkeleton";
import getProductImage from "../../utils/productImagePlaceholder";
const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const { latestProducts, fetchingLatestProducts } = useProductCtx();

  const renderSkeletons = (count = 4) => {
    return Array.from({ length: count }, (_, index) => (
      <ProductCardSkeleton key={`skeleton-${index}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <Hero />
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <Title
              title="Latest Products"
              discription="Explore our most popular pieces that customers can't get enough of"
            />
          </div>

          {fetchingLatestProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {renderSkeletons()}
            </div>
          ) : latestProducts && latestProducts.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {latestProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    productId={product._id}
                    title={product.name}
                    image={getProductImage(product)}
                    price={product.price}
                    discountPrice={product.discountPrice}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Latest Products</h3>
              <p className="text-gray-500 text-center max-w-md">We couldn't find any latest products at the moment. Please check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <Features />
        </div>
      </section>
    </div>
  );
}
