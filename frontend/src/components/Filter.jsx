import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Filter = () => {
  return (
    <div className="filter border border-gray-300 pl-5 py-3  hover:border-black">
      <h6 className="mb-3 text-xl font-medium">Filter</h6>
      <div className="scroll flex flex-col gap-2 font-light text-gray-700">
        <FormControlLabel control={<Checkbox color="#000" />} label="Men" />
        <FormControlLabel control={<Checkbox color="#000" />} label="Women" />
        <FormControlLabel control={<Checkbox color="#000" />} label="Kids" />
        <FormControlLabel control={<Checkbox color="#000" />} label="Topwear" />
        <FormControlLabel
          control={<Checkbox color="#000" />}
          label="Bottomwear"
        />
        <FormControlLabel
          control={<Checkbox color="#000" />}
          label="Footwear"
        />
        <FormControlLabel control={<Checkbox color="#000" />} label="Bags" />
        <FormControlLabel control={<Checkbox color="#000" />} label="Watches" />
        <FormControlLabel control={<Checkbox color="#000" />} label="Glasses" />
        <FormControlLabel control={<Checkbox color="#000" />} label="Jewelry" />
      </div>
    </div>
  );
};

export default Filter;
