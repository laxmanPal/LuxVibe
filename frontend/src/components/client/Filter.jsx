import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useCategoryCtx } from "../../store/CategoryContext";

const Filter = () => {
  const {categories} = useCategoryCtx()
  return (
    <div className="filter border border-gray-300 pl-5 py-3  hover:border-black">
      <h6 className="mb-3 text-xl font-medium">Filter</h6>
      <div className=" flex flex-col gap-2 font-light text-gray-700">
        {categories.map(category=><FormControlLabel control={<Checkbox color="#000" />} label={category.name} />)}
      </div>
    </div>
  );
};

export default Filter;
