import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import Order from "../models/Order.js";
import User from "../models/user.js";
import Cart from "../models/Cart.js";

async function handleStripeOrder(session) {
  const { cartItems, shippingAddress, userId } = session.metadata;
  const parsedCartItems = JSON.parse(cartItems);
  const parsedAddress = JSON.parse(shippingAddress);

  // Optional: Fetch user from DB for fullName, etc.
  const user = await User.findById(userId);

  // Build order items according to your schema
  const items = parsedCartItems.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    size: item.size,
    price: item.product.discountPrice,
  }));

  // Step 4: Create the order
  const order = new Order({
    user: userId,
    items,
    shippingAddress: {
      fullName: user.name,
      streetAddress: parsedAddress.streetAddress,
      city: parsedAddress.city,
      postalCode: parsedAddress.pincode,
      country: parsedAddress.country,
    },
    paymentMethod: "Stripe",
    paymentStatus: {
      isPaid: true,
      paidAt: new Date(),
      paymentId: session.payment_intent,
      method: "Stripe",
    },
    orderStatus: "Confirmed",
    deliveryStatus: {
      isDelivered: false,
      deliveredAt: null,
    },
    totalAmount: session.amount_total / 100, // Convert from paise/cents
    shippingFee: 0,
    taxAmount: 0,
  });
  await order.save();

  // (Optional) Step 5: Clear user's cart, update stock, send email, etc.
  await Cart.findOneAndUpdate(
    { user: userId },
    { items: [], totalItems: 0, totalPrice: 0 }
  );
}

export const createStripeCheckoutSession = async (req, res) => {
  try {
    const { cartItems, shippingInfo } = req.body;
    const userId  = req.userId;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          images: [item.product.images[0].url],
          name: item.product.name,
        },
        unit_amount: Math.round(item.product.discountPrice * 100), // ₹ → paise
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Works in test mode with INR
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      metadata: {
        userId,
        shippingAddress: JSON.stringify(shippingInfo),
      },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create Stripe session" });
  }
};

export const stripeWebhook = async (req, res) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // Step 3: Handle order creation here
    await handleStripeOrder(session);
  }
  res.json({ received: true });
};
