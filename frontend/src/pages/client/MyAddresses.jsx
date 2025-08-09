import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AddressCard from "../../components/client/AddressCard";
import { useAddressCtx } from "../../store/AddressContext";

const MyAddresses = () => {
  const {
    addresses,
    selectedAddressId,
    handleSelectAddress,
    handleAddAddress,
    handleDeleteAddress,
    submitting,
    showAddressForm,
    setShowAddressForm,
  } = useAddressCtx();

  return (
    <section className="md:col-span-2 w-full h-full py-6 md:py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">My Addresses</h2>
        <p className="text-gray-600 mb-6">Manage your delivery addresses</p>

        <Button
          onClick={() => setShowAddressForm((prev) => !prev)}
          className={`!rounded-xl !py-3 !px-6 !font-semibold !text-sm !transition-all !duration-200 !shadow-lg hover:!shadow-xl ${
            showAddressForm
              ? "!bg-red-600 hover:!bg-red-700 !text-white"
              : "!bg-indigo-600 hover:!bg-indigo-700 !text-white"
          } w-full sm:w-auto`}
        >
          {showAddressForm ? (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Address
            </>
          )}
        </Button>
      </div>

      {/* Address Form */}
      {showAddressForm && (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 mb-8 overflow-hidden">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Add New Address
            </h3>
            <p className="text-gray-600 text-sm">
              Fill in the details below to add a new delivery address
            </p>
          </div>

          <form onSubmit={handleAddAddress} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <TextField
                  fullWidth
                  type="text"
                  id="address"
                  label="Street Address"
                  name="streetAddress"
                  variant="outlined"
                  required
                  className="!mb-0"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      "&:hover fieldset": { borderColor: "#6366f1" },
                      "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
                  }}
                />
              </div>

              <TextField
                fullWidth
                type="text"
                id="city"
                label="City"
                name="city"
                variant="outlined"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover fieldset": { borderColor: "#6366f1" },
                    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
                }}
              />

              <TextField
                fullWidth
                type="text"
                id="state"
                label="State"
                name="state"
                variant="outlined"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover fieldset": { borderColor: "#6366f1" },
                    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
                }}
              />

              <TextField
                fullWidth
                type="text"
                id="country"
                label="Country"
                name="country"
                variant="outlined"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover fieldset": { borderColor: "#6366f1" },
                    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
                }}
              />

              <TextField
                fullWidth
                type="number"
                id="pincode"
                label="Pincode"
                name="pincode"
                variant="outlined"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover fieldset": { borderColor: "#6366f1" },
                    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
                }}
              />

              <TextField
                fullWidth
                type="tel"
                id="phone"
                label="Phone"
                name="phone"
                variant="outlined"
                required
                inputProps={{ pattern: "[0-9]{10,15}" }}
                helperText="Enter a valid phone number"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover fieldset": { borderColor: "#6366f1" },
                    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
                }}
              />

              <TextField
                fullWidth
                label="Address Type"
                variant="outlined"
                select
                name="type"
                defaultValue="Home"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    "&:hover fieldset": { borderColor: "#6366f1" },
                    "&.Mui-focused fieldset": { borderColor: "#6366f1" },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#6366f1" },
                }}
              >
                <MenuItem value="Home">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Home
                  </div>
                </MenuItem>
                <MenuItem value="Work">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    Work
                  </div>
                </MenuItem>
                <MenuItem value="Other">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    Other
                  </div>
                </MenuItem>
              </TextField>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={submitting}
                className="!bg-indigo-600 hover:!bg-indigo-700 !text-white !rounded-xl !py-3 !px-8 !font-semibold !shadow-lg hover:!shadow-xl !transition-all !duration-200 w-full sm:w-auto"
              >
                {submitting ? (
                  <>
                    <CircularProgress
                      size="20px"
                      color="inherit"
                      className="mr-2"
                    />
                    Adding Address...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Add Address
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Addresses List */}
      <div className="space-y-4">
        {addresses.length > 0 ? (
          <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Saved Addresses ({addresses.length})
            </h3>
            {addresses.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                selected={selectedAddressId === address._id}
                onSelect={handleSelectAddress}
                onDelete={handleDeleteAddress}
              />
            ))}
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No addresses found
            </h3>
            <p className="text-gray-600 mb-6">
              Add your first delivery address to get started
            </p>
            <Button
              onClick={() => setShowAddressForm((prev) => !prev)}
              className="!bg-indigo-600 hover:!bg-indigo-700 !text-white !rounded-xl !py-2 !px-6 !font-medium"
            >
              Add Your First Address
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAddresses;
