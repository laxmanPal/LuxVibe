import React from "react";
import banner1 from "../../assets/footwear-1.jpg";
import banner2 from "../../assets/footwear-2.jpg";
import banner4 from "../../assets/footwear-4.jpg";
import Banner from "./Banner";

export default function Hero() {
  return (
    <div className="grid gap-4 lg:gap-6 grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-2">
      <Banner
        item_classes="col-span-1 row-span-2 sm:col-span-2 lg:col-span-2 lg:row-span-2"
        banner_image="https://res.cloudinary.com/dcgr7kok0/image/upload/v1754899174/home-banner-new-arrivals_adlvsb.jpg"
        banner_title="New Arrivals"
        btn_title="View Collection"
        banner_link="/shop"
      />
      <Banner
        item_classes="col-span-1 row-span-1"
        banner_image="https://res.cloudinary.com/dcgr7kok0/image/upload/v1754896158/pexels-ari-roberts-101154701-9649263_af0qso.jpg"
        banner_title="Jewelry"
        btn_title="Explore Now"
         banner_link="/category/jewelry"
      />
      <Banner
        item_classes="col-span-1 row-span-1"
        banner_image="https://res.cloudinary.com/dcgr7kok0/image/upload/v1754896963/Get_High_Schooled_by_Gentle_Monster_s_New_2024_Campaign_f9sgxx.jpg"
        banner_title="Glasses"
        btn_title="Explore Now"
         banner_link="/category/sunglasses"
      />
      <Banner
        item_classes="col-span-1 row-span-1 sm:col-span-2 sm:row-span-1"
        banner_image="https://res.cloudinary.com/dcgr7kok0/image/upload/v1754898545/home-banner-footwear_jjdvix.jpg"
        banner_title="Footwear"
        btn_title="Explore Now"
         banner_link="/category/footwear"
      />
    </div>
  );
}
