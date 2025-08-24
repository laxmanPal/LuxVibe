import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import PasswordInput from "../../components/client/PasswordInput";
const API_URL = import.meta.env.VITE_API_URL;
import { useState } from "react";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { decodeToken } from "../../utils/jwt";
import { useAuth } from "../../store/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(user.isAdmin ? "/admin/dashboard" : "/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.target);
    const formData = Object.fromEntries(fd.entries());

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success("✅ Login successful!");
      await login();

      // setTimeout(() => {
      //   navigate(user?.isAdmin ? "/admin/dashboard" : "/");
      // }, 1500);
    } catch (error) {
      setSubmitting(false);

      toast.error(`❌ ${error.message}`);

      console.error("Login error:", error.message);
    }
  };
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

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Login Button */}
          <button
            disabled={submitting}
            type="submit"
            className={`w-full border bg-black text-white py-3 font-bold uppercase  cursor-pointer transition ${submitting
              ? "bg-gray-300 cursor-not-allowed"
              : "hover:bg-white hover:border hover:border-black hover:text-black"
              }`}
          >
            {submitting ? (
              <CircularProgress size="20px" color="inherit" />
            ) : (
              "Log in"
            )}
          </button>
        </form>
        <div className="mt-4">
          <div class="flex items-center gap-4">
            <div class="flex-1 border-t border-gray-300"></div>
            <span class="text-gray-500 text-sm font-medium">For Admin Panel</span>
            <div class="flex-1 border-t border-gray-300"></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Email: demo.admin@gmail.com
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Password: demoAdminPass
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
