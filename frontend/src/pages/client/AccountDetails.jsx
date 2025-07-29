import { Button, TextField } from "@mui/material";
import defaultAvatar from "../../assets/user.jpg";
import PasswordInput from "../../components/client/PasswordInput";
import { useAuth } from "../../store/AuthContext";
import { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import CircularProgress from "@mui/material/CircularProgress";
const API_URL = import.meta.env.VITE_API_URL;

const AccountDetails = () => {
  const { user, setUser } = useAuth();
  const { name, email, phone, avatar: userAvatar } = user;
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(userAvatar.url || defaultAvatar);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview image immediately
    setAvatar(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);

      const res = await fetch(`${API_URL}/user/upload-avatar`, {
        method: "POST",
        body: formData,
        credentials: "include", // for cookie-based auth
      });

      const data = await res.json();

      if (data.avatar) {
        setAvatar(data.avatar);
        setUser((prevUser) => ({
          ...prevUser,
          avatar: { url: data.avatar },
        }));
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setAvatar(userAvatar?.url || defaultAvatar);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="md:col-span-2 w-full h-full p-6 ">
      <div className="rounded-xl shadow-md overflow-hidden bg-white p-6 border border-gray-300 ">
        <h2 className="text-2xl font-semibold mb-6">Account Details</h2>

        <form className="space-y-6">
          {/* <!-- Name & Email --> */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <div className="relative group">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-full h-full object-cover border-2 border-gray-300"
                  onClick={() => fileInputRef.current.click()}
                />

                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50  flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity cursor-pointer"
                  onClick={() => fileInputRef.current.click()}
                >
                  {uploading ? (
                    <CircularProgress size="20px" color="inherit" />
                  ) : (
                    <FiUploadCloud className="text-white text-2xl" />
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
            <div className="grid grid-cols-1  gap-6 col-span-2">
              <div>
                <TextField
                  fullWidth
                  type="text"
                  id="name"
                  label="Name"
                  variant="outlined"
                  defaultValue={name}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  type="email"
                  id="email"
                  label="Email"
                  variant="outlined"
                  disabled
                  value={email}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  type="number"
                  id="phone"
                  label="Phone"
                  variant="outlined"
                  defaultValue={phone}
                />
              </div>
              <PasswordInput />
            </div>
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
