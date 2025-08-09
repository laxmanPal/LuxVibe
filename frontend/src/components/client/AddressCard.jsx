import { Checkbox, Chip, IconButton } from "@mui/material";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const AddressCard = ({ address, selected, onSelect, onDelete }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Home':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'Work':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
        );
    }
  };

  return (
    <article
      className={`rounded-2xl overflow-hidden bg-white p-6 border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
        selected 
          ? 'border-indigo-500 bg-indigo-50 shadow-lg' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      aria-selected={selected}
      onClick={() => onSelect(address._id)}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-4 flex-grow">
          <Checkbox
            checked={selected}
            onChange={() => onSelect(address._id)}
            onClick={(e) => e.stopPropagation()}
            inputProps={{ "aria-label": "Select address" }}
            sx={{
              color: '#6b7280',
              '&.Mui-checked': { color: '#6366f1' },
              '& .MuiSvgIcon-root': { fontSize: 24 }
            }}
          />
          
          <div className="flex-grow min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Chip 
                icon={getTypeIcon(address.type)}
                label={address.type} 
                size="small"
                className={`!font-medium ${
                  address.type === 'Home' ? '!bg-green-100 !text-green-800' :
                  address.type === 'Work' ? '!bg-blue-100 !text-blue-800' :
                  '!bg-purple-100 !text-purple-800'
                }`}
              />
              {selected && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Active
                </span>
              )}
            </div>
            
            <div className="space-y-1">
              <p className="text-gray-900 font-medium leading-relaxed">
                {address.streetAddress}
              </p>
              <p className="text-gray-700 text-sm">
                {address.city}, {address.state}, {address.country} - {address.pincode}
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{address.phone}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:flex-col sm:items-end">
          <IconButton
            aria-label="delete address"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(address._id);
            }}
            className="!transition-all !duration-200 hover:!bg-red-50"
            sx={{
              color: '#ef4444',
              '&:hover': { 
                backgroundColor: '#fef2f2',
                transform: 'scale(1.1)'
              }
            }}
          >
            <RiDeleteBin6Line className="text-lg" />
          </IconButton>
        </div>
      </div>
    </article>
  );
};

export default AddressCard;
