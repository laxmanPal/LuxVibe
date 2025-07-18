import React from 'react'
import Feature from './Feature'
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { GoGift } from "react-icons/go";
import { RiSecurePaymentLine } from "react-icons/ri";

const Features = () => {
  return (
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
  )
}

export default Features
