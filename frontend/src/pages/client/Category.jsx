import React, { useEffect, useState } from "react";
import ProductListWrapper from "../../components/client/ProductListWrapper";
import Title from "../../components/client/Title";
import ProductCard from "../../components/client/ProductCard";
import product1 from "../../assets/product-2.jpg";
import { Link, useParams } from "react-router-dom";
import { useProductCtx } from "../../store/ProductContext";

const Category = () => {
  const { categoryName } = useParams();
  const { products } = useProductCtx();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.categories.some(
        (cat) => cat.name.toLowerCase() === categoryName.toLowerCase()
      )
    );
    setFilteredProducts(filtered);
  }, [categoryName, products]);

  return (
    <>
      <ProductListWrapper
        title={
          <Title
            title={`ALL ${categoryName.toLocaleUpperCase()} COLLECTIONS`}
            discription="Explore our most popular pieces that customers can't get enough of"
          />
        }
        totalProducts={filteredProducts.length}
      >
        {filteredProducts.map((product) => (
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
      </ProductListWrapper>
    </>
  );
};

export default Category;
