import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const AddressContext = createContext();

export const useAddressCtx = () => useContext(AddressContext);

export const AddressContextProvider = ({ children }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  useEffect(() => {
    fetchUserAddress();
  }, []);

  
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

  const addressCtx = {
    addresses,
    selectedAddressId,
    submitting,
    showAddressForm,
    handleSelectAddress,
    handleAddAddress,
    handleDeleteAddress,
    setShowAddressForm
  };
  return (
    <AddressContext.Provider value={addressCtx}>
      {children}
    </AddressContext.Provider>
  );
};
