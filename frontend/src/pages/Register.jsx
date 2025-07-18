import TextField from "@mui/material/TextField";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <>
      <div className="bg-white w-full max-w-md p-6 shadow-md">
        <h2 className="uppercase font-bold mb-4 text-lg">Register</h2>

        <form className="space-y-4">
          {/* Name */}
          <div>
            <TextField
              fullWidth
              type="text"
              id="name"
              label="Name"
              variant="outlined"
            />
          </div>
          {/* Email */}
          <div>
            <TextField
              fullWidth
              type="email"
              id="email"
              label="Email"
              variant="outlined"
            />
          </div>

          {/* Password */}
          <div>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 font-bold uppercase hover:opacity-80 cursor-pointer"
          >
            Register
          </button>
        </form>
        <div className="mt-8 text-center">
          <Link className="link" to={"/auth/login"}>
            Back to Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
