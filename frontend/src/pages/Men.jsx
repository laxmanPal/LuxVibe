import React from 'react'
import ProductListWrapper from '../components/ProductListWrapper'
import Title from '../components/Title'
import ProductCard from '../components/ProductCard'
import product1 from "../assets/product-2.jpg";

const Men = () => {
  return (
      <ProductListWrapper
        title={
          <Title
            title="ALL MEN COLLECTIONS"
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
  )
}

export default Men
