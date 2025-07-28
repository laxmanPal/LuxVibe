import React from "react";
import Hero from "../../components/client/Hero";
import ProductCard from "../../components/client/ProductCard";
import product1 from "../../assets/product-2.jpg";
import Title from "../../components/client/Title";
import Features from "../../components/client/Features";

export default function Home() {
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
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductCard
            title="Nike Air Force 1 '07"
            image={product1}
            price="$125"
          />
          <ProductCard
            title="Nike Air Force 1 '07"
            image={product1}
            price="$125"
          />

          <ProductCard
            title="Nike Air Force 1 '07"
            image={product1}
            price="$125"
          />

          <ProductCard
            title="Nike Air Force 1 '07"
            image={product1}
            price="$125"
          />
        </div>
      </div>

      {/* Features */}
      <Features />
    </>
  );
}
