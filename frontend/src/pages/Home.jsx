import React from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import product1 from "../assets/product-2.jpg";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { GoGift } from "react-icons/go";
import { RiSecurePaymentLine } from "react-icons/ri";
import Feature from "../components/Feature";


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
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Today's Picks</h2>
          <p className="text-gray-500 mt-2">
            Explore our most popular pieces that customers can't get enough of
          </p>
        </div>
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
      <div className="py-8 border-1 border-gray-300">
        <div className="container">
          <div className="flex items-center justify-between text-center">
            <Feature
              icon={<LiaShippingFastSolid />}
              title="FREE DELIVERY"
              discription="Enjoy free delivery on all orders"
            />
            <Feature
              icon={<FaArrowRotateLeft />}
              title="EASY RETURNS"
              discription="Within 14 days for a return"
            />

            <Feature
              icon={<BiSupport />}
              title="Support 24/7"
              discription="Outstanding premium support"
            />

            <Feature
              icon={<GoGift />}
              title="GIFT PACKAGE"
              discription="Perfectly packaged for gifting"
            />
            <Feature
              icon={<RiSecurePaymentLine />}
              title="Secured Payment"
              discription="Payment Cards Accepted"
            />
          </div>
        </div>
      </div>
 
    </>
  );
}
