import React from "react";
import banner1 from "../../assets/footwear-1.jpg";
import banner2 from "../../assets/footwear-2.jpg";
import banner3 from "../../assets/footwear-3.jpg";
import banner4 from "../../assets/footwear-4.jpg";
import Banner from "./Banner";

export default function Hero() {
  return (
    <div className="grid gap-4 lg:gap-6 grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-2">
      <Banner
        item_classes="col-span-1 row-span-2 sm:col-span-2 lg:col-span-2 lg:row-span-2"
        banner_image={banner1}
        banner_title="New Arrivals"
        btn_title="View Collection"
      />
      <Banner
        item_classes="col-span-1 row-span-1"
        banner_image={banner2}
        banner_title="Sneakers"
        btn_title="Explore Now"
      />
      <Banner
        item_classes="col-span-1 row-span-1"
        banner_image={banner3}
        banner_title="Sandals"
        btn_title="Explore Now"
      />
      <Banner
        item_classes="col-span-1 row-span-1 sm:col-span-2 sm:row-span-1"
        banner_image={banner4}
        banner_title="Boots"
        btn_title="Explore Now"
      />
    </div>
  );
}
