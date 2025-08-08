import { Checkbox, Chip, IconButton } from "@mui/material";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const AddressCard = ({ address, selected, onSelect, onDelete }) => {
  return (
    <article
      className={`rounded-xl overflow-hidden bg-white p-6 border border-gray-300 hover:shadow-md cursor-pointer transition flex flex-col sm:flex-row items-center sm:justify-between gap-4`}
      aria-selected={selected}
      onClick={() => onSelect(address._id)}
    >
      <div className="flex items-center space-x-3 flex-grow">
        <Checkbox
          checked={selected}
          onChange={() => onSelect(address._id)}
          className="!text-black !mr-4"
          onClick={(e) => e.stopPropagation()} // prevent card onClick
          inputProps={{ "aria-label": "Select address" }}
        />
        <div className="flex flex-col">
          <span className="text-gray-800 font-medium">
            {address.streetAddress}, {address.city}, {address.state},{" "}
            {address.country} - {address.pincode}{" "}
            <Chip label={address.type} size="small" />
          </span>
          <span className="text-sm text-gray-600">Phone: {address.phone}</span>
        </div>
      </div>
      <IconButton
        aria-label="delete address"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(address._id);
        }}
        color="error"
        size="large"
      >
        <RiDeleteBin6Line />
      </IconButton>
    </article>
  );
};

export default AddressCard;
