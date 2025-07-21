import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";

const Register = () => {
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
            <PasswordInput />
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
