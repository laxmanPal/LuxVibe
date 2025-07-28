import { Button, TextField } from "@mui/material";
import React from "react";
import PasswordInput from "../../components/client/PasswordInput";

const AccountDetails = () => {
  return (
    <div className="md:col-span-2 w-full h-full p-6 ">
      <div className="rounded-xl shadow-md overflow-hidden bg-white p-6 border border-gray-300 ">
        <h2 className="text-2xl font-semibold mb-6">Account Details</h2>

        <form class="space-y-6">
          {/* <!-- Name & Email --> */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <TextField
                fullWidth
                type="text"
                id="name"
                label="Name"
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                fullWidth
                type="email"
                id="email"
                label="Email"
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
            <PasswordInput />
          </div>

          {/* <!-- Update Button --> */}
          <Button className="w-full  !bg-black !text-white !rounded-lg text-center font-medium gap-3 ">
            UPDATE PROFILE
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;
