import { Button, TextField } from "@mui/material";
import defaultAvatar from "../../assets/user.jpg";
import PasswordInput from "../../components/client/PasswordInput";
import { useAuth } from "../../store/AuthContext";
import { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const AccountDetails = () => {
  const { user, setUser, fetchUserInfo } = useAuth();
  const { name, email, phone, avatar: userAvatar } = user;
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(userAvatar.url || defaultAvatar);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUploading(true);

      const res = await fetch(`${API_URL}/user/upload-avatar`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (data.avatar) {
        setAvatar(data.avatar);
        setUser((prevUser) => ({
          ...prevUser,
          avatar: { url: data.avatar },
        }));
        toast.success("✅ Profile Update Successful!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setAvatar(userAvatar?.url || defaultAvatar);
      toast.error(`❌ ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleUserDetails = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const formData = Object.fromEntries(fd.entries());

    try {
      const response = await fetch(`${API_URL}/user/update-user-detail`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Update failed");
      }

      await fetchUserInfo();
      e.target.reset();
      toast.success("✅ Account Details Update successful!");
    } catch (error) {
      toast.error(`❌ ${error.message}`);
      console.error("Update error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-black p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Account Details</h1>
            <p className="text-gray-300">Update your personal information and profile settings</p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleUserDetails} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Avatar Section */}
                <div className="lg:col-span-1 flex flex-col items-center">
                  <div className="relative group mb-4">
                    <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-gray-200 group-hover:ring-gray-400 transition-all duration-300">
                      <img
                        src={avatar}
                        alt="User Avatar"
                        className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
                        onClick={() => fileInputRef.current.click()}
                      />
                    </div>
                    
                    {/* Upload Overlay */}
                    <div
                      className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                      onClick={() => fileInputRef.current.click()}
                    >
                      {uploading ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                      ) : (
                        <div className="text-center">
                          <FiUploadCloud className="text-white text-3xl mb-1 mx-auto" />
                          <span className="text-white text-sm font-medium">Change Photo</span>
                        </div>
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
                  
                  <p className="text-gray-600 text-center text-sm leading-relaxed max-w-xs">
                    Upload a new avatar. Recommended size: 400x400px. Max file size: 2MB.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="sm:col-span-2">
                      <TextField
                        fullWidth
                        type="text"
                        id="name"
                        label="Full Name"
                        name="name"
                        variant="outlined"
                        required
                        defaultValue={name}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            '&:hover fieldset': {
                              borderColor: '#374151',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#000',
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: '#000',
                          },
                        }}
                      />
                    </div>
                    
                    <TextField
                      fullWidth
                      type="email"
                      id="email"
                      label="Email Address"
                      variant="outlined"
                      name="email"
                      required
                      value={email}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '&:hover fieldset': {
                            borderColor: '#374151',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#000',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#000',
                        },
                      }}
                    />
                    
                    <TextField
                      fullWidth
                      type="tel"
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      variant="outlined"
                      required
                      defaultValue={phone}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          '&:hover fieldset': {
                            borderColor: '#374151',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#000',
                          },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: '#000',
                        },
                      }}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <PasswordInput />
                  </div>
                </div>
              </div>

              {/* Update Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    borderRadius: '12px',
                    padding: '12px 32px',
                    fontSize: '16px',
                    fontWeight: '600',
                    textTransform: 'none',
                    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#1f2937',
                      boxShadow: '0 8px 20px 0 rgba(0, 0, 0, 0.3)',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                  }}
                >
                  Update Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
