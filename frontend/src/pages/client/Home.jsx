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
const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const { latestProducts, fetching } = useProductCtx();

  return (
    <>
      {/* Hero */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Hero />
        </div>
      </section>
      {/* Top Picks */}
      <div className="container px-4 md:px-0 py-8">
        <Title
          title="Latest Products"
          discription="Explore our most popular pieces that customers can't get enough of"
        />
        {fetching ? (
          <FetchingData title="Getting Latest Products" />
        ) : latestProducts && latestProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {latestProducts.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
                <ProductCard
                  productId={product._id}
                  title={product.name}
                  image={product.images?.[0]?.url || product1}
                  price={product.price}
                  discountPrice={product.discountPrice}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div>No Latest Products</div>
        )}
      </div>

      {/* Features */}
      <Features />
    </>
  );
}
