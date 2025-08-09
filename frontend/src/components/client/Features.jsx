import React from "react";
import Feature from "./Feature";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { GoGift } from "react-icons/go";
import { RiSecurePaymentLine } from "react-icons/ri";

const Features = () => {
  return (
    <div className="py-12 border border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-xl shadow-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          <Feature
            icon={<LiaShippingFastSolid />}
            title="FREE DELIVERY"
            description="Enjoy free delivery on all orders"
          />
          <Feature
            icon={<FaArrowRotateLeft />}
            title="EASY RETURNS"
            description="Within 14 days for a return"
          />
          <Feature
            icon={<BiSupport />}
            title="Support 24/7"
            description="Outstanding premium support"
          />
          <Feature
            icon={<GoGift />}
            title="GIFT PACKAGE"
            description="Perfectly packaged for gifting"
          />
          <Feature
            icon={<RiSecurePaymentLine />}
            title="Secured Payment"
            description="Payment Cards Accepted"
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
