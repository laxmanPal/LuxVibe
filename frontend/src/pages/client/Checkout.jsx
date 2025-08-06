import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AddressCard from "../../components/client/AddressCard";
import { useCartCtx } from "../../store/CartContext";
import { currencyFormatter } from "../../config/currency-formatter";
import stripeCheckout from "../../payments/StripeCheckout";

const Checkout = () => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { cart } = useCartCtx();
  const cartItems = cart?.items || [];

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.quantity * item.product.discountPrice;
  }, 0);

  const totalDiscount = cartItems.reduce((acc, item) => {
    return (
      acc + item.quantity * (item.product.price - item.product.discountPrice)
    );
  }, 0);

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

      // Re-fetch addresses to get updated status
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

      // Remove the address from local state
      setAddresses((prev) => prev.filter((a) => a._id !== addressId));

      // If deleted address was active, clear selected
      if (selectedAddressId === addressId) {
        setSelectedAddressId(null);
      }

      toast.success("✅ Address deleted");
    } catch (error) {
      toast.error("❌ " + error.message);
      console.error("Delete address error:", error.message);
    }
  };

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId);

  const handlePayment = () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }
    stripeCheckout({ cartItems, shippingInfo: selectedAddress });
  };

  return (
    <div className="py-8 container border-b border-gray-300">
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 w-full h-full bg-white p-6 border border-gray-300 shadow-md rounded-xl">
          <Button
            onClick={handleShowAddressForm}
            className="!bg-black !text-white !rounded-lg text-center !mb-4"
          >
            Add new address
          </Button>
          {showAddressForm && (
            <div className="rounded-xl shadow-md overflow-hidden bg-white p-6 border border-gray-300 ">
              <form onSubmit={handleAddAddress} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <TextField
                      fullWidth
                      type="text"
                      id="address"
                      label="Street Address"
                      name="streetAddress"
                      variant="outlined"
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      type="text"
                      id="city"
                      label="City"
                      name="city"
                      variant="outlined"
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      type="text"
                      id="state"
                      label="State"
                      name="state"
                      variant="outlined"
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      type="text"
                      id="country"
                      label="Country"
                      name="country"
                      variant="outlined"
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      type="number"
                      id="pincode"
                      label="Pincode"
                      name="pincode"
                      variant="outlined"
                      required
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      type="number"
                      id="phone"
                      label="Phone"
                      name="phone"
                      variant="outlined"
                      required
                    />
                  </div>
                  <div>
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
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="!bg-black !text-white !rounded-lg text-center font-medium gap-3"
                >
                  {submitting ? (
                    <CircularProgress size="10px" color="inherit" />
                  ) : (
                    "Add"
                  )}
                </Button>
              </form>
            </div>
          )}

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
            <p className="text-gray-500 mt-4">No address found.</p>
          )}
        </div>
        {/* Order Summary */}
        <div className="sticky top-20 self-start h-fit">
          <div className="bg-white rounded-lg shadow p-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Review your cart</h2>
              {cartItems.map((item) => {
                if (!item.product) return null;

                const itemTotal = item.quantity * item.product.discountPrice;
                return (
                  <div
                    key={item.product._id}
                    className="mt-2 flex gap-3 border p-4 border-gray-300 rounded"
                  >
                    <img
                      src={item.product.images?.[0]?.url || "/placeholder.jpg"}
                      alt=""
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex justify-between w-full">
                      <div>
                        <h6>{item.product.name}</h6>
                        <p className="">
                          <span>
                            {currencyFormatter(item.product.discountPrice)}
                          </span>
                          <span className="text-gray-600 ml-8">
                            x {item.quantity}
                          </span>
                        </p>
                        <p className="text-xs line-through">
                          {currencyFormatter(item.product.price)}
                        </p>
                      </div>
                      <p>{currencyFormatter(itemTotal)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{currencyFormatter(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span className="text-green-700 text-sm">
                  - {currencyFormatter(totalDiscount)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Taxes and charges</span>
                <span>{currencyFormatter(0)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery charge</span>
                <span>{currencyFormatter(0)}</span>
              </div>
            </div>

            {/* <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>$5.00</span>
            </div> */}
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{currencyFormatter(totalPrice)}</span>
            </div>

            <Button
              onClick={handlePayment}
              className="!mt-6   !py-3 hover:bg-gray-900 transition w-full  !bg-black !text-white !rounded-lg text-center font-medium hover:opacity-80 "
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
