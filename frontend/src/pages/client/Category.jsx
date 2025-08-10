import React, { useEffect, useState } from "react";
import ProductListWrapper from "../../components/client/ProductListWrapper";
import Title from "../../components/client/Title";
import ProductCard from "../../components/client/ProductCard";
import product1 from "../../assets/product-2.jpg";
import { Link, useParams } from "react-router-dom";
import { useProductCtx } from "../../store/ProductContext";
import { FaBox } from "react-icons/fa";

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
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              productId={product._id}
              title={product.name}
              image={product.images?.[0]?.url || product1}
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
              No Products For {`${categoryName.toLocaleUpperCase()}`} Found
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

export default Category;
