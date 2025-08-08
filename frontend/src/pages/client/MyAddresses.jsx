import {
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AddressCard from "../../components/client/AddressCard";

const MyAddresses = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const fetchUserAddress = async () => {
    try {
      const res = await fetch(`${API_URL}/address/addresses`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("User not authenticated");

      const data = await res.json();
      setAddresses(data.address || []);
      const active = data.address?.find((addr) => addr.status);
      setSelectedAddressId(active?._id || null);
    } catch (error) {
      console.error("Fetching All Addresses Error:", error.message);
    }
  };

  useEffect(() => {
    fetchUserAddress();
  }, []);

  const handleSelectAddress = async (addressId) => {
    try {
      const res = await fetch(`${API_URL}/address/set-active/${addressId}`, {
        method: "PATCH",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to set active address");

      setSelectedAddressId(addressId);
      toast.success("✅ Address set as active");

      fetchUserAddress();
    } catch (error) {
      toast.error("❌ " + error.message);
      console.error("Set active address error:", error.message);
    }
  };

  const handleShowAddressForm = () => {
    setShowAddressForm((prev) => !prev);
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const fd = new FormData(e.target);
    const formData = Object.fromEntries(fd.entries());

    try {
      const response = await fetch(`${API_URL}/address/add-address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Adding Address failed");
      }

      toast.success("✅ Address Added successfully!");
      setShowAddressForm(false);
      fetchUserAddress();
    } catch (error) {
      toast.error(`❌ ${error.message}`);
      console.error("Add Address error:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const res = await fetch(`${API_URL}/address/delete/${addressId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to delete address");

      setAddresses((prev) => prev.filter((a) => a._id !== addressId));

      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
      }

      toast.success("✅ Address deleted");
    } catch (error) {
      toast.error("❌ " + error.message);
      console.error("Delete address error:", error.message);
    }
  };

  return (
    <section className="md:col-span-2 w-full h-full bg-white p-6 border border-gray-300 shadow-md rounded-xl">
      <Button
        onClick={handleShowAddressForm}
        className="!bg-black !text-white !rounded-lg text-center !mb-6 w-full md:w-auto"
      >
        {showAddressForm ? "Cancel" : "Add new address"}
      </Button>

      {/* Address Form */}
      {showAddressForm && (
        <div className="rounded-xl shadow-md overflow-hidden bg-white p-6 border border-gray-300 mb-6 max-w-4xl mx-auto">
          <form onSubmit={handleAddAddress} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <TextField
                fullWidth
                type="text"
                id="address"
                label="Street Address"
                name="streetAddress"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                type="text"
                id="city"
                label="City"
                name="city"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                type="text"
                id="state"
                label="State"
                name="state"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                type="text"
                id="country"
                label="Country"
                name="country"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                type="number"
                id="pincode"
                label="Pincode"
                name="pincode"
                variant="outlined"
                required
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
              />
              <TextField
                fullWidth
                label="Type"
                variant="outlined"
                select
                name="type"
                defaultValue="Home"
              >
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Work">Work</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="!bg-black !text-white !rounded-lg text-center font-medium gap-3 w-full md:w-auto"
            >
              {submitting ? (
                <CircularProgress size="20px" color="inherit" />
              ) : (
                "Add"
              )}
            </Button>
          </form>
        </div>
      )}

      {/* Addresses List */}
      <div className="flex flex-col gap-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              selected={selectedAddressId === address._id}
              onSelect={handleSelectAddress}
              onDelete={handleDeleteAddress}
            />
          ))
        ) : (
          <p className="text-gray-500 mt-4 text-center">No address found.</p>
        )}
      </div>
    </section>
  );
}

export default MyAddresses;
