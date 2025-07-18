import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

const QuantityBox = () => {
    const [quantity , setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };
  return (
    <div className="flex justify-center p-1 rounded-full gap-3  w-[150px] bg-gray-200">
      <IconButton onClick={handleDecrease} className="!w-10 !h-10  ">
        <FaMinus className="text-black text-lg" />
      </IconButton>
      <input className="w-[30px] outline-0 text-center" type="text" value={quantity} />
      <IconButton onClick={handleIncrease} className="!w-10 !h-10 ">
        <FaPlus className="text-black text-lg" />
      </IconButton>
    </div>
  );
};

export default QuantityBox;
