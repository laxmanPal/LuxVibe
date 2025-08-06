import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const stripeCheckout = async ({ cartItems, shippingInfo }) => {
  try {
    const res = await fetch(`${API_URL}/payment/stripe/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ cartItems, shippingInfo }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error("Stripe checkout error:", err);
    toast.error("Payment failed. Please try again.");
  }
};

export default stripeCheckout;
