import React, { useEffect, useState } from "react";
import ProductCard from "../../components/client/ProductCard";
import ProductListWrapper from "../../components/client/ProductListWrapper";
import Title from "../../components/client/Title";
import { useProductCtx } from "../../store/ProductContext";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import { FaBox } from "react-icons/fa";
import getProductImage from "../../utils/productImagePlaceholder";


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
        totalProducts={products.length}
      >
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              title={product.name}
              image={getProductImage(product)}
              price={product.price}
              discountPrice={product.discountPrice}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <FaBox className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500 max-w-md">
              We couldn't find any products at the moment. Please check back
              later or try refreshing the page.
            </p>
          </div>
        )}
      </ProductListWrapper>
    </>
  );
};

export default Shop;
