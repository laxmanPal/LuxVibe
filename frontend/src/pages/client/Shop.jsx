import React, { useEffect, useState } from "react";
import ProductCard from "../../components/client/ProductCard";
import product1 from "../../assets/product-2.jpg";

import ProductListWrapper from "../../components/client/ProductListWrapper";
import Title from "../../components/client/Title";
import { useProductCtx } from "../../store/ProductContext";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const Shop = () => {
  const { products } = useProductCtx();
  return (
    <>
      <ProductListWrapper
        title={
          <Title
            title="ALL COLLECTIONS"
            discription="Explore our most popular pieces that customers can't get enough of"
          />
        }
      >
        {products.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`}>
            <ProductCard
              title={product.name}
              image={product.images?.[0]?.url || product1}
              price={product.discountPrice}
            />
          </Link>
        ))}
      </ProductListWrapper>
    </>
  );
};

export default Shop;
