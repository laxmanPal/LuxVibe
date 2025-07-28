import React from "react";
import ProductListWrapper from "../../components/client/ProductListWrapper";
import Title from "../../components/client/Title";
import ProductCard from "../../components/client/ProductCard";
import product1 from "../../assets/product-2.jpg";
import { useParams } from "react-router-dom";

const Category = () => {
  const { categoryName } = useParams();

  console.log(categoryName);

  return (
    <>
      <ProductListWrapper
        title={
          <Title
            title={`ALL ${categoryName.toLocaleUpperCase()} COLLECTIONS`}
            discription="Explore our most popular pieces that customers can't get enough of"
          />
        }
      >
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
      </ProductListWrapper>
    </>
  );
};

export default Category;
