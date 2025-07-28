import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/client/PasswordInput";
const API_URL = import.meta.env.VITE_API_URL;
import { useState } from "react";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.target);
    const formData = Object.fromEntries(fd.entries());

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      e.target.reset();
      setSubmitting(false);
      toast.success(" Registration successful!");
      console.log("User registered:", data);
      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    } catch (error) {
      setSubmitting(false);
      toast.error(` ${error.message}`);
      console.error("Registration error:", error.message);
    }
  };

  return (
    <>
      <div className="bg-white w-full max-w-md p-6 shadow-md">
        <h2 className="uppercase font-bold mb-4 text-lg">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <TextField
              fullWidth
              type="text"
              id="name"
              label="Name"
              name="name"
              variant="outlined"
              required
            />
          </div>
          {/* Email */}
          <div>
            <TextField
              fullWidth
              type="email"
              id="email"
              label="Email"
              name="email"
              variant="outlined"
              required
            />
          </div>

          {/* Password */}
          <div>
            <PasswordInput required />
          </div>

          {/* Register Button */}
          <button
            disabled={submitting}
            type="submit"
            className={`w-full border bg-black text-white py-3 font-bold uppercase  cursor-pointer transition ${
              submitting
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-white hover:border hover:border-black hover:text-black"
            }`}
          >
            {submitting ? (
              <CircularProgress size="20px" color="inherit" />
            ) : (
              "Register"
            )}
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
