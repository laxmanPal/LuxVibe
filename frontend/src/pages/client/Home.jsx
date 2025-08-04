import React, { useEffect, useState } from "react";
import Hero from "../../components/client/Hero";
import ProductCard from "../../components/client/ProductCard";
import product1 from "../../assets/product-2.jpg";
import Title from "../../components/client/Title";
import Features from "../../components/client/Features";
import { Link } from "react-router-dom";
import { useProductCtx } from "../../store/ProductContext";
const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const { latestProducts } = useProductCtx();

  return (
    <>
      {/* Hero */}
      <div className="py-8">
        <div className="container">
          <Hero />
        </div>
      </div>
      {/* Top Picks */}
      <div className=" container py-8">
        <Title
          title="Latest Products"
          discription="Explore our most popular pieces that customers can't get enough of"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestProducts.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <ProductCard
                title={product.name}
                image={product.images?.[0]?.url || product1}
                price={product.discountPrice}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Features */}
      <Features />
    </>
  );
}
