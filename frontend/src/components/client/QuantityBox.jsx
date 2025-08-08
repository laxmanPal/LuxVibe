import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

const QuantityBox = ({ quantity, setQuantity }) => {
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(Math.max(1, quantity - 1)); // prevent 0 quantity

  return (
    <div className="flex items-center justify-center gap-2 w-[140px] bg-gray-200 rounded-full p-1">
      <IconButton onClick={handleDecrease} className="!w-9 !h-9">
        <FaMinus className="text-black text-lg" />
      </IconButton>
      <input
        readOnly
        type="text"
        value={quantity}
        className="w-10 text-center outline-none bg-transparent text-base font-semibold"
      />
      <IconButton onClick={handleIncrease} className="!w-9 !h-9">
        <FaPlus className="text-black text-lg" />
      </IconButton>
    </div>
  );
};

export default QuantityBox;
