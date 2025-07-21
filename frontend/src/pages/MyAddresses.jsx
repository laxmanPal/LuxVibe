import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

const MyAddresses = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleShowAddressForm = () => {
    setShowAddressForm(!showAddressForm);
  };
  return (
    <div className="md:col-span-2 w-full h-full bg-white p-6 border border-gray-300 shadow-md rounded-xl">
      <Button
        onClick={handleShowAddressForm}
        className="!bg-black !text-white !rounded-lg text-center !mb-4"
      >
        Add new address
      </Button>
      {showAddressForm && (
        <div className="rounded-xl shadow-md overflow-hidden bg-white p-6 border border-gray-300 ">
          <form class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <TextField
                  fullWidth
                  type="text"
                  id="address"
                  label="Address"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  type="text"
                  id="city"
                  label="City"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  type="text"
                  id="state"
                  label="State"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  type="text"
                  id="country"
                  label="Country"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  type="number"
                  id="zipcode"
                  label="Zipcode"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  type="number"
                  id="phone"
                  label="Phone"
                  variant="outlined"
                />
              </div>
            </div>
            <Button className="!bg-black !text-white !rounded-lg text-center font-medium gap-3 ">
              Add
            </Button>
          </form>
        </div>
      )}

      <div className="rounded-xl shadow-md overflow-hidden bg-white p-6 border border-gray-300 mt-4">
        Address , City , State , Country , Zipcode , Phone
      </div>

      <div className="rounded-xl shadow-md overflow-hidden bg-white p-6 border border-gray-300 mt-4">
        Address , City , State , Country , Zipcode , Phone
      </div>

      <div className="rounded-xl shadow-md overflow-hidden bg-white p-6 border border-gray-300 mt-4">
        Address , City , State , Country , Zipcode , Phone
      </div>

      <div className="rounded-xl shadow-md overflow-hidden bg-white p-6 border border-gray-300 mt-4">
        Address , City , State , Country , Zipcode , Phone
      </div>
    </div>
  );
};

export default MyAddresses;
