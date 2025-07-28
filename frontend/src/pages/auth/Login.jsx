import { Link } from "react-router-dom";
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <>
      {/* Register Section */}
      <div className="bg-white w-full max-w-md p-6 shadow-md mb-6">
        <h2 className="uppercase font-bold mb-4 text-lg">New User?</h2>
        <Link to={"/auth/register"}>
          <button className="w-full cursor-pointer bg-black text-white py-3 font-bold uppercase hover:opacity-80">
            Register
          </button>
        </Link>
      </div>

      {/* Login Section */}
      <div className="bg-white w-full max-w-md p-6 shadow-md">
        <h2 className="uppercase font-bold mb-4 text-lg">Log In</h2>

        <form className="space-y-4">
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

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 font-bold uppercase hover:opacity-80 cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
