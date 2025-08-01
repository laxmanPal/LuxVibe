import { Checkbox, Chip, IconButton } from "@mui/material";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const AddressCard = ({ address, selected, onSelect, onDelete }) => {
  return (
    <>
      <div
        className={` rounded-xl  overflow-hidden bg-white p-6 border mt-4 border-gray-300 hover:shadow-md cursor-pointer transition`}
      >
        <label className="flex items-center space-x-3 justify-between">
          <Checkbox
            checked={selected}
            onChange={() => onSelect(address._id)}
            className=" !text-black !mr-10"
          />
          <div className="flex flex-col cursor-pointer">
            <span>
              {address.streetAddress}, {address.city}, {address.state},
              {address.country} - {address.pincode}{" "}
              <Chip label={address.type} />
            </span>
            <span className="text-sm text-gray-600">
              Phone: {address.phone}
            </span>
          </div>
          <IconButton
            aria-label="delete"
            onClick={() => onDelete(address._id)}
            color="error"
          >
            <RiDeleteBin6Line />
          </IconButton>
        </label>
      </div>
    </>
  );
};

export default AddressCard;
